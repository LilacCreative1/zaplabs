// Network Status Indicator Component for ZAP Labs
// Shows current network connectivity status

const { useState, useEffect } = React;

function NetworkStatusIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);

    // Define event handlers
    const handleOnline = () => {
      setIsOnline(true);
      // Show the online message briefly
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      // Show the offline message
      setShowOfflineMessage(true);
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Don't render anything if online and message is hidden
  if (isOnline && !showOfflineMessage) {
    return null;
  }

  // If we're back online and showing a recovery message, show a success message
  if (isOnline && showOfflineMessage) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-50 border-l-4 border-green-500 p-3 rounded shadow-md z-50 max-w-xs" data-id="4zpzv5hf1" data-path="components/NetworkStatusIndicator.js">
        <div className="flex items-center" data-id="bgm3pgpat" data-path="components/NetworkStatusIndicator.js">
          <div className="mr-3 text-green-500" data-id="j0oa76yfy" data-path="components/NetworkStatusIndicator.js">
            <i className="fas fa-wifi" data-id="37ezggzxk" data-path="components/NetworkStatusIndicator.js"></i>
          </div>
          <div className="flex-1" data-id="l3fbvp4wo" data-path="components/NetworkStatusIndicator.js">
            <p className="text-sm text-gray-800" data-id="uw1hz2n2m" data-path="components/NetworkStatusIndicator.js">
              Connection restored. Your work will resume automatically.
            </p>
          </div>
          <button
            onClick={() => setShowOfflineMessage(false)}
            className="ml-2 text-gray-400 hover:text-gray-600" data-id="2c8zmf9t7" data-path="components/NetworkStatusIndicator.js">

            <i className="fas fa-times" data-id="b8vuqh8t8" data-path="components/NetworkStatusIndicator.js"></i>
          </button>
        </div>
      </div>);

  }

  // Otherwise, if we're offline, show the offline warning
  return (
    <div className="fixed bottom-4 right-4 bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded shadow-md z-50 max-w-xs" data-id="ddh9sjkdn" data-path="components/NetworkStatusIndicator.js">
      <div className="flex" data-id="vyf2zntoi" data-path="components/NetworkStatusIndicator.js">
        <div className="mr-3 text-yellow-500" data-id="xqt7zne9l" data-path="components/NetworkStatusIndicator.js">
          <i className="fas fa-exclamation-triangle" data-id="5laph4n44" data-path="components/NetworkStatusIndicator.js"></i>
        </div>
        <div className="flex-1" data-id="yrz2huhnj" data-path="components/NetworkStatusIndicator.js">
          <p className="text-sm font-medium text-gray-800" data-id="42cf9ycpe" data-path="components/NetworkStatusIndicator.js">You are offline</p>
          <p className="text-xs text-gray-600 mt-1" data-id="z3gogcy02" data-path="components/NetworkStatusIndicator.js">
            Some features may be unavailable. We'll keep trying to reconnect.
          </p>
        </div>
      </div>
    </div>);

}