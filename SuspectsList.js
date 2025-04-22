function SuspectsList() {
  const [suspectsList, setSuspectsList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchSuspects = async () => {
      try {
        setLoading(true);
        // Use the utility function we created
        const { success, data, error } = await fetchSuspectsFromAPI();

        if (!success) {
          throw new Error(error || 'Failed to fetch suspects');
        }

        setSuspectsList(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching suspects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuspects();
  }, []);

  const handleViewBrief = (id) => {
    console.log('Suspect ID:', id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]" data-id="rk5qac7bx" data-path="components/SuspectsList.js">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" data-id="u2fdgva5d" data-path="components/SuspectsList.js"></div>
      </div>);

  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-100 text-red-700 rounded-md" data-id="8bcl7b9fs" data-path="components/SuspectsList.js">
        Error: {error}
      </div>);

  }

  if (!suspectsList || suspectsList.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-md" data-id="g2w4i7igo" data-path="components/SuspectsList.js">
        <i className="fas fa-search text-gray-400 text-3xl mb-3" data-id="k58g1txxg" data-path="components/SuspectsList.js"></i>
        <p className="text-gray-600" data-id="pjluh026t" data-path="components/SuspectsList.js">No suspect profiles found.</p>
      </div>);

  }

  return (
    <section className="container mx-auto p-4" data-id="fcih3c8zb" data-path="components/SuspectsList.js">
      <h2 className="text-2xl font-bold text-gray-800 mb-6" data-id="v1zb6rarr" data-path="components/SuspectsList.js">Training Scenarios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-id="jjgcpdvjh" data-path="components/SuspectsList.js">
        {suspectsList.map((suspect) =>
        <div key={suspect.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200" data-id="2ro6chulp" data-path="components/SuspectsList.js">
            <div className="relative h-48 bg-gray-200" data-id="sw4p1xyfd" data-path="components/SuspectsList.js">
              {suspect.image ?
            <img
              src={suspect.image}
              alt={`${suspect.name} profile`}
              className="w-full h-full object-cover" data-id="rj0mtkc8t" data-path="components/SuspectsList.js" /> :


            <div className="flex justify-center items-center h-full bg-gray-200" data-id="u5o7izsr8" data-path="components/SuspectsList.js">
                  <i className="fas fa-user text-gray-400 text-4xl" data-id="ecsmi5sgv" data-path="components/SuspectsList.js"></i>
                </div>
            }
            </div>
            <div className="p-4" data-id="yyipvdb05" data-path="components/SuspectsList.js">
              <h3 className="text-xl font-bold text-gray-800 mb-2" data-id="j7bvcq5st" data-path="components/SuspectsList.js">{suspect.name}</h3>
              
              <div className="mb-3 flex flex-wrap" data-id="d3sg9iwv7" data-path="components/SuspectsList.js">
                {suspect.tags && suspect.tags.split(',').map((tag, index) =>
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mr-2 mb-2" data-id="ll85ycge4" data-path="components/SuspectsList.js">

                    {tag.trim()}
                  </span>
              )}
              </div>
              
              <p className="text-gray-600 mb-4" data-id="pv57yyr6h" data-path="components/SuspectsList.js">{suspect.crime}</p>
              
              <button
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => handleViewBrief(suspect.id)} data-id="i618k2o7s" data-path="components/SuspectsList.js">

                View Brief
              </button>
            </div>
          </div>
        )}
      </div>
    </section>);

}