// ZAP Labs Main Application

// Initialize auth on app load
initAuth();

// Initialize error handler to make it globally available - we'll do this later after the functions are defined

// App component
function App() {
  const { useState, useEffect } = React;
  const { BrowserRouter, Routes, Route, Navigate, useLocation } = ReactRouterDOM;

  const [isAuthenticated, setIsAuthenticated] = useState(getCurrentUser() !== null);

  useEffect(() => {
    // Setup auth state change listener
    const checkAuthStatus = () => {
      setIsAuthenticated(getCurrentUser() !== null);
    };

    // Check auth status initially
    checkAuthStatus();

    // Set up event listeners for login/logout
    window.addEventListener('login', checkAuthStatus);
    window.addEventListener('logout', checkAuthStatus);

    return () => {
      // Clean up event listeners
      window.removeEventListener('login', checkAuthStatus);
      window.removeEventListener('logout', checkAuthStatus);
    };
  }, []);

  return (
    <BrowserRouter data-id="o3htcg5hz" data-path="app.js">
      <div className="min-h-screen flex flex-col" data-id="stdywqz8a" data-path="app.js">
        <Navbar isAuthenticated={isAuthenticated} data-id="y5wbhr111" data-path="app.js" />
        <main className="flex-grow" data-id="3rhjh2r0c" data-path="app.js">
          <Routes data-id="wnvvtq9q3" data-path="app.js">
            <Route path="/" element={<Home data-id="q3rh3bbsu" data-path="app.js" />} data-id="93kecp1m6" data-path="app.js" />
            <Route path="/login" element={<Login data-id="cri57vjlx" data-path="app.js" />} data-id="d3u40wcn8" data-path="app.js" />
            <Route
              path="/scenarios"
              element={
              <ProtectedRoute isAuthenticated={isAuthenticated} data-id="amsdhlw0s" data-path="app.js">
                  <Scenarios data-id="odgh4wvs3" data-path="app.js" />
                </ProtectedRoute>
              } data-id="unkaa7ht6" data-path="app.js" />

            <Route
              path="/scenarios/:id"
              element={
              <ProtectedRoute isAuthenticated={isAuthenticated} data-id="6yh5pkoh7" data-path="app.js">
                  <Simulation data-id="zb9x7hyli" data-path="app.js" />
                </ProtectedRoute>
              } data-id="gd1c6uvv" data-path="app.js" />

            <Route
              path="/evaluation"
              element={
              <ProtectedRoute isAuthenticated={isAuthenticated} data-id="01fc3nb56" data-path="app.js">
                  <Evaluation data-id="w1ddq5naa" data-path="app.js" />
                </ProtectedRoute>
              } data-id="xku4f3vdk" data-path="app.js" />

            <Route
              path="/progress"
              element={
              <ProtectedRoute isAuthenticated={isAuthenticated} data-id="nld8pe1rn" data-path="app.js">
                  <Progress data-id="kr1yc6hyy" data-path="app.js" />
                </ProtectedRoute>
              } data-id="j9pjhxlmp" data-path="app.js" />

            <Route
              path="/resources"
              element={
              <ProtectedRoute isAuthenticated={isAuthenticated} data-id="jojel0h8j" data-path="app.js">
                  <Resources data-id="pwi1jcbta" data-path="app.js" />
                </ProtectedRoute>
              } data-id="ffgkeh8d7" data-path="app.js" />

            <Route
              path="/admin/settings"
              element={
              <ProtectedRoute isAuthenticated={isAuthenticated} data-id="tb0ib87ga" data-path="app.js">
                  <AdminSettings data-id="etks5kv68" data-path="app.js" />
                </ProtectedRoute>
              } data-id="pjw7etj75" data-path="app.js" />
            


            <Route path="*" element={<Navigate to="/" replace data-id="oha79ef38" data-path="app.js" />} data-id="9ka2xqzks" data-path="app.js" />
          </Routes>
        </main>
        <Footer data-id="ofm5exj8a" data-path="app.js" />
      </div>
    </BrowserRouter>);

}

// Utility for simple error handling
function parseError(error) {
  if (typeof error === 'string') return { message: error, type: 'unknown' };
  if (error instanceof Error) return { message: error.message, type: error.name || 'Error' };
  return { message: 'An unknown error occurred', type: 'unknown' };
}

// Global error handler component
function GlobalErrorHandler({ children }) {
  return (
    <NotificationProvider data-id="09lbevmbc" data-path="app.js">
      <NetworkStatusIndicator data-id="p4u6lvavi" data-path="app.js" />
      {children}
    </NotificationProvider>);

}

// Render the app
ReactDOM.render(
  <React.StrictMode data-id="xmw9zj5vu" data-path="app.js">
    <GlobalErrorHandler data-id="vrortqk3c" data-path="app.js">
      <App data-id="wy2w24jfm" data-path="app.js" />
    </GlobalErrorHandler>
  </React.StrictMode>,
  document.getElementById('root')
);