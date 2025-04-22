// ZAP Labs Navbar Component

function Navbar({ isAuthenticated }) {
  const { useState, useEffect } = React;
  const { Link, NavLink, useLocation, useNavigate } = ReactRouterDOM;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    // Dispatch logout event
    window.dispatchEvent(new Event('logout'));
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-darkBlue shadow-lg py-2' : 'bg-darkBlue bg-opacity-90 py-4'}`} data-id="3a56ib1dg" data-path="components/Navbar.js">
      <div className="container mx-auto px-4 md:px-6" data-id="y5ktbl3ks" data-path="components/Navbar.js">
        <div className="flex justify-between items-center" data-id="zk9yu4kdx" data-path="components/Navbar.js">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-id="p9rxld5yt" data-path="components/Navbar.js">
            <div className="w-10 h-10 bg-zapYellow rounded-full flex items-center justify-center mr-2" data-id="ia6y25eqr" data-path="components/Navbar.js">
              <span className="text-darkBlue font-bold text-lg" data-id="2s2vpsvur" data-path="components/Navbar.js">ZAP</span>
            </div>
            <span className="text-white font-ibm font-bold text-xl hidden sm:inline-block" data-id="roptlh13t" data-path="components/Navbar.js">ZAP Labs</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8" data-id="cp0hjfzt0" data-path="components/Navbar.js">
            <NavLink to="/" className="nav-link text-white hover:text-zapYellow transition-colors duration-200 font-medium" data-id="suevccwcn" data-path="components/Navbar.js">
              Home
            </NavLink>
            
            {isAuthenticated &&
            <>
                <NavLink to="/scenarios" className="nav-link text-white hover:text-zapYellow transition-colors duration-200 font-medium" data-id="73vuka9ia" data-path="components/Navbar.js">
                  Scenarios
                </NavLink>
                <NavLink to="/evaluation" className="nav-link text-white hover:text-zapYellow transition-colors duration-200 font-medium" data-id="yt71frh94" data-path="components/Navbar.js">
                  Evaluation
                </NavLink>
                <NavLink to="/progress" className="nav-link text-white hover:text-zapYellow transition-colors duration-200 font-medium" data-id="ugapwutn2" data-path="components/Navbar.js">
                  My Progress
                </NavLink>
                <NavLink to="/resources" className="nav-link text-white hover:text-zapYellow transition-colors duration-200 font-medium" data-id="fz1o8he9q" data-path="components/Navbar.js">
                  Resources
                </NavLink>

                <NavLink to="/admin/settings" className="nav-link text-white hover:text-zapYellow transition-colors duration-200 font-medium" data-id="pympz7p7a" data-path="components/Navbar.js">
                  <i className="fas fa-cog mr-1" data-id="55op0iauj" data-path="components/Navbar.js"></i> Admin
                </NavLink>
              </>
            }
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4" data-id="dognsx7tz" data-path="components/Navbar.js">
            {isAuthenticated ?
            <button
              onClick={handleLogout}
              className="bg-transparent border border-zapYellow text-zapYellow hover:bg-zapYellow hover:text-darkBlue transition-colors duration-200 py-2 px-4 rounded-md font-medium" data-id="oirk41jin" data-path="components/Navbar.js">

                Logout
              </button> :

            <Link
              to="/login"
              className="bg-zapYellow text-darkBlue hover:bg-opacity-90 transition-colors duration-200 py-2 px-4 rounded-md font-medium" data-id="hbsxde6nu" data-path="components/Navbar.js">

                Login
              </Link>
            }
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu" data-id="gif57fsn1" data-path="components/Navbar.js">

            {isMenuOpen ?
            <i className="fas fa-times text-xl" data-id="c4uj7zylz" data-path="components/Navbar.js"></i> :

            <i className="fas fa-bars text-xl" data-id="dlj77tzlc" data-path="components/Navbar.js"></i>
            }
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 pt-4' : 'max-h-0'}`} data-id="ks4uwdd92" data-path="components/Navbar.js">
          <div className="flex flex-col space-y-3 pb-4" data-id="3p5rtr4g1" data-path="components/Navbar.js">
            <NavLink
              to="/"
              className="text-white hover:text-zapYellow transition-colors duration-200 py-2 font-medium" data-id="4pcxw0wrg" data-path="components/Navbar.js">

              Home
            </NavLink>
            
            {isAuthenticated &&
            <>
                <NavLink
                to="/scenarios"
                className="text-white hover:text-zapYellow transition-colors duration-200 py-2 font-medium" data-id="e0fmtcen0" data-path="components/Navbar.js">

                  Scenarios
                </NavLink>
                <NavLink
                to="/evaluation"
                className="text-white hover:text-zapYellow transition-colors duration-200 py-2 font-medium" data-id="oui3wr4gl" data-path="components/Navbar.js">

                  Evaluation
                </NavLink>
                <NavLink
                to="/progress"
                className="text-white hover:text-zapYellow transition-colors duration-200 py-2 font-medium" data-id="kg7bdpw8w" data-path="components/Navbar.js">

                  My Progress
                </NavLink>
                <NavLink
                to="/resources"
                className="text-white hover:text-zapYellow transition-colors duration-200 py-2 font-medium" data-id="5i1mw6jb3" data-path="components/Navbar.js">

                  Resources
                </NavLink>

                <NavLink
                to="/admin/settings"
                className="text-white hover:text-zapYellow transition-colors duration-200 py-2 font-medium" data-id="pderl7igz" data-path="components/Navbar.js">
                  <i className="fas fa-cog mr-1" data-id="0yy2edhu3" data-path="components/Navbar.js"></i> Admin Settings
                </NavLink>
              </>
            }
            
            {isAuthenticated ?
            <button
              onClick={handleLogout}
              className="bg-transparent border border-zapYellow text-zapYellow hover:bg-zapYellow hover:text-darkBlue transition-colors duration-200 py-2 px-4 rounded-md font-medium text-left" data-id="d8sr4qqua" data-path="components/Navbar.js">

                Logout
              </button> :

            <Link
              to="/login"
              className="bg-zapYellow text-darkBlue hover:bg-opacity-90 transition-colors duration-200 py-2 px-4 rounded-md font-medium inline-block" data-id="8y1t7e2mt" data-path="components/Navbar.js">

                Login
              </Link>
            }
          </div>
        </div>
      </div>
    </nav>);

}