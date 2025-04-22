// ZAP Labs Grok API Service Utility

// Backend URL (automatically detect environment)
const BACKEND_URL = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1') ?
'http://localhost:3000' // Local development
: 'https://zap-labs-server.vercel.app'; // Production deployment

console.log(`Using backend URL: ${BACKEND_URL}`);
const API_SETTINGS_TABLE_ID = 871; // API settings table ID

// Function to get the Grok API key from the database
async function getGrokApiKey() {
  try {
    const { data, error } = await window.ezsite.apis.tableList(API_SETTINGS_TABLE_ID, {
      Filters: [
      {
        name: "provider_name",
        op: "Equal",
        value: "Grok"
      },
      {
        name: "is_active",
        op: "Equal",
        value: true
      }]

    });

    if (error) throw new Error(error);
    if (!data || data.length === 0) {
      throw new Error('No active Grok API key found');
    }

    return {
      success: true,
      apiKey: data[0].api_key
    };
  } catch (err) {
    console.error('Error retrieving Grok API key:', err);
    return {
      success: false,
      error: err.message || 'Failed to retrieve API key'
    };
  }
}

// Request tracking for rate limiting
const requestTracker = {
  requests: [],
  maxRequests: 60, // Maximum requests per minute
  timeWindow: 60 * 1000, // 1 minute in milliseconds

  // Check if we're over the rate limit
  isRateLimited() {
    // Clean up old requests (older than our time window)
    const now = Date.now();
    this.requests = this.requests.filter((time) => now - time < this.timeWindow);

    // Check if we're over the limit
    return this.requests.length >= this.maxRequests;
  },

  // Record a new request
  recordRequest() {
    this.requests.push(Date.now());
  },

  // Get time until next available request slot
  getTimeUntilAvailable() {
    if (!this.isRateLimited()) return 0;

    // Find the oldest request and calculate when it will expire from our window
    const oldestRequest = Math.min(...this.requests);
    return oldestRequest + this.timeWindow - Date.now();
  }
};

// Enhanced logging function that doesn't expose sensitive data
async function logApiRequest(requestType, promptLength, success, errorCode = null) {
  // Create a log entry without sensitive data
  const logEntry = {
    timestamp: new Date().toISOString(),
    requestType,
    promptLength,
    success,
    errorCode
  };

  // Log to console (in production, this could send to a monitoring service)
  console.log('API Request Log:', logEntry);

  // In the future this could be stored in a dedicated database table for API logs
  // For now, we'll just keep it in memory during the session
  if (!window.grokApiLogs) {
    window.grokApiLogs = [];
  }
  window.grokApiLogs.unshift(logEntry);
  if (window.grokApiLogs.length > 50) window.grokApiLogs.length = 50;
}

