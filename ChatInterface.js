// ZAP Labs Chat Interface Component

function ChatInterface({ scenarioId, onComplete }) {
  const { useState, useEffect, useRef } = React;

  // Get notification system
  const notifications = typeof useNotifications === 'function' ? useNotifications() : null;

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWelcomeShown, setIsWelcomeShown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [scenario, setScenario] = useState(null);
  const [error, setError] = useState(null);
  const [isUsingGrokDirect, setIsUsingGrokDirect] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Set up Grok API status indicator
  useEffect(() => {
    try {
      // Always set Grok as active - we're using the backend service now
      setIsUsingGrokDirect(true);
      console.log('Using Grok API through secure backend');

      // Clean up any legacy localStorage items if they exist
      if (localStorage.getItem('grok_api_key_backup')) {
        localStorage.removeItem('grok_api_key_backup');
        console.log('Removed legacy API key from localStorage');
      }

      if (localStorage.getItem('grok_chat_link_backup')) {
        localStorage.removeItem('grok_chat_link_backup');
      }
    } catch (err) {
      console.warn('Error setting up Grok indicator:', err);
      // Even if there's an error with localStorage, assume we're using Grok
      setIsUsingGrokDirect(true);
    }
  }, []);

  // Load scenario details
  useEffect(() => {
    const fetchScenario = async () => {
      try {
        console.log(`ChatInterface: Fetching scenario with ID ${scenarioId}`);

        // First, try to use the enhanced getScenarioById from grokApiService
        if (typeof window.getScenarioById === 'function') {
          console.log('Using enhanced getScenarioById');
          const { success, data, error } = await window.getScenarioById(scenarioId);

          if (!success) {
            console.warn(`Enhanced getScenarioById failed: ${error}`);
            throw new Error(error);
          }

          console.log('Scenario data retrieved successfully:', data.name);
          setScenario(data);
          return;
        }

        // Fallback to the original getScenarioById from api.js
        console.log('Falling back to original getScenarioById');
        const { success, data, error } = await getScenarioById(scenarioId);

        if (!success) {
          // Handle the error with appropriate context
          if (notifications) {
            notifications.handleApiError(error, {
              duration: 8000
            });
          }
          throw new Error(error);
        }

        console.log('Scenario data retrieved successfully (fallback):', data.name);
        setScenario(data);
      } catch (err) {
        console.error('Error loading scenario:', err);

        // Set the error in state, which will trigger the error UI
        if (typeof err === 'object' && err.message) {
          setError(err.message);
        } else if (typeof err === 'string') {
          setError(err);
        } else {
          setError('Failed to load scenario details');
        }
      }
    };

    fetchScenario();
  }, [scenarioId, notifications]);

  // Show welcome message
  useEffect(() => {
    if (scenario && !isWelcomeShown) {
      const welcomeMessage = {
        id: generateId(),
        text: `You are now interviewing ${scenario.name}, age ${scenario.age}, regarding a ${scenario.type.toLowerCase()} case. Begin the interview when ready.`,
        sender: 'system',
        timestamp: new Date()
      };

      setMessages([welcomeMessage]);
      setIsWelcomeShown(true);

      // Focus input after welcome message
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 500);
    }
  }, [scenario, isWelcomeShown]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Send message function
  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Check network status first
    if (window.errorHandler && window.errorHandler.isOffline && window.errorHandler.isOffline()) {
      if (notifications) {
        notifications.warning(
          'You are offline. Messages will be queued and sent when you reconnect.',
          { duration: 5000 }
        );
      }
      // Could store messages to send later when back online
    }

    const userMessage = {
      id: generateId(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Get current message thread for context
    const currentMessages = [...messages, userMessage];
    const conversationHistory = currentMessages.filter((m) => m.sender !== 'system');

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get AI response with retry mechanism for network issues
      let response;
      if (typeof getEnhancedAIResponse === 'function') {
        // Use enhanced API with retry mechanism
        if (window.errorHandler && window.errorHandler.withRetry) {
          response = await window.errorHandler.withRetry(
            async () => getEnhancedAIResponse(scenarioId, userMessage.text, scenario, conversationHistory),
            {
              maxRetries: 2,
              baseDelay: 1000,
              context: { messageType: 'interview', scenarioId }
            }
          );
        } else {
          response = await getEnhancedAIResponse(scenarioId, userMessage.text, scenario, conversationHistory);
        }
      } else {
        // Fall back to original implementation with error handling
        response = await getAIResponse(scenarioId, userMessage.text);
      }

      const { success, data, error } = response;

      if (!success) {
        // Use our error handler to get a proper error object
        const apiError = window.errorHandler ?
        window.errorHandler.parseApiError(error) :
        new Error(error || 'Failed to get response');

        // Show notification if available
        if (notifications) {
          notifications.handleApiError(apiError, {
            duration: 5000
          });
        }

        throw apiError;
      }

      // Add AI response after a slight delay to make it feel more natural
      setTimeout(() => {
        const aiMessage = {
          id: generateId(),
          text: data.message,
          sender: 'ai',
          timestamp: new Date()
        };

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setIsLoading(false);
      }, 1000);

    } catch (err) {
      console.error('Error getting AI response:', err);

      // Get user-friendly message based on error type
      let errorText = 'Sorry, there was an error processing your message. Please try again.';

      if (window.errorHandler && window.errorHandler.getUserFriendlyMessage) {
        errorText = window.errorHandler.getUserFriendlyMessage(err);
      } else if (err.message) {
        errorText = err.message;
      }

      // Add error message to the chat
      const errorMessage = {
        id: generateId(),
        text: errorText,
        sender: 'system',
        timestamp: new Date()
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setIsLoading(false);
    }
  };

  // Handle input submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  // Speech recognition functionality
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      // Use notification system instead of alert
      if (notifications) {
        notifications.warning(
          'Speech recognition is not supported in your browser. Please use Chrome or Edge.',
          { duration: 8000 }
        );
      } else {
        alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      }
      return;
    }

    if (isListening) {
      // Stop listening
      setIsListening(false);
      return;
    }

    // Start listening
    setIsListening(true);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);

      // Auto-send after short delay
      setTimeout(() => {
        setIsListening(false);
        sendMessage();
      }, 500);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Complete interview
  const handleComplete = () => {
    if (typeof onComplete === 'function') {
      onComplete(messages);
    }
  };

  if (error) {
    return (
      <div className="text-center p-8" data-id="80a867nsy" data-path="components/ChatInterface.js">
        <ErrorMessage
          error={error}
          retry={() => window.location.reload()} data-id="aec4et8cp" data-path="components/ChatInterface.js" />

      </div>);


  }

  if (!scenario) {
    return (
      <div className="flex justify-center items-center p-8" data-id="um8y3ru7w" data-path="components/ChatInterface.js">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mediumBlue" data-id="3fdi8e3fk" data-path="components/ChatInterface.js"></div>
      </div>);

  }

  return (
    <div className="flex flex-col h-full" data-id="phwem1188" data-path="components/ChatInterface.js">
      {/* Chat Header */}
      <div className="bg-darkBlue text-white p-4 rounded-t-lg" data-id="js3xqiur8" data-path="components/ChatInterface.js">
        <div className="flex justify-between items-center" data-id="5gbzlyha5" data-path="components/ChatInterface.js">
          <div className="flex items-center" data-id="oxgya2r52" data-path="components/ChatInterface.js">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3" data-id="0hpheezn6" data-path="components/ChatInterface.js">
              <span className="text-darkBlue font-bold" data-id="73fe9kvzo" data-path="components/ChatInterface.js">{scenario.name.charAt(0)}</span>
            </div>
            <div data-id="lheemt898" data-path="components/ChatInterface.js">
              <h3 className="font-semibold" data-id="edfq40z5k" data-path="components/ChatInterface.js">{scenario.name}, {scenario.age}</h3>
              <p className="text-xs text-gray-300" data-id="zkxmdp9es" data-path="components/ChatInterface.js">{scenario.type} Case</p>
              {isUsingGrokDirect &&
              <div className="flex items-center mt-1 bg-green-800 bg-opacity-30 px-2 py-0.5 rounded-full text-xs" data-id="8a81x8ojj" data-path="components/ChatInterface.js">
                  <i className="fas fa-bolt text-zapYellow mr-1" data-id="pnlixasep" data-path="components/ChatInterface.js"></i>
                  <span className="text-zapYellow font-medium" data-id="618b9gcyb" data-path="components/ChatInterface.js">
                    Powered by Grok API
                  </span>
                </div>
              }
            </div>
          </div>
          <div data-id="9bx8ec4yq" data-path="components/ChatInterface.js">
            <button
              onClick={handleComplete}
              className="bg-zapYellow text-darkBlue hover:bg-opacity-90 px-3 py-1 rounded text-sm font-medium" data-id="22rcf0d8l" data-path="components/ChatInterface.js">

              End & Evaluate
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-grow bg-gray-50 p-4 overflow-y-auto" data-id="57mncfhn3" data-path="components/ChatInterface.js">
        <div className="space-y-4" data-id="u7226htw5" data-path="components/ChatInterface.js">
          {messages.map((message) =>
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`} data-id="g1evblrdf" data-path="components/ChatInterface.js">
              <div
              className={`chat-message ${
              message.sender === 'user' ?
              'user' :
              message.sender === 'ai' ?
              'ai' :
              'bg-yellow-100 text-yellow-800'} max-w-[80%]`
              } data-id="7r9dpv427" data-path="components/ChatInterface.js">

                {message.text}
                <div className="text-xs opacity-70 mt-1 text-right" data-id="iwyfbqg83" data-path="components/ChatInterface.js">
                  {message.sender === 'system' ? 'System' : message.sender === 'user' ? 'You' : scenario.name}
                </div>
              </div>
            </div>
          )}
          
          {isLoading &&
          <div className="flex justify-start" data-id="8wtduvub7" data-path="components/ChatInterface.js">
              <div className="bg-gray-200 rounded-lg p-3 inline-flex items-center space-x-2" data-id="v0oek4da9" data-path="components/ChatInterface.js">
                <div className="animate-bounce h-2 w-2 bg-gray-600 rounded-full" data-id="ayu72zt0y" data-path="components/ChatInterface.js"></div>
                <div className="animate-bounce h-2 w-2 bg-gray-600 rounded-full" style={{ animationDelay: '0.2s' }} data-id="dbhcmupcm" data-path="components/ChatInterface.js"></div>
                <div className="animate-bounce h-2 w-2 bg-gray-600 rounded-full" style={{ animationDelay: '0.4s' }} data-id="0borp4ntl" data-path="components/ChatInterface.js"></div>
              </div>
            </div>
          }
          
          <div ref={messagesEndRef} data-id="t92dems32" data-path="components/ChatInterface.js"></div>
        </div>
      </div>
      
      {/* Input Area */}
      <div className="bg-white p-3 border-t border-gray-200 rounded-b-lg" data-id="fhfnkcuiw" data-path="components/ChatInterface.js">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2" data-id="lln4bz22o" data-path="components/ChatInterface.js">
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2 rounded-full ${
            isListening ?
            'bg-red-500 text-white animate-pulse' :
            'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
            }
            title={isListening ? 'Stop recording' : 'Start voice input'} data-id="6k0dcoxgb" data-path="components/ChatInterface.js">

            <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'}`} data-id="m9qo5qyru" data-path="components/ChatInterface.js"></i>
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="form-control flex-grow py-2 px-4 rounded-full border border-gray-300"
            placeholder={isListening ? 'Listening...' : 'Type your message...'}
            disabled={isLoading || isListening} data-id="k8tusso9d" data-path="components/ChatInterface.js" />

          
          <button
            type="submit"
            className="p-2 bg-mediumBlue text-white rounded-full hover:bg-darkBlue disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!inputMessage.trim() || isLoading} data-id="292mia8di" data-path="components/ChatInterface.js">

            <i className="fas fa-paper-plane" data-id="pa824uh09" data-path="components/ChatInterface.js"></i>
          </button>
        </form>
        
        <div className="flex justify-between items-center mt-2 text-xs text-gray-500 px-2" data-id="5zjrdq4fm" data-path="components/ChatInterface.js">
          <div data-id="iwck3y35o" data-path="components/ChatInterface.js">
            <span className="font-medium" data-id="2ng2nye9f" data-path="components/ChatInterface.js">Tip:</span> Ask open-ended questions
          </div>
          <div data-id="r3dl7alyd" data-path="components/ChatInterface.js">
            {messages.filter((m) => m.sender === 'user').length} questions asked
          </div>
        </div>
      </div>
    </div>);

}