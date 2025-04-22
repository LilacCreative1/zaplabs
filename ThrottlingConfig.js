// ZAP Labs Throttling Configuration Component

function ThrottlingConfig() {
  const { useState, useEffect } = React;

  const [config, setConfig] = useState({
    maxRequestsPerMinute: 60,
    maxBurstRequests: 10,
    enabled: true
  });

  const [originalConfig, setOriginalConfig] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Load current throttling configuration
  useEffect(() => {
    const loadConfig = () => {
      try {
        setIsLoading(true);

        // Get the current throttling configuration if the utility is available
        if (typeof configureThrottling === 'function') {
          // This doesn't actually change any settings, just returns current ones
          const result = configureThrottling({});
          if (result.success && result.currentSettings) {
            setConfig({
              maxRequestsPerMinute: result.currentSettings.maxRequestsPerMinute || 60,
              maxBurstRequests: result.currentSettings.maxBurstRequests || 10,
              enabled: result.currentSettings.enabled !== undefined ? result.currentSettings.enabled : true
            });

            // Save original config for comparison
            setOriginalConfig({
              maxRequestsPerMinute: result.currentSettings.maxRequestsPerMinute || 60,
              maxBurstRequests: result.currentSettings.maxBurstRequests || 10,
              enabled: result.currentSettings.enabled !== undefined ? result.currentSettings.enabled : true
            });
          }
        }

        // Get throttling stats if available
        if (typeof getThrottlingStats === 'function') {
          const statsResult = getThrottlingStats();
          setStats(statsResult);
        }
      } catch (error) {
        console.error('Error loading throttling configuration:', error);
        setStatusMessage({
          type: 'error',
          text: 'Failed to load throttling configuration: ' + (error.message || 'Unknown error')
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();

    // Set up periodic refresh for stats
    const intervalId = setInterval(() => {
      if (typeof getThrottlingStats === 'function') {
        try {
          const statsResult = getThrottlingStats();
          setStats(statsResult);
        } catch (error) {
          console.error('Error refreshing throttling stats:', error);
        }
      }
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Check for changes
  useEffect(() => {
    if (isLoading) return;

    const hasChanged =
    originalConfig.maxRequestsPerMinute !== config.maxRequestsPerMinute ||
    originalConfig.maxBurstRequests !== config.maxBurstRequests ||
    originalConfig.enabled !== config.enabled;

    setHasChanges(hasChanged);
  }, [config, originalConfig, isLoading]);

  // Handle saving configuration
  const handleSaveConfig = () => {
    if (!hasChanges) return;

    try {
      setIsSaving(true);
      setStatusMessage(null);

      if (typeof configureThrottling === 'function') {
        const result = configureThrottling({
          maxRequestsPerMinute: config.maxRequestsPerMinute,
          maxBurstRequests: config.maxBurstRequests,
          enabled: config.enabled
        });

        if (result.success) {
          setOriginalConfig({ ...config });
          setStatusMessage({
            type: 'success',
            text: 'Throttling configuration updated successfully!'
          });
        } else {
          throw new Error('Failed to update throttling configuration');
        }
      } else {
        throw new Error('Throttling configuration utility not available');
      }
    } catch (error) {
      console.error('Error saving throttling configuration:', error);
      setStatusMessage({
        type: 'error',
        text: 'Failed to save throttling configuration: ' + (error.message || 'Unknown error')
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle different input types
    if (type === 'checkbox') {
      setConfig((prev) => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      setConfig((prev) => ({
        ...prev,
        [name]: parseInt(value, 10)
      }));
    } else {
      setConfig((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Discard changes and reset to original config
  const handleResetConfig = () => {
    setConfig({ ...originalConfig });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-4" data-id="omihbe37v" data-path="components/ThrottlingConfig.js">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mediumBlue" data-id="1260wwsqc" data-path="components/ThrottlingConfig.js"></div>
      </div>);

  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6" data-id="la4xc0kkf" data-path="components/ThrottlingConfig.js">
      <h2 className="text-xl font-bold text-darkBlue mb-4 font-ibm" data-id="fxpjzfjbl" data-path="components/ThrottlingConfig.js">API Request Throttling</h2>
      
      <div className="grid grid-cols-1 gap-6" data-id="mrg79pc2v" data-path="components/ThrottlingConfig.js">
        {/* Throttling Enabled Toggle */}
        <div data-id="okyz34a0j" data-path="components/ThrottlingConfig.js">
          <div className="flex items-center justify-between" data-id="b1p46dowx" data-path="components/ThrottlingConfig.js">
            <label className="font-medium text-gray-700" data-id="tzm6y3wnl" data-path="components/ThrottlingConfig.js">
              Enable Request Throttling
            </label>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out" data-id="s23yz8ty6" data-path="components/ThrottlingConfig.js">
              <input
                type="checkbox"
                name="enabled"
                id="throttling-enabled"
                className="opacity-0 absolute w-6 h-6"
                checked={config.enabled}
                onChange={handleInputChange} data-id="j7qv2d3qg" data-path="components/ThrottlingConfig.js" />

              <label
                htmlFor="throttling-enabled"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                config.enabled ? 'bg-mediumBlue' : 'bg-gray-300'}`
                } data-id="9r53a4xpp" data-path="components/ThrottlingConfig.js">

                <span
                  className={`block h-6 w-6 rounded-full transform transition-transform duration-200 ease-in-out bg-white border-2 ${
                  config.enabled ? 'translate-x-6 border-mediumBlue' : 'translate-x-0 border-gray-300'}`
                  } data-id="1nev77v2o" data-path="components/ThrottlingConfig.js">
                </span>
              </label>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-500" data-id="efwy081qf" data-path="components/ThrottlingConfig.js">
            When enabled, API requests will be throttled to prevent abuse and ensure stable performance.
          </p>
        </div>
        
        {/* Rate Limit Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="oze1fpf62" data-path="components/ThrottlingConfig.js">
          <div data-id="x00azs4nv" data-path="components/ThrottlingConfig.js">
            <label htmlFor="maxRequestsPerMinute" className="block text-sm font-medium text-gray-700 mb-1" data-id="n1dsxebpc" data-path="components/ThrottlingConfig.js">
              Maximum Requests Per Minute
            </label>
            <input
              id="maxRequestsPerMinute"
              name="maxRequestsPerMinute"
              type="number"
              min="10"
              max="300"
              value={config.maxRequestsPerMinute}
              onChange={handleInputChange}
              disabled={!config.enabled || isSaving}
              className="form-control w-full py-2 px-3 rounded-md border border-gray-300 focus:border-mediumBlue focus:ring focus:ring-mediumBlue focus:ring-opacity-20" data-id="g6xm4wrvl" data-path="components/ThrottlingConfig.js" />

            <p className="mt-1 text-xs text-gray-500" data-id="p1x5n2gqb" data-path="components/ThrottlingConfig.js">
              Limit on total requests per minute (10-300)
            </p>
          </div>
          
          <div data-id="k1c5gma99" data-path="components/ThrottlingConfig.js">
            <label htmlFor="maxBurstRequests" className="block text-sm font-medium text-gray-700 mb-1" data-id="ywp8wqn3m" data-path="components/ThrottlingConfig.js">
              Maximum Burst Requests
            </label>
            <input
              id="maxBurstRequests"
              name="maxBurstRequests"
              type="number"
              min="3"
              max="50"
              value={config.maxBurstRequests}
              onChange={handleInputChange}
              disabled={!config.enabled || isSaving}
              className="form-control w-full py-2 px-3 rounded-md border border-gray-300 focus:border-mediumBlue focus:ring focus:ring-mediumBlue focus:ring-opacity-20" data-id="4vaiw9do7" data-path="components/ThrottlingConfig.js" />

            <p className="mt-1 text-xs text-gray-500" data-id="0xvt3mctr" data-path="components/ThrottlingConfig.js">
              Maximum requests allowed in a 10-second window (3-50)
            </p>
          </div>
        </div>
        
        {/* Status Message */}
        {statusMessage &&
        <div className={`p-3 rounded ${statusMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`} data-id="z9xwp1m6h" data-path="components/ThrottlingConfig.js">
            <div className="flex items-center" data-id="5oaqumief" data-path="components/ThrottlingConfig.js">
              <i className={`fas mr-2 ${statusMessage.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} data-id="1thmp9s04" data-path="components/ThrottlingConfig.js"></i>
              <span data-id="j39oj0jxh" data-path="components/ThrottlingConfig.js">{statusMessage.text}</span>
            </div>
          </div>
        }
        
        {/* Action Buttons */}
        <div className="flex justify-end space-x-3" data-id="iilwengbz" data-path="components/ThrottlingConfig.js">
          {hasChanges &&
          <button
            type="button"
            onClick={handleResetConfig}
            disabled={isSaving}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center" data-id="pj4rgl54w" data-path="components/ThrottlingConfig.js">

              <i className="fas fa-undo mr-2" data-id="1nchlhysi" data-path="components/ThrottlingConfig.js"></i>
              Discard Changes
            </button>
          }
          
          <button
            type="button"
            onClick={handleSaveConfig}
            disabled={!hasChanges || isSaving}
            className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center" data-id="av2bmbi1b" data-path="components/ThrottlingConfig.js">

            {isSaving ?
            <>
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2" data-id="lzomlj7g9" data-path="components/ThrottlingConfig.js"></span>
                Saving...
              </> :

            <>
                <i className="fas fa-save mr-2" data-id="d8489labf" data-path="components/ThrottlingConfig.js"></i>
                Save Configuration
              </>
            }
          </button>
        </div>
        
        {/* Current Throttling Stats */}
        {stats &&
        <div className="mt-4 border-t border-gray-200 pt-4" data-id="64lxuqo3x" data-path="components/ThrottlingConfig.js">
            <h3 className="text-md font-medium text-darkBlue mb-2" data-id="ol3icd3zr" data-path="components/ThrottlingConfig.js">Current Throttling Status</h3>
            
            {stats.throttled && stats.throttled.length > 0 ?
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-3" data-id="vkszzaon9" data-path="components/ThrottlingConfig.js">
                <div className="flex" data-id="h50rk73td" data-path="components/ThrottlingConfig.js">
                  <div className="flex-shrink-0 text-red-500" data-id="kxp9487ft" data-path="components/ThrottlingConfig.js">
                    <i className="fas fa-exclamation-triangle" data-id="12ttjfmjy" data-path="components/ThrottlingConfig.js"></i>
                  </div>
                  <div className="ml-3" data-id="0kbbm1sod" data-path="components/ThrottlingConfig.js">
                    <p className="text-sm text-red-700" data-id="d7m4ajhxv" data-path="components/ThrottlingConfig.js">
                      {stats.throttled.length} endpoint(s) currently throttled
                    </p>
                  </div>
                </div>
              </div> :

          <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-3" data-id="3ayhy24la" data-path="components/ThrottlingConfig.js">
                <div className="flex" data-id="4573ydld2" data-path="components/ThrottlingConfig.js">
                  <div className="flex-shrink-0 text-green-500" data-id="wepz7qfez" data-path="components/ThrottlingConfig.js">
                    <i className="fas fa-check-circle" data-id="nbvucuylx" data-path="components/ThrottlingConfig.js"></i>
                  </div>
                  <div className="ml-3" data-id="yl7hp5azm" data-path="components/ThrottlingConfig.js">
                    <p className="text-sm text-green-700" data-id="4hgnodio3" data-path="components/ThrottlingConfig.js">
                      No endpoints currently throttled
                    </p>
                  </div>
                </div>
              </div>
          }
            
            {Object.keys(stats.endpoints).length > 0 &&
          <div className="overflow-x-auto" data-id="8oxolfqtu" data-path="components/ThrottlingConfig.js">
                <table className="min-w-full divide-y divide-gray-200" data-id="glmcfaq4c" data-path="components/ThrottlingConfig.js">
                  <thead className="bg-gray-50" data-id="ll0j5d8zb" data-path="components/ThrottlingConfig.js">
                    <tr data-id="8ugxhb3yp" data-path="components/ThrottlingConfig.js">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="yisfhhlta" data-path="components/ThrottlingConfig.js">
                        Endpoint
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="y1y5g5za2" data-path="components/ThrottlingConfig.js">
                        Requests (1m)
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="7wun82v90" data-path="components/ThrottlingConfig.js">
                        Burst (10s)
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="h0lhl98st" data-path="components/ThrottlingConfig.js">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200" data-id="gw7ao6ve4" data-path="components/ThrottlingConfig.js">
                    {Object.entries(stats.endpoints).map(([endpoint, data]) =>
                <tr key={endpoint} className={data.isThrottled ? "bg-red-50" : ""} data-id="wv6k2m5wz" data-path="components/ThrottlingConfig.js">
                        <td className="px-4 py-2 text-sm text-gray-900" data-id="37r0i1plm" data-path="components/ThrottlingConfig.js">
                          {endpoint}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500" data-id="owdrxgddk" data-path="components/ThrottlingConfig.js">
                          {data.totalRequests} / {config.maxRequestsPerMinute}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-500" data-id="9gtar7n97" data-path="components/ThrottlingConfig.js">
                          {data.recentRequests} / {config.maxBurstRequests}
                        </td>
                        <td className="px-4 py-2 text-sm" data-id="ntjxs5hr7" data-path="components/ThrottlingConfig.js">
                          {data.isThrottled ?
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" data-id="jw9t9ykrz" data-path="components/ThrottlingConfig.js">
                              Throttled
                            </span> :

                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" data-id="ppb09dj0k" data-path="components/ThrottlingConfig.js">
                              Normal
                            </span>
                    }
                        </td>
                      </tr>
                )}
                  </tbody>
                </table>
              </div>
          }
          </div>
        }
      </div>
    </div>);

}