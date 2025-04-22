// ZAP Labs Progress Page

function Progress() {
  const { useState, useEffect } = React;
  const { Link } = ReactRouterDOM;

  const [user, setUser] = useState(null);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set page title
  useEffect(() => {
    document.title = 'My Progress - ZAP Labs';
  }, []);

  // Load user data and completed scenarios
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const currentUser = getCurrentUser();
        if (!currentUser) {
          throw new Error('User data not available');
        }

        setUser(currentUser);

        // Fetch scenario details for completed scenarios
        const { success, data, error } = await getScenarios();

        if (!success) throw new Error(error || 'Failed to fetch scenarios');

        // Filter to only include completed scenarios
        const completed = data.filter((scenario) =>
        currentUser.completedScenarios.includes(scenario.id)
        );

        setCompletedScenarios(completed);
      } catch (err) {
        console.error('Error loading progress data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Generate mock evaluation history
  const generateMockHistory = () => {
    const today = new Date();
    const history = [];

    // Create 5 mock entries spanning the last 30 days
    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i * 6); // Every 6 days back

      history.push({
        id: i + 1,
        date: date.toISOString(),
        scenarioId: Math.floor(Math.random() * 5) + 1,
        scenarioName: ['Alex Weber', 'Morgan Riley', 'Jamie Bennett', 'Taylor Quinn', 'Jordan Casey'][Math.floor(Math.random() * 5)],
        score: Math.floor(Math.random() * 30) + 70 // Random score between 70-99
      });
    }

    return history.sort((a, b) => new Date(b.date) - new Date(a.date)); // Most recent first
  };

  const evaluationHistory = generateMockHistory();

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="nmclcm2ua" data-path="pages/Progress.js">
        <div className="container mx-auto px-4 flex justify-center items-center py-12" data-id="5bsmk9ktr" data-path="pages/Progress.js">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mediumBlue" data-id="lp9678upa" data-path="pages/Progress.js"></div>
        </div>
      </div>);

  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="vcuaja6fy" data-path="pages/Progress.js">
        <div className="container mx-auto px-4" data-id="n4vtmid9j" data-path="pages/Progress.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-6 font-ibm" data-id="tdy9rs34y" data-path="pages/Progress.js">My Progress</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert" data-id="hpjzjfuuk" data-path="pages/Progress.js">
            <strong className="font-bold" data-id="l8oce72te" data-path="pages/Progress.js">Error: </strong>
            <span className="block sm:inline" data-id="miclkivmi" data-path="pages/Progress.js">{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="d1j2t4wql" data-path="pages/Progress.js">

            Try Again
          </button>
        </div>
      </div>);

  }

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="yemlxzhcg" data-path="pages/Progress.js">
        <div className="container mx-auto px-4 text-center" data-id="5g7vqakcd" data-path="pages/Progress.js">
          <h2 className="text-2xl font-bold text-gray-700 mb-4" data-id="62q846x4e" data-path="pages/Progress.js">User Data Not Available</h2>
          <p className="text-gray-600 mb-6" data-id="zmuiyoctb" data-path="pages/Progress.js">Please log in again to view your progress.</p>
          <Link
            to="/login"
            className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="6j8oupcre" data-path="pages/Progress.js">

            Go to Login
          </Link>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="apk2wl3vm" data-path="pages/Progress.js">
      <div className="container mx-auto px-4" data-id="gnngcd0xy" data-path="pages/Progress.js">
        <div className="max-w-6xl mx-auto" data-id="qesq3xzgs" data-path="pages/Progress.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-6 font-ibm" data-id="l31vzwtlz" data-path="pages/Progress.js">My Progress</h1>
          
          {/* User Stats */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-id="80mpxlw07" data-path="pages/Progress.js">
            <div className="flex flex-col md:flex-row items-center justify-between" data-id="g740a1pxz" data-path="pages/Progress.js">
              <div className="flex items-center mb-4 md:mb-0" data-id="2smvrsnk5" data-path="pages/Progress.js">
                <div className="w-16 h-16 bg-mediumBlue rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4" data-id="uhr7d4d58" data-path="pages/Progress.js">
                  {user.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div data-id="58yy7kj7q" data-path="pages/Progress.js">
                  <h2 className="text-xl font-bold text-darkBlue" data-id="4vsf4pkkq" data-path="pages/Progress.js">{user.name}</h2>
                  <p className="text-gray-600" data-id="ssvj6twn8" data-path="pages/Progress.js">{user.agency}</p>
                  <p className="text-gray-500 text-sm" data-id="c4s601h8p" data-path="pages/Progress.js">Role: {user.role}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-center md:items-end" data-id="thp9s16c0" data-path="pages/Progress.js">
                <div className="text-gray-600 mb-2" data-id="8bacfa0v6" data-path="pages/Progress.js">Overall Progress</div>
                <div className="flex items-center" data-id="kdvzn38dm" data-path="pages/Progress.js">
                  <div className="progress-bar w-48 mr-3" data-id="zeslgrjv9" data-path="pages/Progress.js">
                    <div className="progress-bar-fill bg-lightBlue" style={{ width: `${user.progress}%` }} data-id="t3hh2h0og" data-path="pages/Progress.js"></div>
                  </div>
                  <span className="font-bold text-darkBlue" data-id="wmdvli68i" data-path="pages/Progress.js">{user.progress}%</span>
                </div>
                <div className="text-sm text-gray-500 mt-1" data-id="q2ipz2m94" data-path="pages/Progress.js">
                  {user.completedScenarios.length} of 10 scenarios completed
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8" data-id="cikotnmcb" data-path="pages/Progress.js">
            {/* Skill Performance Chart */}
            <div className="md:col-span-2" data-id="v2dlm0yua" data-path="pages/Progress.js">
              <ProgressChart data-id="cpn0iomf8" data-path="pages/Progress.js" />
            </div>
            
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden" data-id="mkjwd0234" data-path="pages/Progress.js">
              <div className="bg-darkBlue text-white p-4" data-id="1yj6hqn1e" data-path="pages/Progress.js">
                <h3 className="text-lg font-bold" data-id="5kg2pg7u1" data-path="pages/Progress.js">Recent Evaluations</h3>
              </div>
              
              <div className="p-4" data-id="u80we74ik" data-path="pages/Progress.js">
                {evaluationHistory.length > 0 ?
                <ul className="divide-y divide-gray-200" data-id="zpgpeq8yw" data-path="pages/Progress.js">
                    {evaluationHistory.map((item) =>
                  <li key={item.id} className="py-3" data-id="b4v3tz4jt" data-path="pages/Progress.js">
                        <div className="flex justify-between items-center" data-id="pnlnghq0j" data-path="pages/Progress.js">
                          <div data-id="bgbz1scsm" data-path="pages/Progress.js">
                            <p className="font-medium text-darkBlue" data-id="wdtipob3c" data-path="pages/Progress.js">{item.scenarioName}</p>
                            <p className="text-sm text-gray-500" data-id="tfhxs1a78" data-path="pages/Progress.js">{formatDate(item.date)}</p>
                          </div>
                          <div className={`text-lg font-bold ${
                      item.score >= 90 ? 'text-green-500' :
                      item.score >= 80 ? 'text-blue-500' :
                      item.score >= 70 ? 'text-yellow-500' :
                      'text-red-500'}`
                      } data-id="07snmz7a7" data-path="pages/Progress.js">
                            {item.score}
                          </div>
                        </div>
                      </li>
                  )}
                  </ul> :

                <div className="text-center py-4" data-id="m9o5ab1bl" data-path="pages/Progress.js">
                    <p className="text-gray-500" data-id="oy31sizh2" data-path="pages/Progress.js">No recent evaluations</p>
                  </div>
                }
              </div>
            </div>
          </div>
          
          {/* Completed Scenarios */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8" data-id="e91hzhgpo" data-path="pages/Progress.js">
            <div className="bg-mediumBlue text-white p-4" data-id="y6unsum0w" data-path="pages/Progress.js">
              <h3 className="text-lg font-bold" data-id="06gnkbvnz" data-path="pages/Progress.js">Completed Scenarios</h3>
            </div>
            
            <div className="p-4" data-id="9j7zfoubu" data-path="pages/Progress.js">
              {completedScenarios.length > 0 ?
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="6o09b79n3" data-path="pages/Progress.js">
                  {completedScenarios.map((scenario) =>
                <div key={scenario.id} className="flex items-center border border-gray-200 rounded-lg p-3" data-id="a7uq4oka2" data-path="pages/Progress.js">
                      <div className="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0" data-id="j7rrkh2z0" data-path="pages/Progress.js">
                        <img
                      src={scenario.thumbnail}
                      alt={scenario.name}
                      className="w-full h-full object-cover" data-id="h2iosz7gq" data-path="pages/Progress.js" />

                      </div>
                      <div className="flex-grow" data-id="rwjdeldnb" data-path="pages/Progress.js">
                        <h4 className="font-medium text-darkBlue" data-id="sy530m6tf" data-path="pages/Progress.js">{scenario.name}</h4>
                        <p className="text-sm text-gray-500" data-id="iscaxt0kz" data-path="pages/Progress.js">{scenario.type}</p>
                      </div>
                      <Link
                    to={`/scenarios/${scenario.id}`}
                    className="text-mediumBlue hover:text-darkBlue"
                    title="Retry scenario" data-id="g008erbvu" data-path="pages/Progress.js">

                        <i className="fas fa-redo" data-id="4qfxwp4ms" data-path="pages/Progress.js"></i>
                      </Link>
                    </div>
                )}
                </div> :

              <div className="text-center py-6" data-id="6cfc70kpa" data-path="pages/Progress.js">
                  <p className="text-gray-600 mb-4" data-id="0730d5787" data-path="pages/Progress.js">You haven't completed any scenarios yet.</p>
                  <Link
                  to="/scenarios"
                  className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="p0y39gnmq" data-path="pages/Progress.js">

                    Start Practicing
                  </Link>
                </div>
              }
            </div>
          </div>
          
          {/* Suggested Next Scenarios */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden" data-id="1zjsc2bkw" data-path="pages/Progress.js">
            <div className="bg-lightBlue text-white p-4" data-id="nc4yh1qfq" data-path="pages/Progress.js">
              <h3 className="text-lg font-bold" data-id="bqxllvl0x" data-path="pages/Progress.js">Recommended Next Steps</h3>
            </div>
            
            <div className="p-4" data-id="j325s83wy" data-path="pages/Progress.js">
              <p className="text-gray-700 mb-4" data-id="l6lbcrio4" data-path="pages/Progress.js">
                Based on your performance, we recommend focusing on these areas:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" data-id="gshav6zo6" data-path="pages/Progress.js">
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200" data-id="pzj5d2mq2" data-path="pages/Progress.js">
                  <div className="flex items-center mb-2" data-id="y6dbpptgj" data-path="pages/Progress.js">
                    <i className="fas fa-comments text-mediumBlue mr-2" data-id="5knc6en6z" data-path="pages/Progress.js"></i>
                    <h4 className="font-medium text-darkBlue" data-id="rjj5d9swu" data-path="pages/Progress.js">Rapport Building</h4>
                  </div>
                  <p className="text-sm text-gray-600" data-id="c4in7k07r" data-path="pages/Progress.js">
                    Practice establishing trust early in the interview
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200" data-id="jtis707ac" data-path="pages/Progress.js">
                  <div className="flex items-center mb-2" data-id="6g35n49n4" data-path="pages/Progress.js">
                    <i className="fas fa-question-circle text-mediumBlue mr-2" data-id="p4iodjdvn" data-path="pages/Progress.js"></i>
                    <h4 className="font-medium text-darkBlue" data-id="kbq0zqltu" data-path="pages/Progress.js">Question Structure</h4>
                  </div>
                  <p className="text-sm text-gray-600" data-id="omsar0qfb" data-path="pages/Progress.js">
                    Focus on using more open-ended questions
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200" data-id="1gc95dvjm" data-path="pages/Progress.js">
                  <div className="flex items-center mb-2" data-id="ffey20dyl" data-path="pages/Progress.js">
                    <i className="fas fa-search text-mediumBlue mr-2" data-id="uetrfegpi" data-path="pages/Progress.js"></i>
                    <h4 className="font-medium text-darkBlue" data-id="x34lkur9e" data-path="pages/Progress.js">Deception Detection</h4>
                  </div>
                  <p className="text-sm text-gray-600" data-id="f8v9rrqr0" data-path="pages/Progress.js">
                    Improve identifying inconsistencies in statements
                  </p>
                </div>
              </div>
              
              <div className="text-center" data-id="bpu0klsqr" data-path="pages/Progress.js">
                <Link
                  to="/scenarios"
                  className="bg-lightBlue hover:bg-mediumBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="x4v5esuos" data-path="pages/Progress.js">

                  Find New Scenarios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}