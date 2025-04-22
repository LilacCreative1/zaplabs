// ZAP Labs Resources Page

function Resources() {
  const { useState, useEffect } = React;

  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  // Set page title
  useEffect(() => {
    document.title = 'Resources - ZAP Labs';
  }, []);

  // Fetch resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { success, data, error } = await getResources();

        if (!success) throw new Error(error || 'Failed to fetch resources');

        setResources(data);
        setFilteredResources(data);
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // Filter resources based on search and category
  useEffect(() => {
    if (!resources.length) return;

    let results = [...resources];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter((resource) =>
      resource.title.toLowerCase().includes(term) ||
      resource.description.toLowerCase().includes(term) ||
      resource.category.toLowerCase().includes(term)
      );
    }

    // Apply category filter
    if (activeCategory) {
      results = results.filter((resource) => resource.category === activeCategory);
    }

    setFilteredResources(results);
  }, [resources, searchTerm, activeCategory]);

  // Get unique categories
  const categories = ['All', ...new Set(resources.map((resource) => resource.category))];

  // Handle search input
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setActiveCategory(category === 'All' ? '' : category);
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="bjai0zaks" data-path="pages/Resources.js">
        <div className="container mx-auto px-4" data-id="wwxhiety9" data-path="pages/Resources.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-6 font-ibm" data-id="9flhe73x2" data-path="pages/Resources.js">Resources</h1>
          <div className="flex justify-center items-center py-12" data-id="jzoglu3i8" data-path="pages/Resources.js">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mediumBlue" data-id="jf41rni8r" data-path="pages/Resources.js"></div>
          </div>
        </div>
      </div>);

  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="9439fliha" data-path="pages/Resources.js">
        <div className="container mx-auto px-4" data-id="owka119ee" data-path="pages/Resources.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-6 font-ibm" data-id="9t7mn26a8" data-path="pages/Resources.js">Resources</h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert" data-id="rwvf39ewo" data-path="pages/Resources.js">
            <strong className="font-bold" data-id="2mtnbi575" data-path="pages/Resources.js">Error: </strong>
            <span className="block sm:inline" data-id="87dly5rq8" data-path="pages/Resources.js">{error}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="n40mw6cq2" data-path="pages/Resources.js">

            Try Again
          </button>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="cfvn8del4" data-path="pages/Resources.js">
      <div className="container mx-auto px-4" data-id="ys0ai64ml" data-path="pages/Resources.js">
        <div className="max-w-6xl mx-auto" data-id="jj0ugiwnt" data-path="pages/Resources.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-6 font-ibm" data-id="hwkgl3hhw" data-path="pages/Resources.js">Training Resources</h1>
          
          {/* Search and Category Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-id="nz0cre7je" data-path="pages/Resources.js">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" data-id="nmdnww3sc" data-path="pages/Resources.js">
              {/* Search Input */}
              <div className="w-full md:w-1/2" data-id="ve2nfb8le" data-path="pages/Resources.js">
                <div className="relative" data-id="uuoy9cayt" data-path="pages/Resources.js">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-id="794gxpbqe" data-path="pages/Resources.js">
                    <i className="fas fa-search text-gray-400" data-id="qjs3cut5u" data-path="pages/Resources.js"></i>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="form-control pl-10 w-full py-2 rounded-md"
                    placeholder="Search resources..." data-id="m2l02wasc" data-path="pages/Resources.js" />

                </div>
              </div>
              
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2" data-id="f36ynrlau" data-path="pages/Resources.js">
                {categories.map((category) =>
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                  category === 'All' && !activeCategory || category === activeCategory ?
                  'bg-mediumBlue text-white' :
                  'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  } data-id="f0sz8dws2" data-path="pages/Resources.js">

                    {category}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          {/* Resources Grid */}
          {filteredResources.length > 0 ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="dhacfju9d" data-path="pages/Resources.js">
              {filteredResources.map((resource) =>
            <a
              key={resource.id}
              href={resource.url}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200" data-id="ohiy2mwi7" data-path="pages/Resources.js">

                  <div className="flex items-start" data-id="rj04m80cv" data-path="pages/Resources.js">
                    <div className="w-12 h-12 bg-lightBlue bg-opacity-10 rounded-lg flex items-center justify-center text-lightBlue mr-4" data-id="ytxb7vkpw" data-path="pages/Resources.js">
                      <i className={`fas ${resource.icon} text-xl`} data-id="20qsdld68" data-path="pages/Resources.js"></i>
                    </div>
                    <div data-id="4i4vyvg7r" data-path="pages/Resources.js">
                      <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-2" data-id="duzog6gjr" data-path="pages/Resources.js">
                        {resource.category}
                      </span>
                      <h3 className="text-lg font-bold text-darkBlue mb-2" data-id="kvws98cs3" data-path="pages/Resources.js">{resource.title}</h3>
                      <p className="text-gray-600 text-sm" data-id="w8hqqnhe1" data-path="pages/Resources.js">{resource.description}</p>
                    </div>
                  </div>
                </a>
            )}
            </div> :

          <div className="text-center py-12 bg-white rounded-lg shadow" data-id="j2m318x07" data-path="pages/Resources.js">
              <div className="text-5xl text-gray-300 mb-4" data-id="7128z20cl" data-path="pages/Resources.js">
                <i className="fas fa-search" data-id="q02zido35" data-path="pages/Resources.js"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2" data-id="qckw07q4t" data-path="pages/Resources.js">No Resources Found</h3>
              <p className="text-gray-500 mb-4" data-id="rxg2udppf" data-path="pages/Resources.js">
                No resources match your current search criteria.
              </p>
              <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('');
              }}
              className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="9rv9dodjl" data-path="pages/Resources.js">

                Clear Filters
              </button>
            </div>
          }
          
          {/* Additional Resources Section */}
          <div className="mt-12" data-id="5e7rf3s2n" data-path="pages/Resources.js">
            <h2 className="text-2xl font-bold text-darkBlue mb-6 font-ibm" data-id="qag9fasx2" data-path="pages/Resources.js">Additional Training Support</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden" data-id="mfwsjrbu2" data-path="pages/Resources.js">
              <div className="grid grid-cols-1 md:grid-cols-3" data-id="v4xywpwco" data-path="pages/Resources.js">
                <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200" data-id="yccyyrmt8" data-path="pages/Resources.js">
                  <div className="text-3xl text-mediumBlue mb-4" data-id="u6cyk9r6r" data-path="pages/Resources.js">
                    <i className="fas fa-users" data-id="t7l9xbmk5" data-path="pages/Resources.js"></i>
                  </div>
                  <h3 className="text-xl font-bold text-darkBlue mb-2" data-id="ehobuhk6z" data-path="pages/Resources.js">Group Training</h3>
                  <p className="text-gray-600 mb-4" data-id="9rah2srv7" data-path="pages/Resources.js">
                    Schedule a facilitated group training session for your department or team. 
                    Our experts will guide your group through scenario-based training.
                  </p>
                  <a
                    href="#"
                    className="text-mediumBlue hover:text-darkBlue font-medium inline-flex items-center" data-id="nvl3e1t0m" data-path="pages/Resources.js">

                    Request Group Training
                    <i className="fas fa-arrow-right ml-2" data-id="2mdmjy9zx" data-path="pages/Resources.js"></i>
                  </a>
                </div>
                
                <div className="p-6 border-b md:border-b-0 md:border-r border-gray-200" data-id="dn850cmx3" data-path="pages/Resources.js">
                  <div className="text-3xl text-mediumBlue mb-4" data-id="wkoanblw3" data-path="pages/Resources.js">
                    <i className="fas fa-calendar-alt" data-id="2fwptfihg" data-path="pages/Resources.js"></i>
                  </div>
                  <h3 className="text-xl font-bold text-darkBlue mb-2" data-id="8w2p7xly6" data-path="pages/Resources.js">Workshops</h3>
                  <p className="text-gray-600 mb-4" data-id="l7957pras" data-path="pages/Resources.js">
                    Join our monthly online workshops focusing on different aspects of interview techniques
                    and case handling methodology.
                  </p>
                  <a
                    href="#"
                    className="text-mediumBlue hover:text-darkBlue font-medium inline-flex items-center" data-id="zmr0wdeal" data-path="pages/Resources.js">

                    View Workshop Schedule
                    <i className="fas fa-arrow-right ml-2" data-id="xlkxs7z3h" data-path="pages/Resources.js"></i>
                  </a>
                </div>
                
                <div className="p-6" data-id="83xtt7ma2" data-path="pages/Resources.js">
                  <div className="text-3xl text-mediumBlue mb-4" data-id="lvh9q25qd" data-path="pages/Resources.js">
                    <i className="fas fa-headset" data-id="ov1pqbsel" data-path="pages/Resources.js"></i>
                  </div>
                  <h3 className="text-xl font-bold text-darkBlue mb-2" data-id="xsoyn9slc" data-path="pages/Resources.js">One-on-One Coaching</h3>
                  <p className="text-gray-600 mb-4" data-id="46lxtmme1" data-path="pages/Resources.js">
                    Get personalized feedback and coaching from experienced investigators
                    who can help you refine your techniques.
                  </p>
                  <a
                    href="#"
                    className="text-mediumBlue hover:text-darkBlue font-medium inline-flex items-center" data-id="p9k1ljt3f" data-path="pages/Resources.js">

                    Schedule Coaching
                    <i className="fas fa-arrow-right ml-2" data-id="vho001vh2" data-path="pages/Resources.js"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}