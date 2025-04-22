// ZAP Labs Error Handling Demo Component
// Demonstrates different error types and handling mechanisms

function ErrorHandlingDemo() {
  const { useState } = React;

  // Access notification system
  const notifications = typeof useNotifications === 'function' ? useNotifications() : null;

  const [isLoading, setIsLoading] = useState(false);
  const [demoResult, setDemoResult] = useState(null);

  // Simulate different types of errors
  const simulateNetworkError = async () => {
    setIsLoading(true);
    setDemoResult(null);

    try {
      // Create a network error
      await window.errorHandler.withTimeout(
        async () => {
          // This will timeout and throw a network error
          await new Promise((_, reject) => setTimeout(() => reject(new window.errorHandler.NetworkError('Connection timed out')), 2000));
        },
        1000 // 1 second timeout
      );
    } catch (error) {
      if (notifications) {
        notifications.handleApiError(error);
      }

      setDemoResult({
        type: 'network',
        error: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAuthError = async () => {
    setIsLoading(true);
    setDemoResult(null);

    try {
      throw new window.errorHandler.AuthenticationError('Your session has expired. Please log in again.');
    } catch (error) {
      if (notifications) {
        notifications.handleApiError(error);
      }

      setDemoResult({
        type: 'auth',
        error: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateRateLimitError = async () => {
    setIsLoading(true);
    setDemoResult(null);

    try {
      throw new window.errorHandler.RateLimitError('Rate limit exceeded', { retryAfter: 30 });
    } catch (error) {
      if (notifications) {
        notifications.handleApiError(error);
      }

      setDemoResult({
        type: 'rateLimit',
        error: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateServerError = async () => {
    setIsLoading(true);
    setDemoResult(null);

    try {
      throw new window.errorHandler.ServerError('Internal server error occurred. Our team has been notified.');
    } catch (error) {
      if (notifications) {
        notifications.handleApiError(error);
      }

      setDemoResult({
        type: 'server',
        error: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateValidationError = async () => {
    setIsLoading(true);
    setDemoResult(null);

    try {
      throw new window.errorHandler.ValidationError('Validation failed', {
        fields: [
        { field: 'email', message: 'Invalid email format' },
        { field: 'password', message: 'Password too short' }]

      });
    } catch (error) {
      if (notifications) {
        notifications.handleApiError(error);
      }

      setDemoResult({
        type: 'validation',
        error: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateNotFoundError = async () => {
    setIsLoading(true);
    setDemoResult(null);

    try {
      throw new window.errorHandler.ResourceNotFoundError('The requested scenario was not found');
    } catch (error) {
      if (notifications) {
        notifications.handleApiError(error);
      }

      setDemoResult({
        type: 'notFound',
        error: error
      });
    } finally {
      setIsLoading(false);
    }
  };

  const simulateRetryMechanism = async () => {
    setIsLoading(true);
    setDemoResult(null);

    let attemptCount = 0;

    try {
      await window.errorHandler.withRetry(
        async () => {
          attemptCount++;
          if (attemptCount < 3) {
            // Fail on the first two attempts
            throw new window.errorHandler.NetworkError(`Failed attempt ${attemptCount}`);
          }
          return { success: true, data: 'Request succeeded after retries' };
        },
        {
          maxRetries: 3,
          baseDelay: 1000,
          exponential: true
        }
      );

      setDemoResult({
        type: 'retry',
        success: true,
        message: `Succeeded after ${attemptCount} attempts`
      });

      if (notifications) {
        notifications.success(`Request succeeded after ${attemptCount} attempts`);
      }

    } catch (error) {
      if (notifications) {
        notifications.handleApiError(error);
      }

      setDemoResult({
        type: 'retry',
        success: false,
        error: error,
        attempts: attemptCount
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format error details for display
  const formatErrorDetails = (error) => {
    if (!error) return null;

    return (
      <div className="mt-2 text-sm" data-id="ejlyh6dod" data-path="components/ErrorHandlingDemo.js">
        <div data-id="uqco8mm96" data-path="components/ErrorHandlingDemo.js"><strong data-id="09zwk68nn" data-path="components/ErrorHandlingDemo.js">Name:</strong> {error.name}</div>
        <div data-id="4wlljau5p" data-path="components/ErrorHandlingDemo.js"><strong data-id="7rjf0y7na" data-path="components/ErrorHandlingDemo.js">Message:</strong> {error.message}</div>
        {error.code && <div data-id="t03jykwd7" data-path="components/ErrorHandlingDemo.js"><strong data-id="id5iq174z" data-path="components/ErrorHandlingDemo.js">Code:</strong> {error.code}</div>}
        {error.retryAfter && <div data-id="2urv3hvpm" data-path="components/ErrorHandlingDemo.js"><strong data-id="40cw4c37z" data-path="components/ErrorHandlingDemo.js">Retry After:</strong> {error.retryAfter} seconds</div>}
        {error.details &&
        <div data-id="mlfecb6w4" data-path="components/ErrorHandlingDemo.js">
            <strong data-id="wcpiyimzn" data-path="components/ErrorHandlingDemo.js">Details:</strong>
            <pre className="mt-1 bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32" data-id="4fs9mre7i" data-path="components/ErrorHandlingDemo.js">
              {JSON.stringify(error.details, null, 2)}
            </pre>
          </div>
        }
      </div>);

  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md" data-id="v2p4ntx1h" data-path="components/ErrorHandlingDemo.js">
      <h2 className="text-2xl font-bold text-darkBlue mb-6" data-id="2c1s0trt4" data-path="components/ErrorHandlingDemo.js">Error Handling Demonstration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" data-id="2i7afaggg" data-path="components/ErrorHandlingDemo.js">
        <button
          onClick={simulateNetworkError}
          disabled={isLoading}
          className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition" data-id="79tiqzh5b" data-path="components/ErrorHandlingDemo.js">

          Simulate Network Error
        </button>
        
        <button
          onClick={simulateAuthError}
          disabled={isLoading}
          className="p-3 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition" data-id="5pk1vkpma" data-path="components/ErrorHandlingDemo.js">

          Simulate Auth Error
        </button>
        
        <button
          onClick={simulateRateLimitError}
          disabled={isLoading}
          className="p-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition" data-id="1q6riq1sc" data-path="components/ErrorHandlingDemo.js">

          Simulate Rate Limit Error
        </button>
        
        <button
          onClick={simulateServerError}
          disabled={isLoading}
          className="p-3 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg transition" data-id="to3dnlgs4" data-path="components/ErrorHandlingDemo.js">

          Simulate Server Error
        </button>
        
        <button
          onClick={simulateValidationError}
          disabled={isLoading}
          className="p-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg transition" data-id="ghm7fvgml" data-path="components/ErrorHandlingDemo.js">

          Simulate Validation Error
        </button>
        
        <button
          onClick={simulateNotFoundError}
          disabled={isLoading}
          className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition" data-id="4dmqrbpn9" data-path="components/ErrorHandlingDemo.js">

          Simulate Not Found Error
        </button>
        
        <button
          onClick={simulateRetryMechanism}
          disabled={isLoading}
          className="p-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg transition md:col-span-2" data-id="mtqnbfd53" data-path="components/ErrorHandlingDemo.js">

          Simulate Retry Mechanism (succeeds after 2 failures)
        </button>
      </div>
      
      {isLoading &&
      <div className="flex justify-center my-4" data-id="28cw01jyk" data-path="components/ErrorHandlingDemo.js">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-mediumBlue" data-id="ub2uyggtw" data-path="components/ErrorHandlingDemo.js"></div>
        </div>
      }
      
      {demoResult &&
      <div className="mt-6" data-id="ac4jv0sx6" data-path="components/ErrorHandlingDemo.js">
          <h3 className="text-lg font-semibold mb-2" data-id="a0cownr4s" data-path="components/ErrorHandlingDemo.js">Result:</h3>
          
          <div className="border rounded-lg p-4 bg-gray-50" data-id="o1j13gmf7" data-path="components/ErrorHandlingDemo.js">
            <div className="font-medium" data-id="w7tmr45vh" data-path="components/ErrorHandlingDemo.js">Error Type: {demoResult.type}</div>
            
            {demoResult.type === 'retry' ?
          <div data-id="klqd6muh8" data-path="components/ErrorHandlingDemo.js">
                <div className="mt-2" data-id="2g1i692fb" data-path="components/ErrorHandlingDemo.js">
                  <strong data-id="errrw088v" data-path="components/ErrorHandlingDemo.js">Success:</strong> {demoResult.success ? 'Yes' : 'No'}
                </div>
                {demoResult.message &&
            <div className="mt-1 text-green-600 font-medium" data-id="pjyi38t6v" data-path="components/ErrorHandlingDemo.js">{demoResult.message}</div>
            }
                {demoResult.attempts &&
            <div className="mt-1" data-id="oaptoqflq" data-path="components/ErrorHandlingDemo.js"><strong data-id="7zyixzmvn" data-path="components/ErrorHandlingDemo.js">Attempts:</strong> {demoResult.attempts}</div>
            }
                {demoResult.error && formatErrorDetails(demoResult.error)}
              </div> :

          formatErrorDetails(demoResult.error)
          }
            
            <div className="mt-4 pt-4 border-t" data-id="kp2cvzztg" data-path="components/ErrorHandlingDemo.js">
              <strong data-id="ewpsa93zt" data-path="components/ErrorHandlingDemo.js">User-Friendly Message:</strong>
              <div className="mt-1 p-2 bg-gray-100 rounded" data-id="l3xtb7z0c" data-path="components/ErrorHandlingDemo.js">
                {window.errorHandler?.getUserFriendlyMessage(demoResult.error) || demoResult.error?.message}
              </div>
            </div>
          </div>
        </div>
      }
      
      <div className="mt-8 text-sm text-gray-600" data-id="nwvk8gtoo" data-path="components/ErrorHandlingDemo.js">
        <p data-id="nf1e0ifej" data-path="components/ErrorHandlingDemo.js">Note: You can view the toast notifications in the top-right corner of the screen.</p>
        <p className="mt-1" data-id="27nvuk495" data-path="components/ErrorHandlingDemo.js">The network status indicator will appear in the bottom-right when your connection changes.</p>
      </div>
    </div>);

}