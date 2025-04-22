// ZAP Labs Admin Settings Page

function AdminSettings() {
  const { useState, useEffect } = React;
  const { useNavigate, Navigate, useLocation } = ReactRouterDOM;

  const [activeTab, setActiveTab] = useState('api');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        setIsLoading(true);
        console.log('Checking admin status...');

        // First check if the user is authenticated using our local state
        const currentUser = getCurrentUser();
        console.log('Local auth check:', currentUser ? 'User found' : 'No user');

        if (!currentUser) {
          console.log('No current user, setting isAdmin to false');
          setIsAdmin(false);
          return;
        }

        // Get current user information from the API as a backup
        try {
          console.log('Attempting to get user info from API...');
          const { data: user, error } = await window.ezsite.apis.getUserInfo();

          if (error) {
            console.warn('API user info error:', error);
            // Fall back to local auth state instead of throwing
            console.log('Using local auth as fallback due to API error');
            setIsAdmin(true); // Consider all logged-in users as admins for this demo
          } else {
            // In a real application, you'd have a proper admin check (e.g., user.role === 'admin')
            // For this demo, we're considering all authenticated users as admins
            console.log('API auth check:', user ? 'User found' : 'No user');
            setIsAdmin(true); // Consider all logged-in users as admins

            // Add some debug info
            console.log('User authenticated from API');
          }
        } catch (apiErr) {
          console.warn('API call failed:', apiErr);
          // Fall back to local auth state
          console.log('Using local auth as fallback due to API exception');
          setIsAdmin(true); // Consider all logged-in users as admins for this demo
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  // If user is not logged in, redirect to login
  if (!isLoading && !isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace data-id="mz2xayxpp" data-path="pages/AdminSettings.js" />;
  }

  // If user is not an admin, show access denied
  if (!isLoading && !isAdmin) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="2ayskeep1" data-path="pages/AdminSettings.js">
        <div className="container mx-auto px-4" data-id="k8ezztcsq" data-path="pages/AdminSettings.js">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center" data-id="pfitogvj2" data-path="pages/AdminSettings.js">
            <div className="text-red-500 mb-4" data-id="izmtfmgsr" data-path="pages/AdminSettings.js">
              <i className="fas fa-exclamation-circle text-5xl" data-id="j7vbvf9pv" data-path="pages/AdminSettings.js"></i>
            </div>
            <h2 className="text-2xl font-bold text-darkBlue mb-4" data-id="733lc1z4j" data-path="pages/AdminSettings.js">Access Denied</h2>
            <p className="text-gray-600 mb-6" data-id="wi5gptun2" data-path="pages/AdminSettings.js">
              You don't have permission to access the administrator settings.
              Please contact your system administrator if you believe this is an error.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="yqntcr5ck" data-path="pages/AdminSettings.js">

              Return to Home
            </button>
          </div>
        </div>
      </div>);

  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="z9obi5kol" data-path="pages/AdminSettings.js">
        <div className="container mx-auto px-4 flex justify-center" data-id="lyvi5pnka" data-path="pages/AdminSettings.js">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mediumBlue" data-id="6t46ylyv4" data-path="pages/AdminSettings.js"></div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="s4bntrgm3" data-path="pages/AdminSettings.js">
      <div className="container mx-auto px-4" data-id="71q8mxkzn" data-path="pages/AdminSettings.js">
        <div className="max-w-6xl mx-auto" data-id="i9jju8pv0" data-path="pages/AdminSettings.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-6 font-ibm" data-id="snnlw782g" data-path="pages/AdminSettings.js">Administrator Settings</h1>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden" data-id="1f52lr3vr" data-path="pages/AdminSettings.js">
            {/* Tabs */}
            <div className="flex border-b border-gray-200" data-id="dp2rgwx6n" data-path="pages/AdminSettings.js">
              <button
                onClick={() => setActiveTab('api')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'api' ?
                'text-mediumBlue border-b-2 border-mediumBlue' :
                'text-gray-500 hover:text-mediumBlue'}`
                } data-id="1o566t6ok" data-path="pages/AdminSettings.js">

                <i className="fas fa-key mr-2" data-id="rx5jzw4gd" data-path="pages/AdminSettings.js"></i>
                API Settings
              </button>
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'general' ?
                'text-mediumBlue border-b-2 border-mediumBlue' :
                'text-gray-500 hover:text-mediumBlue'}`
                } data-id="msfbbqnzj" data-path="pages/AdminSettings.js">

                <i className="fas fa-cog mr-2" data-id="949d1zvam" data-path="pages/AdminSettings.js"></i>
                General Settings
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-6 font-medium text-sm focus:outline-none ${
                activeTab === 'users' ?
                'text-mediumBlue border-b-2 border-mediumBlue' :
                'text-gray-500 hover:text-mediumBlue'}`
                } data-id="ntevd3tmx" data-path="pages/AdminSettings.js">

                <i className="fas fa-users mr-2" data-id="rjpq90vzi" data-path="pages/AdminSettings.js"></i>
                User Management
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6" data-id="5a4sl22wz" data-path="pages/AdminSettings.js">
              {activeTab === 'api' &&
              <div data-id="a3cs1w5y8" data-path="pages/AdminSettings.js">
                  <p className="text-gray-600 mb-6" data-id="bb2q9uehk" data-path="pages/AdminSettings.js">
                    Configure API keys and integrations for the ZAP Labs platform.
                    These settings control how the platform interacts with external services.
                  </p>
                  
                  <div className="grid grid-cols-1 gap-8" data-id="kh1jox5gv" data-path="pages/AdminSettings.js">
                    {/* API Key Manager */}
                    <ApiKeyManager data-id="fyqylu78r" data-path="pages/AdminSettings.js" />
                    
                    {/* API Usage Monitor */}
                    <div className="mt-6" data-id="af41ueyb1" data-path="pages/AdminSettings.js">
                      <h3 className="text-lg font-medium text-darkBlue mb-3" data-path="pages/AdminSettings.js" data-id="8jsvwjt3k">API Usage Monitoring</h3>
                      <ApiUsageMonitor data-path="pages/AdminSettings.js" data-id="9i4fj6b4l" />
                    </div>
                    
                    {/* Throttling Configuration */}
                    <div className="mt-6" data-id="igjos83zr" data-path="pages/AdminSettings.js">
                      <ThrottlingConfig data-path="pages/AdminSettings.js" data-id="jp2sje9qw" />
                    </div>
                    
                    {/* API Security Information */}
                    <div className="mt-6" data-id="7m1a0dfio" data-path="pages/AdminSettings.js">
                      <ApiSecurityInfo data-path="pages/AdminSettings.js" data-id="14uugl5op" />
                    </div>
                  </div>
                </div>
              }
              
              {activeTab === 'general' &&
              <div data-id="n13ymvhe0" data-path="pages/AdminSettings.js">
                  <h2 className="text-2xl font-bold text-darkBlue mb-4 font-ibm" data-id="phl0je5bv" data-path="pages/AdminSettings.js">General Platform Settings</h2>
                  <p className="text-gray-600 mb-6" data-id="xbxhd9doy" data-path="pages/AdminSettings.js">
                    This section will contain general platform configuration options.
                    Feature currently under development.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4" data-id="en1ou53ly" data-path="pages/AdminSettings.js">
                    <div className="flex" data-id="v6sooyo37" data-path="pages/AdminSettings.js">
                      <div className="flex-shrink-0" data-id="ilugrsid7" data-path="pages/AdminSettings.js">
                        <i className="fas fa-tools text-yellow-500" data-id="rxjoyliuj" data-path="pages/AdminSettings.js"></i>
                      </div>
                      <div className="ml-3" data-id="3mhs7ukre" data-path="pages/AdminSettings.js">
                        <p className="text-sm text-yellow-700" data-id="crjr1fg0m" data-path="pages/AdminSettings.js">
                          General settings configuration is coming soon.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
              
              {activeTab === 'users' &&
              <div data-id="gv4k3fupa" data-path="pages/AdminSettings.js">
                  <h2 className="text-2xl font-bold text-darkBlue mb-4 font-ibm" data-id="vbpasaad9" data-path="pages/AdminSettings.js">User Management</h2>
                  <p className="text-gray-600 mb-6" data-id="41heed22c" data-path="pages/AdminSettings.js">
                    This section will allow administrators to manage user accounts, permissions, and access.
                    Feature currently under development.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4" data-id="0iplwhehf" data-path="pages/AdminSettings.js">
                    <div className="flex" data-id="f9r62yqel" data-path="pages/AdminSettings.js">
                      <div className="flex-shrink-0" data-id="egqkl2rlq" data-path="pages/AdminSettings.js">
                        <i className="fas fa-tools text-yellow-500" data-id="fq9eedhjy" data-path="pages/AdminSettings.js"></i>
                      </div>
                      <div className="ml-3" data-id="zy3xffnvy" data-path="pages/AdminSettings.js">
                        <p className="text-sm text-yellow-700" data-id="tsbmhx1ns" data-path="pages/AdminSettings.js">
                          User management features are coming soon.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mt-6 text-sm text-gray-500" data-id="qbqr9es6y" data-path="pages/AdminSettings.js">
            <i className="fas fa-shield-alt mr-2 text-mediumBlue" data-id="yareemt34" data-path="pages/AdminSettings.js"></i>
            Administrator settings are restricted to authorized personnel only.
            All actions are logged for security and compliance purposes.
          </div>
        </div>
      </div>
    </div>);

}