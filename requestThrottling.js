// ZAP Labs Request Throttling Utility

// Advanced throttling utility that can be applied to multiple API endpoints
class RequestThrottler {
  constructor(options = {}) {
    this.requests = {};
    this.options = {
      maxRequestsPerMinute: options.maxRequestsPerMinute || 60,
      maxBurstRequests: options.maxBurstRequests || 10,
      timeWindow: options.timeWindow || 60 * 1000, // 1 minute in milliseconds
      burstWindow: options.burstWindow || 10 * 1000, // 10 seconds in milliseconds
      cooldownPeriod: options.cooldownPeriod || 5 * 60 * 1000, // 5 minutes in milliseconds
      enabled: options.enabled !== undefined ? options.enabled : true
    };

    // Track endpoints that have been throttled to prevent abuse
    this.throttledEndpoints = {};

    // Clean up old requests periodically
    setInterval(() => this.cleanupOldRequests(), 60 * 1000);
  }

  // Initialize tracking for a new endpoint
  initEndpoint(endpoint) {
    if (!this.requests[endpoint]) {
      this.requests[endpoint] = [];
    }

    if (!this.throttledEndpoints[endpoint]) {
      this.throttledEndpoints[endpoint] = {
        isThrottled: false,
        throttledUntil: 0,
        consecutiveOverages: 0
      };
    }
  }

  // Clean up old request data
  cleanupOldRequests() {
    const now = Date.now();

    Object.keys(this.requests).forEach((endpoint) => {
      this.requests[endpoint] = this.requests[endpoint].filter(
        (time) => now - time < this.options.timeWindow
      );

      // Reset throttling status if cooldown period has passed
      if (
      this.throttledEndpoints[endpoint] &&
      this.throttledEndpoints[endpoint].isThrottled &&
      now > this.throttledEndpoints[endpoint].throttledUntil)
      {
        this.throttledEndpoints[endpoint].isThrottled = false;
        // But keep track of consecutive overages for repeated offenders
      }
    });
  }

  // Check if a request should be throttled
  shouldThrottle(endpoint) {
    // Skip if throttling is disabled
    if (!this.options.enabled) return false;

    // Initialize endpoint if needed
    this.initEndpoint(endpoint);

    // If endpoint is already throttled, check if throttle period is over
    if (this.throttledEndpoints[endpoint].isThrottled) {
      const now = Date.now();
      if (now < this.throttledEndpoints[endpoint].throttledUntil) {
        // Still in throttle period
        return {
          throttled: true,
          reason: 'ENDPOINT_THROTTLED',
          waitTime: this.throttledEndpoints[endpoint].throttledUntil - now,
          message: `This endpoint is currently throttled. Please wait ${Math.ceil((this.throttledEndpoints[endpoint].throttledUntil - now) / 1000)} seconds.`
        };
      } else {
        // Throttle period over
        this.throttledEndpoints[endpoint].isThrottled = false;
      }
    }

    // Clean up old requests
    const now = Date.now();
    this.requests[endpoint] = this.requests[endpoint].filter(
      (time) => now - time < this.options.timeWindow
    );

    // Check for burst requests (too many in a short period)
    const recentRequests = this.requests[endpoint].filter(
      (time) => now - time < this.options.burstWindow
    );

    if (recentRequests.length >= this.options.maxBurstRequests) {
      // Throttle due to burst
      this.throttledEndpoints[endpoint].consecutiveOverages++;
      this.throttledEndpoints[endpoint].isThrottled = true;

      // Increase throttle duration for repeat offenders
      const throttleDuration = Math.min(
        this.options.cooldownPeriod * Math.pow(2, this.throttledEndpoints[endpoint].consecutiveOverages - 1),
        30 * 60 * 1000 // Max 30 minute throttle
      );

      this.throttledEndpoints[endpoint].throttledUntil = now + throttleDuration;

      return {
        throttled: true,
        reason: 'BURST_LIMIT',
        waitTime: throttleDuration,
        message: `Too many requests in a short period. Please wait ${Math.ceil(throttleDuration / 1000)} seconds.`
      };
    }

    // Check regular rate limit
    if (this.requests[endpoint].length >= this.options.maxRequestsPerMinute) {
      // Find the oldest request in the window to calculate wait time
      const oldestRequest = Math.min(...this.requests[endpoint]);
      const waitTime = oldestRequest + this.options.timeWindow - now;

      return {
        throttled: true,
        reason: 'RATE_LIMIT',
        waitTime: waitTime,
        message: `Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`
      };
    }

    // No throttling needed
    return { throttled: false };
  }

  // Record a new request
  recordRequest(endpoint) {
    // Initialize endpoint if needed
    this.initEndpoint(endpoint);

    // Add current timestamp to the requests array
    this.requests[endpoint].push(Date.now());

    // Return the current count for this endpoint
    return {
      count: this.requests[endpoint].length,
      endpoint: endpoint
    };
  }

  // Get statistics about usage
  getStatistics() {
    const now = Date.now();
    const stats = {
      endpoints: {},
      throttled: []
    };

    // Compile stats for each endpoint
    Object.keys(this.requests).forEach((endpoint) => {
      // Clean up old requests first
      const activeRequests = this.requests[endpoint].filter(
        (time) => now - time < this.options.timeWindow
      );

      const recentRequests = activeRequests.filter(
        (time) => now - time < this.options.burstWindow
      );

      stats.endpoints[endpoint] = {
        totalRequests: activeRequests.length,
        recentRequests: recentRequests.length,
        isThrottled: this.throttledEndpoints[endpoint]?.isThrottled || false,
        consecutiveOverages: this.throttledEndpoints[endpoint]?.consecutiveOverages || 0
      };

      if (this.throttledEndpoints[endpoint]?.isThrottled) {
        stats.throttled.push({
          endpoint,
          throttledUntil: this.throttledEndpoints[endpoint].throttledUntil,
          timeRemaining: Math.max(0, this.throttledEndpoints[endpoint].throttledUntil - now)
        });
      }
    });

    return stats;
  }
}

// Create a global instance with default settings
const globalThrottler = new RequestThrottler({
  maxRequestsPerMinute: 60, // 60 requests per minute (1 per second on average)
  maxBurstRequests: 10, // No more than 10 requests in a 10-second window
  enabled: true // Throttling is enabled by default
});

// Function to throttle a specific endpoint
async function throttledRequest(endpoint, requestFn) {
  const throttleResult = globalThrottler.shouldThrottle(endpoint);

  if (throttleResult.throttled) {
    console.warn(`Request to ${endpoint} throttled: ${throttleResult.message}`);
    throw new Error(throttleResult.message);
  }

  // Record this request
  globalThrottler.recordRequest(endpoint);

  // Execute the request function
  return await requestFn();
}

// Get throttling statistics
function getThrottlingStats() {
  return globalThrottler.getStatistics();
}

// Update throttling configuration
function configureThrottling(options) {
  Object.assign(globalThrottler.options, options);
  return { success: true, currentSettings: { ...globalThrottler.options } };
}