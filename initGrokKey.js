// Initialize Grok API Key

// This script ensures the API key is available in the database
(function () {
  const GROK_API_TABLE_ID = 871; // API settings table ID
  const DEFAULT_API_KEY = 'xai-YOUR_GROK_API_KEY_HERE'; // Replace with your actual Grok API key

  async function initializeApiKey() {
    try {
      // Check if API key already exists in the database
      const { data, error } = await window.ezsite.apis.tableList(GROK_API_TABLE_ID, {
        Filters: [
        {
          name: "provider_name",
          op: "Equal",
          value: "Grok"
        }]

      });

      if (error) throw error;

      // If no Grok API key exists, create one
      if (!data || data.length === 0) {
        console.log('Initializing Grok API key in database');

        await window.ezsite.apis.tableCreate(GROK_API_TABLE_ID, {
          provider_name: "Grok",
          api_key: DEFAULT_API_KEY,
          is_active: true,
          last_verified: new Date().toISOString(),
          config_json: "{}",
          created_by: 0
        });
      }
    } catch (err) {
      console.error('Error initializing Grok API key in database:', err);
    }
  }

  // Initialize on document ready
  if (document.readyState === 'complete') {
    initializeApiKey();
  } else {
    window.addEventListener('load', initializeApiKey);
  }
})();