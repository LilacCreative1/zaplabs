// ZAP Labs Scenarios Page

function Scenarios() {
  const { useState, useEffect } = React;

  const [scenarios, setScenarios] = useState([]);
  const [filteredScenarios, setFilteredScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  // Removed state for API suspects section

  // Set page title
  useEffect(() => {
    document.title = 'Scenarios - ZAP Labs';
  }, []);

  // Fetch scenarios
  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        setIsLoading(true);

        const { success, data, error } = await getScenarios();

        if (!success) throw new Error(error || 'Failed to fetch scenarios');

        setScenarios(data);
        setFilteredScenarios(data);
      } catch (err) {
        console.error('Error fetching scenarios:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScenarios();
  }, []);

  // Filter scenarios based on search and filters
  useEffect(() => {
    if (!scenarios.length) return;

    let results = [...scenarios];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter((scenario) =>
      scenario.name.toLowerCase().includes(term) ||
      scenario.type.toLowerCase().includes(term) ||
      scenario.description.toLowerCase().includes(term) ||
      scenario.tags.some((tag) => tag.toLowerCase().includes(term))
      );
    }

    // Apply type filter
    if (filterType) {
      results = results.filter((scenario) => scenario.type === filterType);
    }

    // Apply difficulty filter
    if (filterDifficulty) {
      results = results.filter((scenario) => scenario.difficulty === filterDifficulty);
    }

    setFilteredScenarios(results);
  }, [scenarios, searchTerm, filterType, filterDifficulty]);

  // Get unique scenario types
  const scenarioTypes = [...new Set(scenarios.map((scenario) => scenario.type))];

  // Get unique difficulty levels
  const difficultyLevels = [...new Set(scenarios.map((scenario) => scenario.difficulty))];

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilterType('');
    setFilterDifficulty('');
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="ilbwi03ln" data-path="pages/Scenarios.js">
        <div className="container mx-auto px-4" data-id="26s9owedk" data-path="pages/Scenarios.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-6 font-ibm" data-id="dtztx003t" data-path="pages/Scenarios.js">Scenarios</h1>
          <div className="flex justify-center items-center py-12" data-id="wt8q5q9xf" data-path="pages/Scenarios.js">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mediumBlue" data-id="6ru3kgjqf" data-path="pages/Scenarios.js"></div>
          </div>
        </div>
      </div>);
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="ybbwr4rpg" data-path="pages/Scenarios.js">
        <div className="container mx-auto px-4" data-id="plcc1hwkz" data-path="pages/Scenarios.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-6 font-ibm" data-id="4ogiilda3" data-path="pages/Scenarios.js">Scenarios</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert" data-id="hj3r3182c" data-path="pages/Scenarios.js">
            <strong className="font-bold" data-id="s47vb4kgf" data-path="pages/Scenarios.js">Error: </strong>
            <span className="block sm:inline" data-id="v4jmm1t8q" data-path="pages/Scenarios.js">{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="k83ee5ff1" data-path="pages/Scenarios.js">
            Try Again
          </button>
        </div>
      </div>);
  }

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="q6feyes25" data-path="pages/Scenarios.js">
      <div className="container mx-auto px-4" data-id="i4rgi4862" data-path="pages/Scenarios.js">
        <div className="mb-8" data-id="c5zoibbf3" data-path="pages/Scenarios.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-4 font-ibm" data-id="odmhceytd" data-path="pages/Scenarios.js">Interview Scenarios</h1>
          <p className="text-gray-600 max-w-3xl" data-id="x9n61py2l" data-path="pages/Scenarios.js">
            Browse through our collection of AI-powered interview scenarios. Each scenario presents a unique 
            suspect profile with specific characteristics and case details. Select any scenario to begin practicing.
          </p>
          
          {/* Database Scenarios heading */}
        </div>
        
        {/* Database Scenarios Section */}
        <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-8" data-id="c52r3ss9g" data-path="pages/Scenarios.js">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4" data-id="koxgima4n" data-path="pages/Scenarios.js">
                {/* Search Input */}
                <div className="md:col-span-2" data-id="lepxxcqmk" data-path="pages/Scenarios.js">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1" data-id="4lhexecjz" data-path="pages/Scenarios.js">
                    Search Scenarios
                  </label>
                  <div className="relative" data-id="yne30behu" data-path="pages/Scenarios.js">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-id="1me8qc076" data-path="pages/Scenarios.js">
                      <i className="fas fa-search text-gray-400" data-id="k3w3mfb6y" data-path="pages/Scenarios.js"></i>
                    </div>
                    <input
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control pl-10 w-full py-2 rounded-md"
                    placeholder="Search by name, type, or tags..." data-id="p8bhcvtat" data-path="pages/Scenarios.js" />
                  </div>
                </div>
                
                {/* Type Filter */}
                <div data-id="hj9fs91k3" data-path="pages/Scenarios.js">
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1" data-id="rbz1b8lcx" data-path="pages/Scenarios.js">
                    Case Type
                  </label>
                  <select
                  id="type"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="form-control w-full py-2 rounded-md" data-id="7gtsgmymd" data-path="pages/Scenarios.js">
                    <option value="" data-id="pdnws4ph5" data-path="pages/Scenarios.js">All Types</option>
                    {scenarioTypes.map((type) =>
                  <option key={type} value={type} data-id="oederz4nx" data-path="pages/Scenarios.js">{type}</option>
                  )}
                  </select>
                </div>
                
                {/* Difficulty Filter */}
                <div data-id="swixxkpag" data-path="pages/Scenarios.js">
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1" data-id="o9emucevv" data-path="pages/Scenarios.js">
                    Difficulty
                  </label>
                  <select
                  id="difficulty"
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="form-control w-full py-2 rounded-md" data-id="5l28r4ucj" data-path="pages/Scenarios.js">
                    <option value="" data-id="igearvt5g" data-path="pages/Scenarios.js">All Difficulties</option>
                    {difficultyLevels.map((difficulty) =>
                  <option key={difficulty} value={difficulty} data-id="armyswcui" data-path="pages/Scenarios.js">{difficulty}</option>
                  )}
                  </select>
                </div>
              </div>
              
              {/* Filter Indicators and Clear Buttons */}
              {(searchTerm || filterType || filterDifficulty) &&
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200" data-id="3vba7ckyr" data-path="pages/Scenarios.js">
                  <div className="flex flex-wrap items-center gap-2" data-id="skf9ljx32" data-path="pages/Scenarios.js">
                    {searchTerm &&
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center" data-id="o8ji478vq" data-path="pages/Scenarios.js">
                        Search: "{searchTerm}"
                        <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 text-gray-500 hover:text-gray-700" data-id="5r3vli8il" data-path="pages/Scenarios.js">
                          <i className="fas fa-times-circle" data-id="c70yi2awa" data-path="pages/Scenarios.js"></i>
                        </button>
                      </span>
                }
                    
                    {filterType &&
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center" data-id="dqtsj0vr0" data-path="pages/Scenarios.js">
                        Type: {filterType}
                        <button
                    onClick={() => setFilterType('')}
                    className="ml-2 text-gray-500 hover:text-gray-700" data-id="q35r3vu70" data-path="pages/Scenarios.js">
                          <i className="fas fa-times-circle" data-id="xzmr90dne" data-path="pages/Scenarios.js"></i>
                        </button>
                      </span>
                }
                    
                    {filterDifficulty &&
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full flex items-center" data-id="rufe6rnp7" data-path="pages/Scenarios.js">
                        Difficulty: {filterDifficulty}
                        <button
                    onClick={() => setFilterDifficulty('')}
                    className="ml-2 text-gray-500 hover:text-gray-700" data-id="tn45m1gll" data-path="pages/Scenarios.js">
                          <i className="fas fa-times-circle" data-id="pee8x8w04" data-path="pages/Scenarios.js"></i>
                        </button>
                      </span>
                }
                  </div>
                  
                  <button
                onClick={clearFilters}
                className="text-mediumBlue hover:text-darkBlue text-sm font-medium" data-id="941iqlhz6" data-path="pages/Scenarios.js">
                    Clear All Filters
                  </button>
                </div>
            }
            </div>
            
            {/* Scenarios Grid */}
            {filteredScenarios.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="f8l0ed7mz" data-path="pages/Scenarios.js">
                {filteredScenarios.map((scenario) =>
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              isAuthenticated={true} data-id="09mspswgk" data-path="pages/Scenarios.js" />
            )}
              </div> :

          <div className="text-center py-12 bg-white rounded-lg shadow" data-id="r0b6znc4q" data-path="pages/Scenarios.js">
                <div className="text-5xl text-gray-300 mb-4" data-id="rtnwkayxk" data-path="pages/Scenarios.js">
                  <i className="fas fa-search" data-id="wc2fxc9k4" data-path="pages/Scenarios.js"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2" data-id="i1pp8ax65" data-path="pages/Scenarios.js">No Scenarios Found</h3>
                <p className="text-gray-500 mb-4" data-id="w4gnxp5fy" data-path="pages/Scenarios.js">
                  No scenarios match your current search and filter criteria.
                </p>
                <button
              onClick={clearFilters}
              className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="2xqau5hly" data-path="pages/Scenarios.js">
                  Clear Filters
                </button>
              </div>
          }
          </>
      </div>
    </div>);

}