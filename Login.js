// ZAP Labs Login Page

function Login() {
  const { useEffect } = React;
  const { Navigate } = ReactRouterDOM;

  // If user is already authenticated, redirect to scenarios
  if (isAuthenticated()) {
    return <Navigate to="/scenarios" replace data-id="shtxk5dlq" data-path="pages/Login.js" />;
  }

  // Set page title
  useEffect(() => {
    document.title = 'Login - ZAP Labs';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12" data-id="6xotbqe9o" data-path="pages/Login.js">
      <div className="container mx-auto px-4" data-id="0bdz8pc5w" data-path="pages/Login.js">
        <div className="flex justify-center" data-id="899iizfts" data-path="pages/Login.js">
          <LoginForm data-id="ppchbegt8" data-path="pages/Login.js" />
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto text-center" data-id="whprw2rgf" data-path="pages/Login.js">
          <h3 className="text-xl font-bold text-darkBlue mb-4 font-ibm" data-id="6tsqrlgi4" data-path="pages/Login.js">Secure Training Environment</h3>
          <p className="text-gray-600" data-id="6jh7edi9t" data-path="pages/Login.js">
            ZAP Labs provides a secure platform for law enforcement professionals to 
            practice and enhance their interviewing skills in a controlled environment.
            All interactions are simulated and no real case data is used.
          </p>
        </div>
      </div>
    </div>);

}