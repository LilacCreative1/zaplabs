// ZAP Labs Login Form Component

function LoginForm() {
  const { useState } = React;
  const { useNavigate, useLocation } = ReactRouterDOM;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Get the page they tried to visit before being redirected to login
  const from = location.state?.from?.pathname || '/scenarios';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage('');

      const result = login(email, password);

      if (!result.success) {
        throw new Error(result.error || 'Invalid credentials');
      }

      // Dispatch login event
      window.dispatchEvent(new Event('login'));

      // Redirect to the page they tried to visit or default to scenarios
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md" data-id="xicj5zc6a" data-path="components/LoginForm.js">
      <div className="text-center mb-8" data-id="wsvgzqwl9" data-path="components/LoginForm.js">
        <div className="w-16 h-16 bg-zapYellow rounded-full flex items-center justify-center mx-auto mb-4" data-id="v48jniomt" data-path="components/LoginForm.js">
          <span className="text-darkBlue font-bold text-2xl" data-id="bdecwpo3j" data-path="components/LoginForm.js">ZAP</span>
        </div>
        <h2 className="text-2xl font-bold text-darkBlue font-ibm" data-id="mx4n5gcan" data-path="components/LoginForm.js">Login to ZAP Labs</h2>
        <p className="text-gray-600 mt-2" data-id="g13zvrtqh" data-path="components/LoginForm.js">Enter your credentials to access the platform</p>
      </div>
      
      {errorMessage &&
      <div className="bg-red-50 text-red-800 rounded-md p-4 mb-6" data-id="6322sopqm" data-path="components/LoginForm.js">
          <div className="flex" data-id="rre761t90" data-path="components/LoginForm.js">
            <i className="fas fa-exclamation-circle text-red-500 mr-3 mt-1" data-id="pkamajuol" data-path="components/LoginForm.js"></i>
            <span data-id="vy8u27y4s" data-path="components/LoginForm.js">{errorMessage}</span>
          </div>
        </div>
      }
      
      <form onSubmit={handleSubmit} data-id="t6tqxxkpk" data-path="components/LoginForm.js">
        <div className="mb-6" data-id="f58a17m1k" data-path="components/LoginForm.js">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2" data-id="1w9xj6wew" data-path="components/LoginForm.js">
            Email Address
          </label>
          <div className="relative" data-id="4qhngscvf" data-path="components/LoginForm.js">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-id="f9qh0i4n7" data-path="components/LoginForm.js">
              <i className="fas fa-envelope text-gray-400" data-id="xz4zfyvpi" data-path="components/LoginForm.js"></i>
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control w-full py-3 pl-10 pr-4 rounded-md border border-gray-300 focus:border-mediumBlue focus:ring focus:ring-mediumBlue focus:ring-opacity-20"
              placeholder="your@email.com"
              disabled={isLoading}
              required data-id="jocx1nqi1" data-path="components/LoginForm.js" />

          </div>
        </div>
        
        <div className="mb-6" data-id="5dmfhvdl8" data-path="components/LoginForm.js">
          <div className="flex justify-between items-center mb-2" data-id="8olgn60th" data-path="components/LoginForm.js">
            <label htmlFor="password" className="block text-gray-700 font-medium" data-id="bnbn6zsju" data-path="components/LoginForm.js">
              Password
            </label>
            <a href="#" className="text-sm text-mediumBlue hover:text-darkBlue" data-id="6eiglksem" data-path="components/LoginForm.js">
              Forgot Password?
            </a>
          </div>
          <div className="relative" data-id="1dozbxt2q" data-path="components/LoginForm.js">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" data-id="md9d0n1ux" data-path="components/LoginForm.js">
              <i className="fas fa-lock text-gray-400" data-id="qwy6dfu61" data-path="components/LoginForm.js"></i>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control w-full py-3 pl-10 pr-4 rounded-md border border-gray-300 focus:border-mediumBlue focus:ring focus:ring-mediumBlue focus:ring-opacity-20"
              placeholder="••••••••"
              disabled={isLoading}
              required data-id="qjn10afoy" data-path="components/LoginForm.js" />

          </div>
          <p className="text-xs text-gray-500 mt-2" data-id="nymeg9wqh" data-path="components/LoginForm.js">
            For demo, use: demo@zaplabs.org / secure123
          </p>
        </div>
        
        <div className="mb-6" data-id="iv9pmclyw" data-path="components/LoginForm.js">
          <div className="flex items-center" data-id="viohjxyv4" data-path="components/LoginForm.js">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-mediumBlue focus:ring-mediumBlue border-gray-300 rounded" data-id="v6dyrtsp6" data-path="components/LoginForm.js" />

            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700" data-id="4cs80471c" data-path="components/LoginForm.js">
              Remember me
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-darkBlue hover:bg-mediumBlue text-white py-3 px-4 rounded-md font-medium transition-colors duration-200 flex justify-center items-center" data-id="36r53tmxv" data-path="components/LoginForm.js">

          {isLoading ?
          <>
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3" data-id="qhkisu8hb" data-path="components/LoginForm.js"></span>
              Logging in...
            </> :

          'Login to Platform'
          }
        </button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200 text-center" data-id="t0a24qhn5" data-path="components/LoginForm.js">
        <p className="text-gray-600 text-sm" data-id="b00s6ntut" data-path="components/LoginForm.js">
          Don't have an account? <a href="#" className="text-mediumBlue hover:text-darkBlue font-medium" data-id="kooxzzmmy" data-path="components/LoginForm.js">Contact your administrator</a>
        </p>
      </div>
    </div>);

}