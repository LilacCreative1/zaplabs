// ZAP Labs About Section Component

function AboutSection() {
  const { useRef, useEffect } = React;

  const sectionRef = useRef(null);

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

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50 transition-all duration-1000 ease-out transform translate-y-10 opacity-0" data-id="u9bnzhut4" data-path="components/AboutSection.js">

      <div className="container mx-auto px-4 md:px-6" data-id="52mlzg798" data-path="components/AboutSection.js">
        <div className="max-w-6xl mx-auto" data-id="jbju02rgy" data-path="components/AboutSection.js">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center" data-id="jbwq2398i" data-path="components/AboutSection.js">
            <div data-id="vmy0042tg" data-path="components/AboutSection.js">
              <h2 className="text-3xl md:text-4xl font-bold font-ibm text-darkBlue mb-6" data-id="sjiwhnf0q" data-path="components/AboutSection.js">
                About ZAP Labs
              </h2>
              
              <p className="text-gray-700 mb-4" data-id="q9eh1849x" data-path="components/AboutSection.js">
                ZAP Labs is an innovative AI-powered suspect interview simulation and evaluation tool developed by the Zero Abuse Project. Our mission is to help Internet Crimes Against Children (ICAC) investigators practice and refine their interview techniques in a safe, controlled environment.
              </p>
              
              <p className="text-gray-700 mb-4" data-id="bjzzpee7p" data-path="components/AboutSection.js">
                Using cutting-edge artificial intelligence, we've created realistic AI personas based on carefully crafted fictional suspect profiles. These simulations allow law enforcement professionals to hone their skills without the pressure of a real interview situation.
              </p>
              
              <p className="text-gray-700 mb-6" data-id="vw23r9zuo" data-path="components/AboutSection.js">
                Our platform is designed with a trauma-informed approach, ensuring that all content is professional, respectful, and focused on improving investigative outcomes while maintaining the highest ethical standards.
              </p>
              
              <div className="flex flex-wrap gap-4" data-id="24cbxwx2j" data-path="components/AboutSection.js">
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center flex-1 min-w-[180px]" data-id="i993eqc5a" data-path="components/AboutSection.js">
                  <i className="fas fa-shield-alt text-2xl text-mediumBlue mr-3" data-id="9176wyfly" data-path="components/AboutSection.js"></i>
                  <div data-id="yfmfu13eo" data-path="components/AboutSection.js">
                    <h4 className="font-bold text-darkBlue" data-id="49s4pwyja" data-path="components/AboutSection.js">Secure Platform</h4>
                    <p className="text-sm text-gray-600" data-id="yaf6lxj3l" data-path="components/AboutSection.js">End-to-end encryption</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4 flex items-center flex-1 min-w-[180px]" data-id="lbh6je8z9" data-path="components/AboutSection.js">
                  <i className="fas fa-brain text-2xl text-mediumBlue mr-3" data-id="fe9dzhrgz" data-path="components/AboutSection.js"></i>
                  <div data-id="i9aka3tqh" data-path="components/AboutSection.js">
                    <h4 className="font-bold text-darkBlue" data-id="7q08c96qo" data-path="components/AboutSection.js">Advanced AI</h4>
                    <p className="text-sm text-gray-600" data-id="uhkemr6eu" data-path="components/AboutSection.js">Realistic interactions</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative" data-id="w7dx47rzo" data-path="components/AboutSection.js">
              <div className="bg-darkBlue rounded-lg p-8 shadow-xl" data-id="qapi8zvc7" data-path="components/AboutSection.js">
                <h3 className="text-2xl font-bold text-white mb-4 font-ibm" data-id="n7zyneytx" data-path="components/AboutSection.js">
                  Our Impact
                </h3>
                
                <div className="space-y-6" data-id="3nz74a177" data-path="components/AboutSection.js">
                  <div data-id="re28nj0s6" data-path="components/AboutSection.js">
                    <div className="flex justify-between items-center mb-2" data-id="7xieijxbs" data-path="components/AboutSection.js">
                      <h4 className="text-zapYellow font-bold" data-id="ghb2d6v2b" data-path="components/AboutSection.js">Improved Interview Skills</h4>
                      <span className="text-lightBlue" data-id="m7h36eket" data-path="components/AboutSection.js">92%</span>
                    </div>
                    <div className="progress-bar" data-id="ey8c1t5or" data-path="components/AboutSection.js">
                      <div className="progress-bar-fill" style={{ width: '92%', backgroundColor: '#ffdd00' }} data-id="zmhi96q8h" data-path="components/AboutSection.js"></div>
                    </div>
                  </div>
                  
                  <div data-id="fecrb7fva" data-path="components/AboutSection.js">
                    <div className="flex justify-between items-center mb-2" data-id="vlz7i325v" data-path="components/AboutSection.js">
                      <h4 className="text-zapYellow font-bold" data-id="xdslde1k9" data-path="components/AboutSection.js">Investigator Confidence</h4>
                      <span className="text-lightBlue" data-id="ogm0xv1in" data-path="components/AboutSection.js">87%</span>
                    </div>
                    <div className="progress-bar" data-id="vhbkqdmue" data-path="components/AboutSection.js">
                      <div className="progress-bar-fill" style={{ width: '87%', backgroundColor: '#ffdd00' }} data-id="omhm6gkic" data-path="components/AboutSection.js"></div>
                    </div>
                  </div>
                  
                  <div data-id="xz6b91jvg" data-path="components/AboutSection.js">
                    <div className="flex justify-between items-center mb-2" data-id="9pngbewd3" data-path="components/AboutSection.js">
                      <h4 className="text-zapYellow font-bold" data-id="0hiijm6ky" data-path="components/AboutSection.js">Training Effectiveness</h4>
                      <span className="text-lightBlue" data-id="bgox291bb" data-path="components/AboutSection.js">95%</span>
                    </div>
                    <div className="progress-bar" data-id="dhaql1mje" data-path="components/AboutSection.js">
                      <div className="progress-bar-fill" style={{ width: '95%', backgroundColor: '#ffdd00' }} data-id="8ch6ggw2w" data-path="components/AboutSection.js"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-blue-700" data-id="em1r55dht" data-path="components/AboutSection.js">
                  <blockquote className="text-gray-200 italic" data-id="liwe8wuc1" data-path="components/AboutSection.js">
                    "ZAP Labs has revolutionized how we train our investigators, providing realistic practice that translates directly to improved field performance."
                  </blockquote>
                  <div className="mt-4 flex items-center" data-id="d6m7363ww" data-path="components/AboutSection.js">
                    <div className="w-10 h-10 bg-lightBlue rounded-full flex items-center justify-center" data-id="1bgo4zwih" data-path="components/AboutSection.js">
                      <span className="text-white font-bold" data-id="3jmm7v4bp" data-path="components/AboutSection.js">JD</span>
                    </div>
                    <div className="ml-3" data-id="t1wvm5b1z" data-path="components/AboutSection.js">
                      <p className="text-white font-medium" data-id="omgl24k4y" data-path="components/AboutSection.js">John Doe</p>
                      <p className="text-gray-300 text-sm" data-id="gd1zutjxg" data-path="components/AboutSection.js">Training Director, ICAC Task Force</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-zapYellow rounded-lg z-0" data-id="lnf9k3n6n" data-path="components/AboutSection.js"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-lightBlue rounded-lg z-0" data-id="elhmmq65z" data-path="components/AboutSection.js"></div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}