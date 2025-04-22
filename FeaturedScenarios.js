// ZAP Labs Featured Scenarios Component

function FeaturedScenarios() {
  const { useState, useEffect, useRef } = React;
  const { Link } = ReactRouterDOM;

  const [featuredScenarios, setFeaturedScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = getCurrentUser() !== null;

  const sectionRef = useRef(null);

  // Access notification system if available
  const notifications = typeof useNotifications === 'function' ? useNotifications() : null;

  // Fetch featured scenarios
  useEffect(() => {
    const fetchFeaturedScenarios = async () => {
      try {
        setIsLoading(true);
        const { success, data, error } = await getFeaturedScenarios();

        if (!success) {
          // Handle the error with notifications if available
          if (notifications) {
            notifications.error('Failed to load scenarios', { duration: 6000 });
          }
          throw new Error(error || 'Failed to fetch scenarios');
        }

        setFeaturedScenarios(data);
      } catch (err) {
        console.error('Error fetching featured scenarios:', err);

        // Set user-friendly error message
        setError(err.message || 'Failed to load scenarios');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedScenarios();
  }, [notifications]);

  // Animation on scroll
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10', 'opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white" data-id="ogbusrhs5" data-path="components/FeaturedScenarios.js">
        <div className="container mx-auto px-4 md:px-6" data-id="912cq7q8a" data-path="components/FeaturedScenarios.js">
          <div className="text-center mb-12" data-id="g4dyakgub" data-path="components/FeaturedScenarios.js">
            <h2 className="text-3xl md:text-4xl font-bold font-ibm text-darkBlue mb-4" data-id="sxkconr2c" data-path="components/FeaturedScenarios.js">
              Featured Scenarios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto" data-id="diw8vtagi" data-path="components/FeaturedScenarios.js">
              Loading featured scenarios...
            </p>
          </div>
          <div className="flex justify-center" data-id="572wkgrei" data-path="components/FeaturedScenarios.js">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mediumBlue" data-id="tigdxqtgx" data-path="components/FeaturedScenarios.js"></div>
          </div>
        </div>
      </section>);

  }

  // Render error state
  if (error) {
    return (
      <section className="py-16 md:py-24 bg-white" data-id="o83puizyc" data-path="components/FeaturedScenarios.js">
        <div className="container mx-auto px-4 md:px-6" data-id="2m0pbftsj" data-path="components/FeaturedScenarios.js">
          <div className="text-center mb-8" data-id="hj3tuw1hy" data-path="components/FeaturedScenarios.js">
            <h2 className="text-3xl md:text-4xl font-bold font-ibm text-darkBlue mb-4" data-id="aqznauk38" data-path="components/FeaturedScenarios.js">
              Featured Scenarios
            </h2>
            
            {/* Use our ErrorMessage component if available */}
            {typeof ErrorMessage === 'function' ?
            <div className="max-w-md mx-auto" data-id="wz9qw7vvl" data-path="components/FeaturedScenarios.js">
                <ErrorMessage
                error={error}
                retry={() => window.location.reload()} data-id="jhcbrtehj" data-path="components/FeaturedScenarios.js" />

              </div> :

            <>
                <p className="text-red-500 mb-2" data-id="rys68gfni" data-path="components/FeaturedScenarios.js">
                  Error loading scenarios: {error}
                </p>
                <button
                onClick={() => window.location.reload()}
                className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="27w0a3e8x" data-path="components/FeaturedScenarios.js">
                  Try Again
                </button>
              </>
            }
          </div>
        </div>
      </section>);

  }

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-white transition-all duration-1000 ease-out transform translate-y-10 opacity-0" data-id="7m1crnaq0" data-path="components/FeaturedScenarios.js">

      <div className="container mx-auto px-4 md:px-6" data-id="akmg22zc0" data-path="components/FeaturedScenarios.js">
        <div className="text-center mb-12" data-id="ik7j50v9m" data-path="components/FeaturedScenarios.js">
          <h2 className="text-3xl md:text-4xl font-bold font-ibm text-darkBlue mb-4" data-id="xe1gaaj6k" data-path="components/FeaturedScenarios.js">
            Featured Scenarios
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" data-id="bs1bh2o7v" data-path="components/FeaturedScenarios.js">
            Explore our carefully designed interview scenarios to practice and enhance your investigative techniques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto" data-id="2nsod2raf" data-path="components/FeaturedScenarios.js">
          {featuredScenarios.map((scenario) =>
          <ScenarioCard
            key={scenario.id}
            scenario={scenario}
            isAuthenticated={isAuthenticated} data-id="d7vyucznb" data-path="components/FeaturedScenarios.js" />

          )}
        </div>
        
        <div className="mt-12 text-center" data-id="hrdou8gi6" data-path="components/FeaturedScenarios.js">
          <Link
            to={isAuthenticated ? "/scenarios" : "/login"}
            className="bg-darkBlue hover:bg-mediumBlue text-white py-3 px-8 rounded-md font-semibold transition-colors duration-200 inline-block shadow-md hover:shadow-lg" data-id="uokbkh9sq" data-path="components/FeaturedScenarios.js">

            View All Scenarios
          </Link>
        </div>
      </div>
    </section>);

}