// ZAP Labs Error Handling Utility
// Provides robust error handling for API requests

/**
 * Error classes for different types of errors
 */
// Define error classes directly on the window object to avoid duplicate declarations
window.ApiError = window.ApiError || class ApiError extends Error {
  constructor(message, code, details = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
  }
};

window.NetworkError = window.NetworkError || class NetworkError extends window.ApiError {
  constructor(message = 'Network connection issue', details = {}) {
    super(message, 'NETWORK_ERROR', details);
    this.name = 'NetworkError';
  }
};

window.AuthenticationError = window.AuthenticationError || class AuthenticationError extends window.ApiError {
  constructor(message = 'Authentication failed', details = {}) {
    super(message, 'AUTH_ERROR', details);
    this.name = 'AuthenticationError';
  }
};

window.RateLimitError = window.RateLimitError || class RateLimitError extends window.ApiError {
  constructor(message = 'Rate limit exceeded', details = {}) {
    super(message, 'RATE_LIMIT', details);
    this.name = 'RateLimitError';
    this.retryAfter = details.retryAfter || 60; // seconds
  }
};

window.ValidationError = window.ValidationError || class ValidationError extends window.ApiError {
  constructor(message = 'Validation failed', details = {}) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
    this.fields = details.fields || [];
  }
};

window.ServerError = window.ServerError || class ServerError extends window.ApiError {
  constructor(message = 'Server error occurred', details = {}) {
    super(message, 'SERVER_ERROR', details);
    this.name = 'ServerError';
  }
};

window.ResourceNotFoundError = window.ResourceNotFoundError || class ResourceNotFoundError extends window.ApiError {
  constructor(message = 'Resource not found', details = {}) {
    super(message, 'NOT_FOUND', details);
    this.name = 'ResourceNotFoundError';
  }
};

/**
 * Parses the error from an API response and returns the appropriate error type
 * @param {Object} error - The error object from the API response
 * @param {Object} response - Optional response data for context
 * @returns {ApiError} - A specific error type based on the error
 */
function parseApiError(error, response = {}) {
  // If it's already an ApiError instance, return it
  if (error instanceof window.ApiError) {
    return error;
  }

  // Handle specific error types based on error message, status code, or other indicators
  const errorMessage = typeof error === 'string' ? error : error?.message || 'Unknown error';
  const statusCode = response?.status || (error?.status ? error.status : null);
  const errorCode = error?.code || '';

  // Handle network errors (no connection, timeout, etc.)
  if (errorMessage.includes('network') ||
  errorMessage.includes('timeout') ||
  errorMessage.includes('connection') ||
  errorMessage.includes('offline') ||
  errorMessage.includes('failed to fetch')) {
    return new window.NetworkError(errorMessage, { originalError: error });
  }

  // Handle authentication errors
  if (statusCode === 401 ||
  errorMessage.includes('auth') ||
  errorMessage.includes('unauthorized') ||
  errorMessage.includes('unauthenticated') ||
  errorMessage.includes('invalid token') ||
  errorMessage.includes('invalid key') ||
  errorMessage.includes('permission')) {
    return new window.AuthenticationError(errorMessage, { originalError: error });
  }

  // Handle rate limiting
  if (statusCode === 429 ||
  errorMessage.includes('rate limit') ||
  errorMessage.includes('too many requests') ||
  errorCode === 'rate_limited') {
    const retryAfter = response?.headers?.get('Retry-After') || 60;
    return new window.RateLimitError(errorMessage, { originalError: error, retryAfter });
  }

  // Handle validation errors
  if (statusCode === 400 ||
  errorMessage.includes('validation') ||
  errorMessage.includes('invalid')) {
    return new window.ValidationError(errorMessage, { originalError: error });
  }

  // Handle server errors
  if (statusCode >= 500 ||
  errorMessage.includes('server error') ||
  errorMessage.includes('internal error')) {
    return new window.ServerError(errorMessage, { originalError: error });
  }

  // Handle not found errors
  if (statusCode === 404 ||
  errorMessage.includes('not found')) {
    return new window.ResourceNotFoundError(errorMessage, { originalError: error });
  }

  // Default to generic API error
  return new window.ApiError(errorMessage, 'UNKNOWN_ERROR', { originalError: error });
}

/**
 * Adds metadata to the error for better tracking and debugging
 * @param {Error} error - The error object
 * @param {Object} context - Additional context data
 * @returns {Error} - The enhanced error
 */
function enhanceError(error, context = {}) {
  const enhancedError = error instanceof window.ApiError ? error : parseApiError(error);

  // Add timestamp
  enhancedError.timestamp = new Date().toISOString();

  // Add additional context
  enhancedError.context = {
    ...enhancedError.context,
    ...context
  };

  return enhancedError;
}

/**
 * Reports an error to logs and monitoring
 * @param {Error} error - The error to report
 * @param {Object} context - Additional context
 */
function reportError(error, context = {}) {
  const enhancedError = enhanceError(error, context);

  console.error('[ERROR]', {
    name: enhancedError.name,
    message: enhancedError.message,
    code: enhancedError.code,
    timestamp: enhancedError.timestamp,
    context: enhancedError.context,
    details: enhancedError.details
  });

  // In a production app, you would send this to monitoring service
  // Example: sendToErrorMonitoring(enhancedError);
}

