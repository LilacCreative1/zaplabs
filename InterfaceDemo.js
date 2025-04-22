// ZAP Labs Interface Demo Component

function InterfaceDemo() {
  const { useState, useEffect, useRef } = React;

  const demoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [typing, setTyping] = useState(false);

  // Sample conversation for demo
  const conversation = [
  { id: 1, sender: "officer", text: "Can you tell me where you were last night around 10 PM?" },
  { id: 2, sender: "suspect", text: "I was at home watching TV. Why are you asking me about this?" },
  { id: 3, sender: "officer", text: "We're investigating an incident that happened in your neighborhood. Did you hear anything unusual?" },
  { id: 4, sender: "suspect", text: "No, I didn't hear anything. I had my TV volume up pretty high." },
  { id: 5, sender: "officer", text: "Do you know anyone who might have been in the area at that time?" },
  { id: 6, sender: "suspect", text: "Not really. Most of my neighbors are pretty quiet. What exactly happened?" },
  { id: 7, sender: "officer", text: "We're investigating a reported disturbance. Can you tell me what shows you were watching?" }];


  // Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (demoRef.current) {
      observer.observe(demoRef.current);
    }

    return () => {
      if (demoRef.current) {
        observer.unobserve(demoRef.current);
      }
    };
  }, []);

  // Auto-play message animation effect
  useEffect(() => {
    if (!isVisible) return;

    if (currentMessageIndex < conversation.length) {
      setTyping(true);
      const timer = setTimeout(() => {
        setDisplayedMessages((prev) => [...prev, conversation[currentMessageIndex]]);
        setTyping(false);
        setCurrentMessageIndex((prev) => prev + 1);
      }, 1500);

      return () => clearTimeout(timer);
    }

    // Reset the demo after completion with a delay
    if (currentMessageIndex === conversation.length) {
      const resetTimer = setTimeout(() => {
        setDisplayedMessages([]);
        setCurrentMessageIndex(0);
      }, 5000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentMessageIndex, isVisible]);

  return (
    <section className="py-16 bg-gray-50" ref={demoRef} data-id="e364p764t" data-path="components/InterfaceDemo.js">
      <div className="container mx-auto px-4" data-id="jpi7q6n9f" data-path="components/InterfaceDemo.js">
        <div className="text-center mb-12" data-id="mi2c5fy9o" data-path="components/InterfaceDemo.js">
          <h2 className="text-3xl md:text-4xl font-bold font-ibm text-darkBlue mb-4" data-id="chj9e0pxh" data-path="components/InterfaceDemo.js">
            Experience the Interview Simulator
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto" data-id="vyoxmdj9f" data-path="components/InterfaceDemo.js">
            Our AI-powered platform simulates realistic suspect interactions, allowing you to practice interview techniques in a controlled environment.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto" data-id="1uzag6v94" data-path="components/InterfaceDemo.js">
          <div className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} data-id="dtyc6kvtn" data-path="components/InterfaceDemo.js">
            {/* Interface Header */}
            <div className="bg-darkBlue text-white p-4 flex items-center justify-between" data-id="f5m5qtz6l" data-path="components/InterfaceDemo.js">
              <div className="flex items-center" data-id="ay4tkitem" data-path="components/InterfaceDemo.js">
                <div className="w-10 h-10 bg-gray-400 rounded-full mr-3 overflow-hidden" data-id="cm1ckupgp" data-path="components/InterfaceDemo.js">
                  <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="Suspect avatar"
                  className="w-full h-full object-cover" data-id="rauhmf0vo" data-path="components/InterfaceDemo.js" />
                </div>
                <div data-id="9yvyyx0ab" data-path="components/InterfaceDemo.js">
                  <h3 className="font-semibold" data-id="b25xrm77v" data-path="components/InterfaceDemo.js">Fictional Suspect #429</h3>
                  <div className="flex items-center text-xs" data-id="822qg7z9e" data-path="components/InterfaceDemo.js">
                    <span className="bg-green-500 rounded-full w-2 h-2 mr-2" data-id="k5o6q9f3" data-path="components/InterfaceDemo.js"></span>
                    <span data-id="ppovpjnbu" data-path="components/InterfaceDemo.js">Active Simulation</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center" data-id="9gtka83pe" data-path="components/InterfaceDemo.js">
                <span className="text-sm bg-lightBlue bg-opacity-20 text-lightBlue py-1 px-3 rounded-full mr-3" data-id="kw2xex4ny" data-path="components/InterfaceDemo.js">
                  Training Mode
                </span>
                <button className="text-white bg-mediumBlue hover:bg-lightBlue rounded p-2 transition-colors" data-id="x8pzq92lx" data-path="components/InterfaceDemo.js">
                  <i className="fas fa-cog" data-id="6umhjz0gd" data-path="components/InterfaceDemo.js"></i>
                </button>
              </div>
            </div>
            
            {/* Messages Area */}
            <div className="h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col space-y-4" data-id="y0f3sy3a2" data-path="components/InterfaceDemo.js">
              {displayedMessages.map((message) =>
              <div
                key={message.id}
                className={`flex ${message.sender === "officer" ? "justify-end" : "justify-start"}`} data-id="kevu2awd3" data-path="components/InterfaceDemo.js">

                  <div
                  className={`max-w-xs md:max-w-md px-4 py-3 rounded-lg ${
                  message.sender === "officer" ?
                  "bg-mediumBlue text-white rounded-tr-none" :
                  "bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm"}`
                  } data-id="98erpwlwm" data-path="components/InterfaceDemo.js">

                    {message.text}
                  </div>
                </div>
              )}
              
              {typing &&
              <div className="flex justify-start" data-id="flzv8hc6z" data-path="components/InterfaceDemo.js">
                  <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg rounded-tl-none text-gray-700 animate-pulse" data-id="0ixu78en8" data-path="components/InterfaceDemo.js">
                    <div className="flex space-x-1" data-id="pq6qbf8zx" data-path="components/InterfaceDemo.js">
                      <div className="w-2 h-2 bg-gray-400 rounded-full" data-id="c5hfns916" data-path="components/InterfaceDemo.js"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full" data-id="q30v2gfo7" data-path="components/InterfaceDemo.js"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full" data-id="q553k7jn7" data-path="components/InterfaceDemo.js"></div>
                    </div>
                  </div>
                </div>
              }
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200" data-id="n18j1olnc" data-path="components/InterfaceDemo.js">
              <div className="flex space-x-2" data-id="9u6iladee" data-path="components/InterfaceDemo.js">
                <input
                  type="text"
                  placeholder="Type your question here..."
                  className="flex-1 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent" data-id="lu5rnfc6i" data-path="components/InterfaceDemo.js" />

                <button className="bg-mediumBlue hover:bg-darkBlue text-white rounded-md px-4 transition-colors" data-id="b7bz2qmdr" data-path="components/InterfaceDemo.js">
                  <i className="fas fa-paper-plane" data-id="jqj49tid4" data-path="components/InterfaceDemo.js"></i>
                </button>
              </div>
              
              <div className="mt-3 flex justify-between text-xs text-gray-500" data-id="g1l67rvlg" data-path="components/InterfaceDemo.js">
                <span data-id="8ctuhfsr0" data-path="components/InterfaceDemo.js">This is a simulation for training purposes only</span>
                <div className="flex items-center" data-id="mvdvr0it0" data-path="components/InterfaceDemo.js">
                  <span className="mr-3" data-id="md8kn7mbp" data-path="components/InterfaceDemo.js">AI Response Quality: </span>
                  <div className="flex" data-id="dz1psk2lr" data-path="components/InterfaceDemo.js">
                    <span className="text-green-500" data-id="6vrj4hjll" data-path="components/InterfaceDemo.js">●●●</span>
                    <span className="text-gray-300" data-id="jwh92krrs" data-path="components/InterfaceDemo.js">●●</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6" data-id="zhjl2n0jy" data-path="components/InterfaceDemo.js">
            <div className={`bg-white p-5 rounded-lg shadow transition-all duration-500 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} data-id="c4qdtd9jm" data-path="components/InterfaceDemo.js">
              <div className="w-12 h-12 bg-lightBlue bg-opacity-10 rounded-full flex items-center justify-center text-lightBlue mb-4" data-id="tigjq2hfj" data-path="components/InterfaceDemo.js">
                <i className="fas fa-bolt text-xl" data-id="zfocl83cn" data-path="components/InterfaceDemo.js"></i>
              </div>
              <h3 className="font-bold text-darkBlue mb-2" data-id="k7nbr3yll" data-path="components/InterfaceDemo.js">Real-time Responses</h3>
              <p className="text-gray-600 text-sm" data-id="6pg074yhe" data-path="components/InterfaceDemo.js">AI generates contextually appropriate responses based on case details and previous conversation.</p>
            </div>
            
            <div className={`bg-white p-5 rounded-lg shadow transition-all duration-500 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} data-id="5t77p92pr" data-path="components/InterfaceDemo.js">
              <div className="w-12 h-12 bg-lightBlue bg-opacity-10 rounded-full flex items-center justify-center text-lightBlue mb-4" data-id="g891iatj3" data-path="components/InterfaceDemo.js">
                <i className="fas fa-shield-alt text-xl" data-id="wmg79wqqx" data-path="components/InterfaceDemo.js"></i>
              </div>
              <h3 className="font-bold text-darkBlue mb-2" data-id="br0vavcg" data-path="components/InterfaceDemo.js">Safe Learning Environment</h3>
              <p className="text-gray-600 text-sm" data-id="83zmpxu0u" data-path="components/InterfaceDemo.js">Practice various approaches without real-world consequences, allowing for skill development in a controlled setting.</p>
            </div>
            
            <div className={`bg-white p-5 rounded-lg shadow transition-all duration-500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} data-id="u0gbvnf0b" data-path="components/InterfaceDemo.js">
              <div className="w-12 h-12 bg-lightBlue bg-opacity-10 rounded-full flex items-center justify-center text-lightBlue mb-4" data-id="4k00vu3c2" data-path="components/InterfaceDemo.js">
                <i className="fas fa-chart-line text-xl" data-id="qvt7qh81s" data-path="components/InterfaceDemo.js"></i>
              </div>
              <h3 className="font-bold text-darkBlue mb-2" data-id="kjwz6029c" data-path="components/InterfaceDemo.js">Performance Tracking</h3>
              <p className="text-gray-600 text-sm" data-id="1lr1uhlqf" data-path="components/InterfaceDemo.js">Monitor your progress over time with detailed metrics on question quality, rapport building, and information gathering.</p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}