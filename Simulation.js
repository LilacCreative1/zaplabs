// ZAP Labs Simulation Page

function Simulation() {
  const { useState, useEffect } = React;
  const { useParams, useNavigate } = ReactRouterDOM;

  const { id } = useParams();
  const navigate = useNavigate();

  const [scenario, setScenario] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = 'Interview Simulation - ZAP Labs';
  }, []);

  // Fetch scenario data
  useEffect(() => {
    const fetchScenario = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        const { success, data, error } = await getScenarioById(id);

        if (!success) throw new Error(error || 'Failed to fetch scenario details');

        setScenario(data);
      } catch (err) {
        console.error('Error loading scenario:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScenario();
  }, [id]);

  // Handle interview completion
  const handleInterviewComplete = (messages) => {
    setInterviewData(messages);
    setShowEvaluation(true);
  };

  // Handle evaluation completion
  const handleEvaluationComplete = () => {
    navigate('/scenarios');
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="ry00cals6" data-path="pages/Simulation.js">
        <div className="container mx-auto px-4 flex justify-center items-center py-12" data-id="axv91wih8" data-path="pages/Simulation.js">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mediumBlue" data-id="p5jlpdwzl" data-path="pages/Simulation.js"></div>
        </div>
      </div>);

  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="els72kuv4" data-path="pages/Simulation.js">
        <div className="container mx-auto px-4" data-id="ns94i9378" data-path="pages/Simulation.js">
          <div className="max-w-2xl mx-auto" data-id="32f2682aj" data-path="pages/Simulation.js">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert" data-id="e2pampzov" data-path="pages/Simulation.js">
              <strong className="font-bold" data-id="nghxlf0ax" data-path="pages/Simulation.js">Error: </strong>
              <span className="block sm:inline" data-id="vemu3q1bf" data-path="pages/Simulation.js">{error}</span>
            </div>
            <button
              onClick={() => navigate('/scenarios')}
              className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="7uhsla166" data-path="pages/Simulation.js">

              Back to Scenarios
            </button>
          </div>
        </div>
      </div>);

  }

  if (!scenario) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="cpq17fxbz" data-path="pages/Simulation.js">
        <div className="container mx-auto px-4 text-center" data-id="u8lk6jl1n" data-path="pages/Simulation.js">
          <h2 className="text-2xl font-bold text-gray-700 mb-4" data-id="8lyv0zggm" data-path="pages/Simulation.js">Scenario Not Found</h2>
          <p className="text-gray-600 mb-6" data-id="ykyqtq7qk" data-path="pages/Simulation.js">The scenario you're looking for doesn't exist or is no longer available.</p>
          <button
            onClick={() => navigate('/scenarios')}
            className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="29spxom8z" data-path="pages/Simulation.js">

            Back to Scenarios
          </button>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="lctip0x3e" data-path="pages/Simulation.js">
      <div className="container mx-auto px-4" data-id="sa74e1sjo" data-path="pages/Simulation.js">
        {!showEvaluation ?
        <div className="max-w-5xl mx-auto" data-id="mx9a3n4s1" data-path="pages/Simulation.js">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8" data-id="45w5lhb3q" data-path="pages/Simulation.js">
              <div className="bg-darkBlue text-white p-6" data-id="uy5r9xyno" data-path="pages/Simulation.js">
                <div className="flex items-center justify-between" data-id="abtrtf0ax" data-path="pages/Simulation.js">
                  <h1 className="text-2xl font-bold font-ibm" data-id="0xn0abjgw" data-path="pages/Simulation.js">{scenario.name}, {scenario.age}</h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyClass(scenario.difficulty)}`} data-id="4d7rgwrpw" data-path="pages/Simulation.js">
                    {scenario.difficulty}
                  </span>
                </div>
                <p className="text-gray-300" data-id="mq9l865wf" data-path="pages/Simulation.js">{scenario.type} Case</p>
              </div>
              
              <div className="p-6 border-b border-gray-200" data-id="k5b31imid" data-path="pages/Simulation.js">
                <div className="mb-6" data-id="shae2l88j" data-path="pages/Simulation.js">
                  <h2 className="text-lg font-semibold text-darkBlue mb-2" data-id="auyja78ci" data-path="pages/Simulation.js">Case Description</h2>
                  <p className="text-gray-700" data-id="mw44glcak" data-path="pages/Simulation.js">{scenario.description}</p>
                </div>
                
                <div className="mb-6" data-id="a9snq54kv" data-path="pages/Simulation.js">
                  <h2 className="text-lg font-semibold text-darkBlue mb-2" data-id="0kbx69z67" data-path="pages/Simulation.js">Interview Objectives</h2>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1" data-id="bq6b4nlng" data-path="pages/Simulation.js">
                    {scenario.objectives.map((objective, index) =>
                  <li key={index} data-id="yjv4bhnul" data-path="pages/Simulation.js">{objective}</li>
                  )}
                  </ul>
                </div>
                
                <div data-id="ay9k3cbmj" data-path="pages/Simulation.js">
                  <h2 className="text-lg font-semibold text-darkBlue mb-2" data-id="uxzufr3cj" data-path="pages/Simulation.js">Subject Profile</h2>
                  <div className="flex flex-wrap gap-2 mb-2" data-id="kv2wohz9f" data-path="pages/Simulation.js">
                    {scenario.tags.map((tag, index) =>
                  <span key={index} className="scenario-tag" data-id="ds1qpxvkr" data-path="pages/Simulation.js">
                        {tag}
                      </span>
                  )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50" data-id="3eha7uumz" data-path="pages/Simulation.js">
                <h2 className="text-lg font-semibold text-darkBlue mb-4" data-id="srh9bxd2q" data-path="pages/Simulation.js">Interview Simulation</h2>
                <p className="text-gray-600 mb-4" data-id="ngqauthbq" data-path="pages/Simulation.js">
                  Begin your interview with the subject. You can communicate using text or voice input. 
                  The AI will respond based on the subject's profile. When you're ready to end the interview, 
                  click the "End & Evaluate" button to receive feedback on your performance.
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4" data-id="pwxqmlr33" data-path="pages/Simulation.js">
                  <div className="flex items-center" data-id="t04t8q4gj" data-path="pages/Simulation.js">
                    <div className="flex-shrink-0 text-green-500" data-id="62vvto9op" data-path="pages/Simulation.js">
                      <i className="fas fa-bolt mr-2" data-id="wl02m1rmq" data-path="pages/Simulation.js"></i>
                    </div>
                    <div data-id="itopg7zi9" data-path="pages/Simulation.js">
                      <p className="text-sm text-green-700" data-id="3huzvc56e" data-path="pages/Simulation.js">
                        <span className="font-medium" data-id="6zcmxwm4j" data-path="pages/Simulation.js">Powered by Grok 3:</span> All simulations now use Grok 3 for more realistic and responsive AI interactions. Administrators can configure the Grok integration in Settings.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm h-[600px]" data-id="nj8azbucf" data-path="pages/Simulation.js">
                  <ChatInterface
                  scenarioId={scenario.id}
                  onComplete={handleInterviewComplete} data-id="1h2v73rxm" data-path="pages/Simulation.js" />

                </div>
              </div>
            </div>
          </div> :

        <div className="max-w-5xl mx-auto" data-id="x2hs8es0q" data-path="pages/Simulation.js">
            <EvaluationForm
            scenarioId={scenario.id}
            interviewData={interviewData}
            onComplete={handleEvaluationComplete} data-id="14vlxnjoy" data-path="pages/Simulation.js" />

          </div>
        }
      </div>
    </div>);

}