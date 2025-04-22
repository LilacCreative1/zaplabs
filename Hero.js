// ZAP Labs Hero Component

function Hero() {
  const { useEffect, useRef } = React;
  const { Link } = ReactRouterDOM;

  const heroRef = useRef(null);

  // Subtle animation effect for the hero section
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-4', 'opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(heroRef.current);

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-darkBlue to-mediumBlue text-white pt-32 pb-16 md:pt-40 md:pb-20" data-id="xfftnbap0" data-path="components/Hero.js">
      <div className="container mx-auto px-4 md:px-6" data-id="i0x3ukbbf" data-path="components/Hero.js">
        <div
          ref={heroRef}
          className="max-w-4xl mx-auto text-center transition-all duration-1000 ease-out transform translate-y-4 opacity-0" data-id="3ipr44gs3" data-path="components/Hero.js">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-ibm leading-tight mb-6" data-id="k0q4iujfj" data-path="components/Hero.js">
            Practice with Purpose.
            <br className="hidden md:block" data-id="xgv5hca6h" data-path="components/Hero.js" /> 
            Train with Precision.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto" data-id="mev8thpcr" data-path="components/Hero.js">
            Simulated suspect interviews for law enforcement training.
            <br className="hidden md:block" data-id="nb4vk12wr" data-path="components/Hero.js" /> 
            Powered by AI. Backed by Zero Abuse Project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="y1aq7jp6w" data-path="components/Hero.js">
            <Link
              to="/login"
              className="btn-accent py-3 px-8 rounded-md font-bold text-lg shadow-lg hover:shadow-xl" data-id="341ufu9gv" data-path="components/Hero.js">

              Start Training
            </Link>
            <Link
              to="/scenarios"
              className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-md font-bold text-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200" data-id="xklfg2d75" data-path="components/Hero.js">

              Browse Scenarios
            </Link>
          </div>
          
          <div className="mt-12 flex justify-center items-center" data-id="zlz8ibxgg" data-path="components/Hero.js">
            <div className="py-2 px-4 bg-lightBlue bg-opacity-20 rounded-full text-sm flex items-center" data-id="yhz1t3qm6" data-path="components/Hero.js">
              <i className="fas fa-shield-alt mr-2" data-id="l6mkvlslh" data-path="components/Hero.js"></i>
              <span data-id="05vq2nwpc" data-path="components/Hero.js">Secure &amp; confidential platform for law enforcement training</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave SVG Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden" data-id="os8jn1319" data-path="components/Hero.js">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 sm:h-16 md:h-20" data-id="xi2b7nldw" data-path="components/Hero.js">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="#f8fafc" data-id="mf1imla0i" data-path="components/Hero.js">
          </path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="#f8fafc" data-id="2bmzbzl0d" data-path="components/Hero.js">
          </path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="#f8fafc" data-id="q0oh0iluj" data-path="components/Hero.js">
          </path>
        </svg>
      </div>
    </section>);

}