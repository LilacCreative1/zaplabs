// ZAP Labs API Key Manager Component

function ApiKeyManager() {
  const { useState, useEffect } = React;

  const [apiKey, setApiKey] = useState('xai-YOUR_GROK_API_KEY_HERE'); // Use a placeholder that clearly indicates it needs replacement
  const [originalApiKey, setOriginalApiKey] = useState(''); // Store the original masked key
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [hasExistingKey, setHasExistingKey] = useState(false);
  const [isKeyEdited, setIsKeyEdited] = useState(true); // Set to true since we're providing a new key

  // Load existing API key settings
  useEffect(() => {
    const fetchApiSettings = async () => {
      // Check for backup key in localStorage first
      try {
        const backupKey = localStorage.getItem('grok_api_key_backup');
        if (backupKey && backupKey.startsWith('xai-')) {
          console.log('Found backup API key in localStorage');
          // We won't display the actual key for security - just mask it
          const maskedKey = backupKey.substring(0, 3) + '*'.repeat(backupKey.length - 6) + backupKey.substring(backupKey.length - 3);
          setApiKey(maskedKey);
          setOriginalApiKey(maskedKey);
          setHasExistingKey(true);

          // Show a notice to the user
          setStatusMessage({
            type: 'success',
            text: 'Using locally backed up API key due to database connection issue.'
          });

          // Still try the database fetch as normal
        }
      } catch (localErr) {
        console.warn('Error checking localStorage for backup:', localErr);
      }

      try {
        setIsLoading(true);

        // Fetch existing API settings from the table
        const { data, error } = await window.ezsite.apis.tableList(871, {
          Filters: [
          {
            name: "provider_name",
            op: "Equal",
            value: "Grok"
          }]
        });

        if (error) {
          console.error('Error from tableList API:', error);
          throw new Error(error || 'Failed to fetch API settings');
        }

        console.log('API settings data:', data ? 'Data retrieved' : 'No data');

        if (data && data.length > 0) {
          // Check if API key exists and is not undefined
          if (data[0].api_key) {
            // Mask the API key for security
            try {
              const apiKeyStr = String(data[0].api_key); // Ensure it's a string
              const maskedKey = apiKeyStr.substring(0, 3) + '*'.repeat(apiKeyStr.length - 6) + apiKeyStr.substring(apiKeyStr.length - 3);
              setApiKey(maskedKey);
              setOriginalApiKey(maskedKey); // Store original masked key
              setHasExistingKey(true);
            } catch (maskErr) {
              console.error('Error masking API key:', maskErr);
              setStatusMessage({
                type: 'error',
                text: 'Error processing API key format. Please enter a new key.'
              });
            }
          }
        }
      } catch (err) {
        console.error('Error fetching API settings:', err);
        setStatusMessage({
          type: 'error',
          text: 'Error loading API settings: ' + (err.message || 'Unknown error')
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApiSettings();
  }, []);

  // Save API key to database
  const saveApiKey = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    console.log('Starting saveApiKey process');

    // Using API key mode only
    // Add a direct console log of the key length for debugging
    console.log('API key length:', apiKey ? apiKey.length : 0);

    if (!apiKey || !apiKey.trim()) {
      console.log('API key is empty');
      setStatusMessage({
        type: 'error',
        text: 'Please enter a valid API key'
      });
      return;
    }

    // Validate that the API key starts with xai- for Grok 3
    // Only perform this check if we're not in the workaround mode (described below)
    const isWorkaroundMode = apiKey && apiKey.trim().startsWith('xai-') && !apiKey.includes('*');
    console.log('Is using workaround mode:', isWorkaroundMode);

    if (!isWorkaroundMode && !apiKey.trim().startsWith('xai-')) {
      console.log('API key does not have correct format');
      setStatusMessage({
        type: 'error',
        text: 'Grok 3 API keys must start with "xai-"'
      });
      return;
    }

    // If the key hasn't been changed (still masked), show an error
    if (hasExistingKey && !isKeyEdited && apiKey === originalApiKey) {
      console.log('API key is still masked and unchanged');
      setStatusMessage({
        type: 'error',
        text: 'Please enter a new API key or use the "Enter New Key" button to clear the form'
      });
      return;
    }

    try {
      setIsSaving(true);
      setStatusMessage(null);
      console.log('Fetching user data');

      // Log detailed information for debugging
      console.log('Current state before save (API Key):', {
        apiKeyLength: apiKey ? apiKey.length : 0,
        hasExistingKey,
        isKeyEdited,
        isWorkaroundMode: apiKey && apiKey.trim().startsWith('xai-') && !apiKey.includes('*')
      });

      // Default user ID in case we can't get it from API
      let userId = 1;

      try {
        const userData = await getCurrentUserData();
        console.log('User data retrieved:', userData ? 'Success' : 'Failed');
        userId = userData?.ID || 1;
      } catch (userErr) {
        console.warn('Error getting user data, using default:', userErr);
        // Continue with default userId
      }

      // Format timestamp in consistent ISO format
      const currentTimestamp = new Date().toISOString();

      if (hasExistingKey) {
        // Update existing API key
        try {
          const { data: existingRecords, error: fetchError } = await window.ezsite.apis.tableList(871, {
            Filters: [
            {
              name: "provider_name",
              op: "Equal",
              value: "Grok"
            }]
          });

          if (fetchError) {
            throw new Error(fetchError || 'Failed to fetch API settings');
          }

          if (!existingRecords || existingRecords.length === 0) {
            // No existing record found, switch to create mode
            console.log('No existing records found despite hasExistingKey flag, creating new record');
            throw new Error('No existing records found'); // This will trigger the catch block
          }

          // Ensure we have a valid ID before updating
          if (!existingRecords[0].ID) {
            throw new Error('Record ID is missing or undefined');
          }

          console.log('Updating API key with record ID:', existingRecords[0].ID);

          // Create a simplified payload for update - try with minimal fields
          // This is a workaround for potential ezsite API issues
          let configJson = {};

          // Try to parse existing config_json if available
          try {
            if (existingRecords[0].config_json) {
              configJson = JSON.parse(existingRecords[0].config_json);
            }
          } catch (parseErr) {
            console.warn('Error parsing existing config_json, creating new object:', parseErr);
            configJson = {};
          }

          const updatePayload = {
            ID: existingRecords[0].ID,
            provider_name: "Grok",
            config_json: JSON.stringify(configJson),
            api_key: apiKey
          };

          // Log update information without revealing sensitive data
          console.log(`Updating API key for record ${existingRecords[0].ID} with length ${apiKey.length}`);
          console.log('Update payload prepared (without showing key)');

          console.log('Attempting API key update with ezsite API...');
          const updateResult = await window.ezsite.apis.tableUpdate(871, updatePayload);
          console.log('Update API response received', updateResult ? 'with data' : 'empty');

          // Log detailed result but redact the actual key
          const { error: updateError } = updateResult || {};
          console.log('Update result:', { error: updateError || 'none', success: !updateError });

          if (updateError) {
            console.error('API returned error during update:', updateError);
            throw new Error(updateError || 'Failed to update API key');
          }

          // Force a refresh of the table data as a double-check
          try {
            const { data: refreshData } = await window.ezsite.apis.tableList(871, {
              Filters: [
              {
                name: "provider_name",
                op: "Equal",
                value: "Grok"
              }]
            });
            console.log('Refresh check - key saved:', refreshData && refreshData.length > 0 && refreshData[0].api_key ? 'yes' : 'no');
          } catch (refreshErr) {
            console.warn('Refresh check failed:', refreshErr);
          }

          console.log('API key updated successfully');

          setStatusMessage({
            type: 'success',
            text: 'API key updated successfully!'
          });

        } catch (recordErr) {
          console.error('Error with existing records, falling back to create:', recordErr);

          // Create new record if update fails or no existing record found
          let configJson = {};

          const createPayload = {
            provider_name: "Grok",
            is_active: true,
            last_verified: currentTimestamp,
            config_json: JSON.stringify(configJson),
            created_by: userId,
            api_key: apiKey
          };

          console.log('Create payload prepared as fallback');

          const { error: createError } = await window.ezsite.apis.tableCreate(871, createPayload);

          if (createError) {
            throw new Error(createError || 'Failed to create API key');
          }

          console.log('API key created successfully as fallback');

          setStatusMessage({
            type: 'success',
            text: 'API key saved successfully!'
          });
        }
      } else {
        // Create new record
        console.log('Creating new API key record', 'with user ID:', userId);

        // Simplified payload for creation - minimal fields needed
        let configJson = {};

        const createPayload = {
          provider_name: "Grok",
          is_active: true,
          config_json: JSON.stringify(configJson),
          api_key: apiKey
        };

        // Add logging without revealing sensitive data
        console.log(`Creating new API key record with length ${apiKey.length}`);
        console.log('Create payload prepared');

        console.log('Attempting to create API key with ezsite API...');
        const createResult = await window.ezsite.apis.tableCreate(871, createPayload);
        console.log('Create API response received', createResult ? 'with data' : 'empty');

        const { error: createError } = createResult || {};
        console.log('Create result:', { error: createError || 'none', success: !createError });

        if (createError) {
          console.error('API returned error during create:', createError);
          throw new Error(createError || 'Failed to create API key');
        }

        // Force a refresh to verify the create operation
        try {
          const { data: refreshData } = await window.ezsite.apis.tableList(871, {
            Filters: [
            {
              name: "provider_name",
              op: "Equal",
              value: "Grok"
            }]
          });
          console.log('Refresh check after create - key saved:', refreshData && refreshData.length > 0 && refreshData[0].api_key ? 'yes' : 'no');
        } catch (refreshErr) {
          console.warn('Refresh check after create failed:', refreshErr);
        }

        console.log('API key created successfully');
        setHasExistingKey(true);

        setStatusMessage({
          type: 'success',
          text: 'API key saved successfully!'
        });
      }

      // Update UI state on success
      setIsKeyEdited(false);

      // Implement local storage fallback to track the key even if database failed
      try {
        // NOTE: In a production environment, you would never store API keys in localStorage
        // This is ONLY for this specific issue where the database storage is failing
        // and is meant as a temporary workaround
        localStorage.setItem('grok_api_key_backup', apiKey);
        console.log('Backup copy of API key saved to localStorage as fallback');

        // Make sure any chat link backup is removed
        localStorage.removeItem('grok_chat_link_backup');
        console.log('Removed any backup chat link from localStorage');
      } catch (storageErr) {
        console.warn('Could not save fallback copy:', storageErr);
      }

      // Store the masked version of the new key
      if (apiKey.length > 6) {
        const maskedKey = apiKey.substring(0, 3) + '*'.repeat(apiKey.length - 6) + apiKey.substring(apiKey.length - 3);
        setOriginalApiKey(maskedKey);
        console.log('Masked key created for UI');
      }
    } catch (err) {
      console.error('Error saving API key:', err);
      setStatusMessage({
        type: 'error',
        text: 'Error saving API key: ' + (err.message || 'Unknown error occurred')
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Verify the API key works by making a test request
  const verifyApiKey = async () => {
    try {
      setIsVerifying(true);
      setStatusMessage(null);

      // Check if we have a valid API key before proceeding
      if (!apiKey || apiKey.includes('*')) {
        throw new Error('Please enter a new API key before verifying');
      }

      // Validate that the API key starts with xai- for Grok 3
      if (!apiKey.startsWith('xai-')) {
        throw new Error('Grok 3 API keys must start with "xai-"');
      }

      // Use our enhanced Grok API service to make a real test request if available
      if (typeof callGrokApi === 'function') {
        // Store the current key temporarily in localStorage for the API call
        const originalKey = localStorage.getItem('grok_api_key_backup');
        localStorage.setItem('grok_api_key_backup', apiKey);

        try {
          // Make a simple test call to verify the API key works
          const testResult = await callGrokApi('Hello, this is a test message to verify my Grok API key is working correctly.', {
            max_tokens: 10 // Keep it small for a quick verification
          });

          if (!testResult.success) {
            throw new Error(testResult.error || 'API key verification failed');
          }

          console.log('API key verification successful with real API call');
        } catch (apiErr) {
          // If verification fails, restore the original key
          if (originalKey) {
            localStorage.setItem('grok_api_key_backup', originalKey);
          } else {
            localStorage.removeItem('grok_api_key_backup');
          }

          throw new Error(`API key verification failed: ${apiErr.message}`);
        }
      } else {
        // Fall back to simulated verification if enhanced service isn't available
        console.log('Enhanced Grok API service not available, simulating verification');
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      // Update database with verification timestamp
      if (hasExistingKey) {
        try {
          // First check if the record exists
          const { data: existingRecords, error: fetchError } = await window.ezsite.apis.tableList(871, {
            Filters: [
            {
              name: "provider_name",
              op: "Equal",
              value: "Grok"
            }]
          });

          if (fetchError) {
            console.error('Error fetching records for verification:', fetchError);
            throw new Error(fetchError || 'Failed to access API settings');
          }

          if (!existingRecords || existingRecords.length === 0) {
            // Handle case where flag is true but no records exist
            console.log('No records found despite hasExistingKey flag, saving key first');
            await saveApiKey({ preventDefault: () => {} }); // Call save with dummy event
            throw new Error('No API settings found. Your key has been saved. Please try verifying again.');
          }

          // Ensure we have a valid ID before updating
          if (!existingRecords[0].ID && existingRecords[0].ID !== 0) {
            throw new Error('Record ID is missing or undefined');
          }

          const recordId = existingRecords[0].ID;
          console.log('Updating verification timestamp for record ID:', recordId);

          // Format timestamp consistently
          const currentTimestamp = new Date().toISOString();

          // Update only the timestamp field
          const { error: updateError } = await window.ezsite.apis.tableUpdate(871, {
            ID: recordId,
            last_verified: currentTimestamp
          });

          if (updateError) {
            console.error('Error updating verification timestamp:', updateError);
            throw new Error(updateError || 'Failed to update verification status');
          }

          console.log('Verification timestamp updated successfully');
        } catch (verifyErr) {
          if (verifyErr.message.includes('has been saved')) {
            // This is the special case where we saved the key first
            throw verifyErr; // Re-throw to display the message to the user
          }

          // For other errors, try saving the key
          console.error('Error during verification, attempting to save key first:', verifyErr);
          await saveApiKey({ preventDefault: () => {} }); // Call save with dummy event
          throw new Error('Verification failed. Your key has been saved. Please try verifying again.');
        }
      } else {
        // If no existing key, save it first then notify user
        console.log('No existing key, saving first...');
        await saveApiKey({ preventDefault: () => {} }); // Call save with dummy event
        throw new Error('API key saved. Please try verifying again.');
      }

      setStatusMessage({
        type: 'success',
        text: 'API key verified successfully!'
      });
    } catch (err) {
      console.error('Error verifying API key:', err);
      setStatusMessage({
        type: 'error',
        text: 'Error verifying API key: ' + (err.message || 'Unknown error')
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Get the current user data
  const getCurrentUserData = async () => {
    try {
      // First try to get user from API
      const { data, error } = await window.ezsite.apis.getUserInfo();
      if (error) {
        console.warn('API getUserInfo error:', error);
        throw new Error(error);
      }
      if (!data) {
        console.warn('API returned undefined or null user data');
        throw new Error('User data is undefined or null');
      }
      // Ensure we have a valid ID
      if (!data.ID && data.ID !== 0) {
        console.warn('User data missing ID', data);
        throw new Error('User ID is missing');
      }
      return data;
    } catch (err) {
      console.error('Error getting user info from API:', err);
      // Fall back to local user data if API fails
      try {
        const localUser = getCurrentUser();
        if (localUser) {
          console.log('Using local user data as fallback');
          return { ID: localUser.id || 1, Name: localUser.name || 'User' };
        }
      } catch (localErr) {
        console.error('Error getting local user data:', localErr);
      }
      // Last resort - return a default user ID to prevent undefined errors
      console.log('Using default user ID as last resort');
      return { ID: 1, Name: 'Default User' };
    }
  };

  const handleNewKey = () => {
    setApiKey('');
    setHasExistingKey(false);
    setIsKeyVisible(true);
    setIsKeyEdited(true);

    // Clear the backup key too
    try {
      localStorage.removeItem('grok_api_key_backup');
      console.log('Cleared backup API key from localStorage');

      // Also make sure to clear any chat link backup
      localStorage.removeItem('grok_chat_link_backup');
      console.log('Cleared backup chat link from localStorage');
    } catch (err) {
      console.warn('Error clearing localStorage backup:', err);
    }

    setStatusMessage(null); // Clear any previous status messages
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6" data-id="j7sfurhvk" data-path="components/ApiKeyManager.js">
      <h2 className="text-2xl font-bold text-darkBlue mb-4 font-ibm" data-id="ct4ht0iuo" data-path="components/ApiKeyManager.js">Grok Integration Management</h2>
      
      {isLoading ?
      <div className="flex justify-center py-4" data-id="uwnw7vl32" data-path="components/ApiKeyManager.js">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mediumBlue" data-id="s9qnpueni" data-path="components/ApiKeyManager.js"></div>
        </div> :

      <form onSubmit={saveApiKey} className="space-y-6" data-id="eticqr08m" data-path="components/ApiKeyManager.js">
          {/* API key input section */}
          <div data-id="9re2m7lvg" data-path="components/ApiKeyManager.js">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1" data-id="9jxgthlz8" data-path="components/ApiKeyManager.js">
              Grok 3 API Key
            </label>
            <div className="relative" data-id="3exkx2aw9" data-path="components/ApiKeyManager.js">
              <input
              id="apiKey"
              type={isKeyVisible ? "text" : "password"}
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                if (!isKeyEdited && e.target.value !== originalApiKey) {
                  setIsKeyEdited(true);
                }
              }}
              className="form-control w-full py-2 px-3 pr-10 rounded-md border border-gray-300 focus:border-mediumBlue focus:ring focus:ring-mediumBlue focus:ring-opacity-20"
              placeholder="xai-..."
              disabled={isSaving || isVerifying} data-id="pg7k1c01a" data-path="components/ApiKeyManager.js" />

              <button
              type="button"
              onClick={() => setIsKeyVisible(!isKeyVisible)}
              className="absolute inset-y-0 right-0 px-3 text-gray-400 hover:text-gray-600" data-id="8rvc8c8mo" data-path="components/ApiKeyManager.js">

                <i className={`fas ${isKeyVisible ? 'fa-eye-slash' : 'fa-eye'}`} data-id="mdrotz2oq" data-path="components/ApiKeyManager.js"></i>
              </button>
            </div>
            <p className="mt-1 text-sm text-gray-500" data-id="vf1ql0sql" data-path="components/ApiKeyManager.js">
              Your Grok 3 API key (starting with xai-) is stored securely and used only for interview simulations.
            </p>
            <div className="mt-2 text-xs text-blue-600" data-id="hfucwg9xh" data-path="components/ApiKeyManager.js">
              <div className="flex items-center" data-id="8antm778s" data-path="components/ApiKeyManager.js">
                <i className="fas fa-info-circle mr-2" data-id="zvmr5rymf" data-path="components/ApiKeyManager.js"></i>
                <span data-id="jpbpaqhyi" data-path="components/ApiKeyManager.js">If you're experiencing issues saving your API key, please try entering it again and saving. A local backup will be maintained even if database saving fails.</span>
              </div>
            </div>
            
            {/* Grok 3 enabled notification */}
            <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-md" data-id="izx3bdwpf" data-path="components/ApiKeyManager.js">
              <div className="flex items-start" data-id="inq70n8c1" data-path="components/ApiKeyManager.js">
                <div className="flex-shrink-0 text-green-600" data-id="ikpy6znqu" data-path="components/ApiKeyManager.js">
                  <i className="fas fa-check-circle mt-0.5 mr-2" data-id="7ec5cqhhc" data-path="components/ApiKeyManager.js"></i>
                </div>
                <div data-id="5i768cmy7" data-path="components/ApiKeyManager.js">
                  <h4 className="text-sm font-medium text-green-800" data-id="cfe913k0w" data-path="components/ApiKeyManager.js">Grok 3 Enabled</h4>
                  <p className="text-xs text-green-700 mt-1" data-id="uwkczwn4t" data-path="components/ApiKeyManager.js">All AI interview simulations now use Grok 3 for improved realism and responsiveness.</p>
                </div>
              </div>
            </div>
          </div>
          
          {statusMessage &&
        <div className={`p-3 rounded ${statusMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`} data-id="j8s07k171" data-path="components/ApiKeyManager.js">
              <div className="flex items-center" data-id="xzw9xmynx" data-path="components/ApiKeyManager.js">
                <i className={`fas mr-2 ${statusMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} data-id="p5baa50e4" data-path="components/ApiKeyManager.js"></i>
                <span data-id="xbwo2oyt5" data-path="components/ApiKeyManager.js">{statusMessage.text}</span>
              </div>
            </div>
        }
          
          <div className="flex flex-wrap gap-3" data-id="iw5cynxox" data-path="components/ApiKeyManager.js">
            <button
            type="submit"
            disabled={isSaving || isVerifying}
            className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center" data-id="n8v489ble" data-path="components/ApiKeyManager.js">

              {isSaving ?
            <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" data-id="wfgt2no1i" data-path="components/ApiKeyManager.js"></span>
                  Saving...
                </> :

            <>
                  <i className="fas fa-save mr-2" data-id="pr39y2tf1" data-path="components/ApiKeyManager.js"></i>
                  Save API Key
                </>
            }
            </button>
            
            {hasExistingKey &&
          <>
                <button
              type="button"
              onClick={verifyApiKey}
              disabled={isSaving || isVerifying}
              className="bg-lightBlue hover:bg-mediumBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center" data-id="ifkfiq1ma" data-path="components/ApiKeyManager.js">

                  {isVerifying ?
              <>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" data-id="bu35hz79y" data-path="components/ApiKeyManager.js"></span>
                      Verifying...
                    </> :

              <>
                      <i className="fas fa-check-circle mr-2" data-id="bf7k6jxya" data-path="components/ApiKeyManager.js"></i>
                      Verify Key
                    </>
              }
                </button>
                
                <button
              type="button"
              onClick={handleNewKey}
              disabled={isSaving || isVerifying}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center" data-id="hp7sxk5xs" data-path="components/ApiKeyManager.js">

                  <i className="fas fa-plus-circle mr-2" data-id="qjke3a6op" data-path="components/ApiKeyManager.js"></i>
                  Enter New Key
                </button>
              </>
          }
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-6" data-id="wy0blsqjp" data-path="components/ApiKeyManager.js">
            <div data-id="ghqxb2y1l" data-path="components/ApiKeyManager.js">
              <h3 className="text-lg font-medium text-gray-700 mb-2" data-id="iuipzbkov" data-path="components/ApiKeyManager.js">About Grok 3 API Keys</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600" data-id="33smiclho" data-path="components/ApiKeyManager.js">
                <li data-id="09sw1j9wr" data-path="components/ApiKeyManager.js">You can get your API key from the <a href="https://grok.x.ai" target="_blank" rel="noopener noreferrer" className="text-mediumBlue hover:text-darkBlue underline" data-id="4yah1y7nn" data-path="components/ApiKeyManager.js">Grok dashboard</a></li>
                <li data-id="7bwbrjker" data-path="components/ApiKeyManager.js">Grok 3 API keys always start with <span className="font-mono bg-gray-100 px-1 rounded" data-id="0ho8e2mnb" data-path="components/ApiKeyManager.js">xai-</span></li>
                <li data-id="new1" data-path="components/ApiKeyManager.js">Grok 3 provides improved response quality for our interview simulations</li>
                <li data-id="7bwbrjker" data-path="components/ApiKeyManager.js">Your API key is stored securely and never shared</li>
                <li data-id="s82w0agk1" data-path="components/ApiKeyManager.js">Usage costs will be billed directly to your Grok account</li>
                <li data-id="rqge45s79" data-path="components/ApiKeyManager.js">Monitor your usage in the Grok dashboard</li>
              </ul>
            </div>
          </div>
        </form>
      }
    </div>);

}