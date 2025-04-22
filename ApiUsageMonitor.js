// ZAP Labs API Usage Monitor Component

function ApiUsageMonitor() {
  const { useState, useEffect } = React;

  const [usageLogs, setUsageLogs] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchLogs = () => {
      try {
        setIsLoading(true);
        setError(null);

        // Using the getApiUsageLogs function from grokApiService
        if (typeof getApiUsageLogs === 'function') {
          const result = getApiUsageLogs();
          if (result.success) {
            setUsageLogs(result.data || []);
            setMetrics(result.metrics || {});
          } else {
            throw new Error(result.error || 'Failed to retrieve API logs');
          }
        } else {
          throw new Error('API usage monitoring not available');
        }
      } catch (err) {
        console.error('Error fetching API logs:', err);
        setError(err.message || 'An error occurred fetching usage logs');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();

    // Set up periodic refresh
    const intervalId = setInterval(() => {
      setRefreshTrigger((prev) => prev + 1);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(intervalId);
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const formatTimestamp = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleString();
    } catch (e) {
      return timestamp || 'Unknown';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8" data-id="86ezi286v" data-path="components/ApiUsageMonitor.js">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mediumBlue" data-id="w86nvng5k" data-path="components/ApiUsageMonitor.js"></div>
      </div>);

  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4" data-id="94inbudi0" data-path="components/ApiUsageMonitor.js">
        <div className="flex" data-id="vwikh1wgl" data-path="components/ApiUsageMonitor.js">
          <div className="flex-shrink-0" data-id="oszw4sy4u" data-path="components/ApiUsageMonitor.js">
            <i className="fas fa-exclamation-circle text-red-500" data-id="zy1a9i51g" data-path="components/ApiUsageMonitor.js"></i>
          </div>
          <div className="ml-3" data-id="3lrj5c7vx" data-path="components/ApiUsageMonitor.js">
            <p className="text-sm text-red-700" data-id="y3cauthns" data-path="components/ApiUsageMonitor.js">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-sm text-red-700 hover:text-red-900 font-medium underline" data-id="n4qzbda6w" data-path="components/ApiUsageMonitor.js">

              Try Again
            </button>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" data-id="ew3lokof1" data-path="components/ApiUsageMonitor.js">
      <div className="bg-darkBlue text-white p-4 flex justify-between items-center" data-id="f7xxvbbct" data-path="components/ApiUsageMonitor.js">
        <h3 className="text-lg font-bold" data-id="v79v3964h" data-path="components/ApiUsageMonitor.js">API Usage Monitor</h3>
        <button
          onClick={handleRefresh}
          className="text-white hover:text-zapYellow transition-colors"
          title="Refresh Data" data-id="se93y7gsk" data-path="components/ApiUsageMonitor.js">

          <i className="fas fa-sync-alt" data-id="dww9dpzby" data-path="components/ApiUsageMonitor.js"></i>
        </button>
      </div>
      
      {/* Usage Metrics */}
      {metrics &&
      <div className="p-4 border-b border-gray-200" data-id="oqzcu04rx" data-path="components/ApiUsageMonitor.js">
          <h4 className="font-medium text-darkBlue mb-2" data-id="ojnr5cclk" data-path="components/ApiUsageMonitor.js">Usage Metrics</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" data-id="1d5q9idw8" data-path="components/ApiUsageMonitor.js">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200" data-id="33zynezrx" data-path="components/ApiUsageMonitor.js">
              <div className="text-sm text-gray-500" data-id="jwi28toqm" data-path="components/ApiUsageMonitor.js">Total API Calls</div>
              <div className="text-2xl font-bold text-darkBlue" data-id="egddu8t1m" data-path="components/ApiUsageMonitor.js">{metrics.totalCalls || 0}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200" data-id="8u9brwn7i" data-path="components/ApiUsageMonitor.js">
              <div className="text-sm text-gray-500" data-id="ls2f1n1f5" data-path="components/ApiUsageMonitor.js">Success Rate</div>
              <div className="text-2xl font-bold text-green-600" data-id="vlhcxywn6" data-path="components/ApiUsageMonitor.js">{metrics.successRate || '0%'}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200" data-id="5qufm6o30" data-path="components/ApiUsageMonitor.js">
              <div className="text-sm text-gray-500" data-id="dyu3qrwep" data-path="components/ApiUsageMonitor.js">Errors</div>
              <div className="text-2xl font-bold text-red-500" data-id="obx650jh9" data-path="components/ApiUsageMonitor.js">
                {metrics.totalCalls && metrics.successRate !== '100%' ?
              metrics.totalCalls - (metrics.totalCalls * parseFloat(metrics.successRate) / 100).toFixed(0) :
              0}
              </div>
            </div>
          </div>
          
          {/* Error Breakdown */}
          {metrics.errorBreakdown && Object.keys(metrics.errorBreakdown).length > 0 &&
        <div className="mt-4" data-id="4towh31wy" data-path="components/ApiUsageMonitor.js">
              <h5 className="text-sm font-medium text-gray-700 mb-2" data-id="0yse5q82b" data-path="components/ApiUsageMonitor.js">Error Breakdown</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2" data-id="bxrda3o6c" data-path="components/ApiUsageMonitor.js">
                {Object.entries(metrics.errorBreakdown).map(([code, count]) =>
            <div key={code} className="bg-red-50 p-2 rounded text-xs" data-id="1hxchtbll" data-path="components/ApiUsageMonitor.js">
                    <span className="font-medium" data-id="qekgg9oss" data-path="components/ApiUsageMonitor.js">{code}:</span> {count}
                  </div>
            )}
              </div>
            </div>
        }
        </div>
      }
      
      {/* Recent Logs Table */}
      <div className="p-4" data-id="c8hz9qlfa" data-path="components/ApiUsageMonitor.js">
        <h4 className="font-medium text-darkBlue mb-2" data-id="ptellycwr" data-path="components/ApiUsageMonitor.js">Recent API Calls</h4>
        {usageLogs.length === 0 ?
        <p className="text-gray-500 text-sm" data-id="u6xunjch7" data-path="components/ApiUsageMonitor.js">No API calls have been logged yet.</p> :

        <div className="overflow-x-auto" data-id="x9u9mmnlo" data-path="components/ApiUsageMonitor.js">
            <table className="min-w-full divide-y divide-gray-200" data-id="ond4ehrmf" data-path="components/ApiUsageMonitor.js">
              <thead className="bg-gray-50" data-id="637oifoxb" data-path="components/ApiUsageMonitor.js">
                <tr data-id="nrm1iaab4" data-path="components/ApiUsageMonitor.js">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="khmvu6uyj" data-path="components/ApiUsageMonitor.js">
                    Timestamp
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="fqr0wja6b" data-path="components/ApiUsageMonitor.js">
                    Type
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="r0ium3w8o" data-path="components/ApiUsageMonitor.js">
                    Length
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="vs23d2tld" data-path="components/ApiUsageMonitor.js">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-id="jt80h0uml" data-path="components/ApiUsageMonitor.js">
                    Error
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200" data-id="cuo6cc5yh" data-path="components/ApiUsageMonitor.js">
                {usageLogs.slice(0, 10).map((log, index) =>
              <tr key={index} className={log.success ? "" : "bg-red-50"} data-id="qt84doa34" data-path="components/ApiUsageMonitor.js">
                    <td className="px-4 py-2 text-sm text-gray-500" data-id="d00r2bmq7" data-path="components/ApiUsageMonitor.js">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900" data-id="84tbdwh4x" data-path="components/ApiUsageMonitor.js">
                      {log.requestType || 'Unknown'}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-500" data-id="h97rvfr1k" data-path="components/ApiUsageMonitor.js">
                      {log.promptLength || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-sm" data-id="fomd5os0c" data-path="components/ApiUsageMonitor.js">
                      {log.success ?
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800" data-id="ju27hdj36" data-path="components/ApiUsageMonitor.js">
                          Success
                        </span> :

                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800" data-id="j5ntdq352" data-path="components/ApiUsageMonitor.js">
                          Failed
                        </span>
                  }
                    </td>
                    <td className="px-4 py-2 text-sm text-red-500" data-id="dpg0re871" data-path="components/ApiUsageMonitor.js">
                      {log.errorCode || '-'}
                    </td>
                  </tr>
              )}
              </tbody>
            </table>
            
            {usageLogs.length > 10 &&
          <div className="mt-2 text-sm text-gray-500 text-right" data-id="6qfapq3r8" data-path="components/ApiUsageMonitor.js">
                Showing 10 of {usageLogs.length} records
              </div>
          }
          </div>
        }
      </div>
      
      <div className="bg-gray-50 px-4 py-3 text-xs text-gray-500" data-id="rxbht5u1m" data-path="components/ApiUsageMonitor.js">
        <p data-id="7lxwlpllw" data-path="components/ApiUsageMonitor.js">Note: API usage data is stored locally in your browser and is only visible to administrators.</p>
      </div>
    </div>);

}