// Function to make secure calls to the backend (which then calls Grok API)
async function callGrokApi(prompt, options = {}) {
  try {
    // Default parameters
    const defaultOptions = {
      model: 'grok-beta',
      max_tokens: 500,
      temperature: 0.7
    };

    // Merge default options with user-provided options
    const requestOptions = { ...defaultOptions, ...options };

    // Log that we're making a request
    console.log('Making request to backend with prompt length:', prompt.length);

    // Record this request for rate limiting
    requestTracker.recordRequest();

    // Log API request
    logApiRequest('grok_completion', prompt.length, true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/grok`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt,
          options: requestOptions
        })
      });

      // Check for CORS errors (response will be undefined for CORS issues)
      if (!response) {
        throw new Error('CORS error: Failed to connect to backend server');
      }

      const data = await response.json();

      if (response.ok && data.success) {
        return {
          success: true,
          data: data.data
        };
      } else {
        // Log API error
        logApiRequest('grok_completion', prompt.length, false, data.error || 'API_ERROR');
        throw new Error(data.error || 'Failed to get response from backend');
      }
    } catch (corsError) {
      console.error('Possible CORS or network error:', corsError);
      logApiRequest('grok_completion', prompt.length, false, 'CORS_ERROR');
      throw new Error(`Connection error: ${corsError.message}. This may be due to CORS restrictions or the server being unavailable.`);
    }
  } catch (error) {
    console.error('Error calling backend for Grok API:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
}

// Format prompt for interview simulation
function formatInterviewPrompt(scenarioData, userMessage, previousMessages = []) {
  // Create a context-rich prompt with scenario details
  const systemPrompt = `You are role-playing as ${scenarioData.name}, a ${scenarioData.age}-year-old subject in a ${scenarioData.type.toLowerCase()} case.
Your profile includes these characteristics: ${scenarioData.tags.join(', ')}.
Background: ${scenarioData.description}

Respond as this character would to an investigator's questions. Keep responses realistic, evasive when appropriate, and consistent with your character profile.
Do not break character under any circumstances. Your responses should be concise (2-4 sentences) and conversational.
`;

  // Add conversation history context if available
  let conversationContext = '';
  if (previousMessages && previousMessages.length > 0) {
    conversationContext =
    '\n\nPrevious conversation:\n' +
    previousMessages.
    map((msg) => {
      return `${msg.sender === 'user' ? 'Investigator' : scenarioData.name}: ${msg.text}`;
    }).
    join('\n');
  }

  // Complete prompt with user's current message
  const fullPrompt = `${systemPrompt}${conversationContext}\n\nInvestigator: ${userMessage}\n\n${scenarioData.name}:`;

  return fullPrompt;
}

// Enhanced getAIResponse function that integrates with the backend
async function getEnhancedAIResponse(scenarioId, userMessage, scenarioData, conversationHistory = []) {
  try {
    // If scenario data wasn't provided, try to get it
    let scenario = scenarioData;
    if (!scenario) {
      const { success, data, error } = await getScenarioById(scenarioId);
      if (!success) throw new Error(error || 'Failed to fetch scenario details');
      scenario = data;
    }

    // Format the prompt with context and conversation history
    const formattedPrompt = formatInterviewPrompt(scenario, userMessage, conversationHistory);

    // Call the backend to get the Grok API response
    const { success, data, error } = await callGrokApi(formattedPrompt);

    if (!success) throw new Error(error || 'Failed to get response');

    return {
      success: true,
      data: {
        message: data
      }
    };
  } catch (err) {
    console.error('Error getting AI response:', err);
    return {
      success: false,
      error: err.message || 'Failed to get response'
    };
  }
}

// Function to get a scenario by ID from the database
async function getScenarioById(scenarioId) {
  try {
    const SCENARIOS_TABLE_ID = 893; // The scenarios table ID

    console.log(`Fetching scenario with ID: ${scenarioId} from table ${SCENARIOS_TABLE_ID}`);

    // First try to get the scenario from the database
    try {
      const { data, error } = await window.ezsite.apis.tableList(SCENARIOS_TABLE_ID, {
        Filters: [
        {
          name: "ID",
          op: "Equal",
          value: parseInt(scenarioId)
        }]
      });

      if (error) throw new Error(error);
      if (data && data.length > 0) {
        console.log(`Successfully retrieved scenario from database: ${data[0].name}`);
        // Format the tags field from comma-separated string to array
        const scenario = data[0];
        if (scenario.tags && typeof scenario.tags === 'string') {
          scenario.tags = scenario.tags.split(',').map((tag) => tag.trim());
        } else {
          scenario.tags = [];
        }
        return {
          success: true,
          data: scenario
        };
      }
    } catch (dbError) {
      console.warn(`Database error: ${dbError.message}. Falling back to mock data.`);
      // Continue to fallback
    }

    // Fallback to mock data if database fetch fails or returns no results
    console.log(`Falling back to mock scenario data for ID: ${scenarioId}`);
    if (typeof getScenarios === 'function') {
      const mockResponse = await getScenarios();
      if (mockResponse.success) {
        const mockScenario = mockResponse.data.find((s) => s.id === parseInt(scenarioId));
        if (mockScenario) {
          console.log(`Found mock scenario: ${mockScenario.name}`);
          return {
            success: true,
            data: mockScenario
          };
        }
      }
    }

    throw new Error(`Scenario with ID ${scenarioId} not found`);

  } catch (err) {
    console.error('Error retrieving scenario:', err);
    return {
      success: false,
      error: err.message || 'Failed to retrieve scenario'
    };
  }
}

// Function to save a message to the conversation history
async function saveMessageToHistory(scenarioId, userId, sessionId, messageText, sender) {
  try {
    const CONVERSATION_HISTORY_TABLE_ID = 894; // The conversation history table ID

    const { error } = await window.ezsite.apis.tableCreate(CONVERSATION_HISTORY_TABLE_ID, {
      scenario_id: scenarioId,
      user_id: userId,
      message_text: messageText,
      sender: sender, // 'user' or 'ai'
      timestamp: new Date().toISOString(),
      session_id: sessionId
    });

    if (error) throw new Error(error);

    return {
      success: true
    };
  } catch (err) {
    console.error('Error saving message to history:', err);
    return {
      success: false,
      error: err.message || 'Failed to save message'
    };
  }
}

// Function to get conversation history for a session
async function getConversationHistory(sessionId) {
  try {
    const CONVERSATION_HISTORY_TABLE_ID = 894; // The conversation history table ID

    const { data, error } = await window.ezsite.apis.tableList(CONVERSATION_HISTORY_TABLE_ID, {
      Filters: [
      {
        name: "session_id",
        op: "Equal",
        value: sessionId
      }]

    });

    if (error) throw new Error(error);

    // Format the data for compatibility with the existing code
    const formattedHistory = data.map((msg) => ({
      text: msg.message_text,
      sender: msg.sender,
      timestamp: msg.timestamp
    }));

    // Sort by timestamp
    formattedHistory.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return {
      success: true,
      data: formattedHistory
    };
  } catch (err) {
    console.error('Error retrieving conversation history:', err);
    return {
      success: false,
      error: err.message || 'Failed to retrieve conversation history'
    };
  }
}

// Make getScenarioById available globally for components to use
if (typeof window !== 'undefined') {
  window.getScenarioById = getScenarioById;
  console.log('Registered global getScenarioById function');
}

// Function to get API usage logs for monitoring (admin use)
function getApiUsageLogs() {
  try {
    const logs = window.grokApiLogs || [];
    return {
      success: true,
      data: logs,
      metrics: {
        totalCalls: logs.length,
        successRate: logs.length > 0 ?
        (logs.filter((log) => log.success).length / logs.length * 100).toFixed(1) + '%' :
        'N/A',
        errorBreakdown: logs.reduce((acc, log) => {
          if (!log.success && log.errorCode) {
            acc[log.errorCode] = (acc[log.errorCode] || 0) + 1;
          }
          return acc;
        }, {})
      }
    };
  } catch (error) {
    console.error('Error retrieving API logs:', error);
    return {
      success: false,
      error: 'Failed to retrieve API usage logs'
    };
  }
}