/**
 * Generates a user-friendly error message based on error type
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
function getUserFriendlyMessage(error) {
  const parsedError = error instanceof window.ApiError ? error : parseApiError(error);

  switch (parsedError.name) {
    case 'NetworkError':
      return 'Connection error: Please check your internet connection and try again.';
    case 'AuthenticationError':
      return 'Authentication error: Please log in again to continue.';
    case 'RateLimitError':
      return `You've reached the maximum number of requests. Please try again in ${parsedError.retryAfter} seconds.`;
    case 'ValidationError':
      return 'Some information is incorrect or missing. Please check your entries and try again.';
    case 'ServerError':
      return 'Server error: We\'re experiencing technical difficulties. Please try again later.';
    case 'ResourceNotFoundError':
      return 'The requested information could not be found.';
    default:
      return 'An error occurred. Please try again or contact support if the problem persists.';
  }
}

/**
 * Handles an API error with appropriate user feedback
 * @param {Error} error - The error to handle
 * @param {Object} options - Options for handling the error
 */
function handleApiError(error, options = {}) {
  const {
    showNotification = true,
    redirectOnAuth = true,
    retryOnNetworkError = false,
    context = {}
  } = options;

  const parsedError = error instanceof window.ApiError ? error : parseApiError(error);

  // Report the error (for monitoring/logs)
  reportError(parsedError, context);

  // Generate user-friendly message
  const userMessage = getUserFriendlyMessage(parsedError);

  // Show notification to user if needed
  if (showNotification) {
    // In a real app, this would use a notification system
    console.warn('[USER NOTIFICATION]', userMessage);
    // Example: showToast(userMessage);
  }

  // Handle specific error types with special actions
  if (parsedError.name === 'AuthenticationError' && redirectOnAuth) {
    // Redirect to login page
    console.log('[AUTH ERROR] Redirecting to login page');
    // Example: window.location.href = '/login';
  }

  if (parsedError.name === 'NetworkError' && retryOnNetworkError) {
    console.log('[NETWORK ERROR] Will retry request when online');
    // Example: queueForRetry(context.request);
  }

  return parsedError;
}

/**
 * Wraps an API call with error handling
 * @param {Function} apiCall - The API function to call
 * @param {Object} options - Error handling options
 * @returns {Promise} - The result of the API call or handled error
 */
async function withErrorHandling(apiCall, options = {}) {
  try {
    const result = await apiCall();

    // Handle API-level errors (where success: false, error: "message")
    if (result && !result.success && result.error) {
      throw new window.ApiError(result.error, 'API_RESPONSE_ERROR');
    }

    return result;
  } catch (error) {
    return {
      success: false,
      error: handleApiError(error, {
        ...options,
        context: { ...options.context, apiCall: apiCall.name }
      })
    };
  }
}

/**
 * Creates a retry mechanism for failed requests
 * @param {Function} apiCall - The API function to call
 * @param {Object} options - Retry options
 * @returns {Promise} - The result of the API call
 */
async function withRetry(apiCall, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    exponential = true,
    retryableErrors = ['NetworkError', 'ServerError'],
    context = {}
  } = options;

  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      return await apiCall();
    } catch (error) {
      attempt++;

      // Parse the error
      const parsedError = error instanceof window.ApiError ? error : parseApiError(error);

      // Check if we should retry this error type
      const shouldRetry = retryableErrors.includes(parsedError.name);

      // If we shouldn't retry or this is the last attempt, handle the error
      if (!shouldRetry || attempt >= maxRetries) {
        return {
          success: false,
          error: handleApiError(error, {
            context: { ...context, apiCall: apiCall.name, attempts: attempt }
          })
        };
      }

      // Calculate delay time (with exponential backoff if enabled)
      const delay = exponential ?
      baseDelay * Math.pow(2, attempt - 1) :
      baseDelay;

      console.log(`[RETRY] Attempt ${attempt}/${maxRetries} failed, retrying in ${delay}ms`);

      // Wait before next retry
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

/**
 * Creates a timeout for API calls to prevent hanging requests
 * @param {Function} apiCall - The API function to call
 * @param {number} timeoutMs - Timeout in milliseconds
 * @returns {Promise} - The result of the API call or timeout error
 */
async function withTimeout(apiCall, timeoutMs = 10000) {
  return Promise.race([
  apiCall(),
  new Promise((_, reject) =>
  setTimeout(() => reject(new window.NetworkError('Request timeout')), timeoutMs)
  )]
  );
}

/**
 * Detects offline status and provides appropriate handling
 * @returns {boolean} - Whether the device is offline
 */
function isOffline() {
  return typeof navigator !== 'undefined' && !navigator.onLine;
}

/**
 * Add event listeners for online/offline status
 * @param {Function} onOnline - Function to call when coming online
 * @param {Function} onOffline - Function to call when going offline
 */
function setupConnectivityHandlers(onOnline = () => {}, onOffline = () => {}) {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }
  return () => {};
}