// Error Message Component for ZAP Labs
// Displays user-friendly error messages

function ErrorMessage({ error, retry, dismiss }) {
  // Default error message
  const defaultMessage = "An error occurred. Please try again or contact support.";

  // Get appropriate error message based on error type
  const getErrorMessage = () => {
    if (!error) return defaultMessage;

    // If it's an object with a known structure
    if (typeof error === 'object') {
      // Check for standard error properties
      if (error.message) {
        return error.message;
      }

      // Check for API response error format
      if (error.error && typeof error.error === 'string') {
        return error.error;
      }

      // Check for name-based errors (from our error handler)
      if (error.name) {
        switch (error.name) {
          case 'NetworkError':
            return 'Network connection issue. Please check your internet connection.';
          case 'AuthenticationError':
            return 'Authentication error. Please log in again.';
          case 'RateLimitError':
            return `Rate limit exceeded. Please try again in ${error.retryAfter || 60} seconds.`;
          case 'ServerError':
            return 'Server error. Our team has been notified.';
          case 'ResourceNotFoundError':
            return 'The requested resource was not found.';
          case 'ValidationError':
            return 'Some information is incorrect or incomplete.';
          default:
            return error.message || defaultMessage;
        }
      }
    }

    // If it's just a string
    if (typeof error === 'string') {
      return error;
    }

    return defaultMessage;
  };

  // Determine error type for styling
  const getErrorType = () => {
    if (!error) return 'error';

    if (typeof error === 'object' && error.name) {
      switch (error.name) {
        case 'NetworkError':
          return 'warning';
        case 'RateLimitError':
          return 'warning';
        case 'AuthenticationError':
          return 'error';
        default:
          return 'error';
      }
    }

    return 'error';
  };

  // Get appropriate icon
  const getIcon = () => {
    const type = getErrorType();

    switch (type) {
      case 'warning':
        return <i className="fas fa-exclamation-triangle text-yellow-500" data-id="ntcfw0jwx" data-path="components/ErrorMessage.js"></i>;
      case 'info':
        return <i className="fas fa-info-circle text-blue-500" data-id="p9d6iehmj" data-path="components/ErrorMessage.js"></i>;
      case 'error':
      default:
        return <i className="fas fa-exclamation-circle text-red-500" data-id="iol9v9zxj" data-path="components/ErrorMessage.js"></i>;
    }
  };

  // Get appropriate background color
  const getBackgroundColor = () => {
    const type = getErrorType();

    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'error':
      default:
        return 'bg-red-50 border-red-200';
    }
  };

  // Render nothing if no error
  if (!error) return null;

  return (
    <div className={`p-4 my-4 rounded-lg border ${getBackgroundColor()} flex items-start`} data-id="z116g5gcg" data-path="components/ErrorMessage.js">
      <div className="mr-3 pt-1" data-id="wgo3ec4ex" data-path="components/ErrorMessage.js">
        {getIcon()}
      </div>
      <div className="flex-1" data-id="88jz40yu7" data-path="components/ErrorMessage.js">
        <p className="font-medium text-gray-800" data-id="cwxkplpln" data-path="components/ErrorMessage.js">
          {getErrorMessage()}
        </p>
        
        {/* Show details if available (developer mode only) */}
        {process.env.NODE_ENV === 'development' && error.details &&
        <div className="mt-2 text-sm text-gray-600 bg-gray-100 p-2 rounded overflow-auto max-h-32" data-id="vhqmro4r0" data-path="components/ErrorMessage.js">
            <pre data-id="9o8psat6y" data-path="components/ErrorMessage.js">{JSON.stringify(error.details, null, 2)}</pre>
          </div>
        }
        
        {/* Action buttons */}
        <div className="mt-3 flex gap-2" data-id="g5gp4hvow" data-path="components/ErrorMessage.js">
          {retry &&
          <button
            onClick={retry}
            className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition" data-id="oelplmggi" data-path="components/ErrorMessage.js">

              Try Again
            </button>
          }
          
          {dismiss &&
          <button
            onClick={dismiss}
            className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition" data-id="9q0b4z2hu" data-path="components/ErrorMessage.js">

              Dismiss
            </button>
          }
        </div>
      </div>
    </div>);

}