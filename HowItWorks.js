// ZAP Labs How It Works Component

function HowItWorks() {
  const { useEffect, useRef } = React;

  const stepsRef = useRef([]);

  // Fade-in animation for steps
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10', 'opacity-0');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    stepsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      stepsRef.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Step data
  const steps = [
  {
    id: 1,
    title: "Select Scenario",
    description: "Choose from a variety of realistic suspect profiles with different characteristics and case types.",
    icon: "fa-file-alt"
  },
  {
    id: 2,
    title: "Conduct Interview",
    description: "Practice your interview techniques using voice or text with our AI-driven suspect simulation.",
    icon: "fa-comments"
  },
  {
    id: 3,
    title: "Get Evaluated",
    description: "Receive detailed feedback on your performance across key interviewing competencies.",
    icon: "fa-chart-bar"
  }];


  // Add reference to the stepsRef array
  const addToRefs = (el, index) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current[index] = el;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50" data-id="p2idg2z9g" data-path="components/HowItWorks.js">
      <div className="container mx-auto px-4 md:px-6" data-id="oufsdfhhr" data-path="components/HowItWorks.js">
        <div className="text-center mb-12 md:mb-16" data-id="9hf2418vn" data-path="components/HowItWorks.js">
          <h2 className="text-3xl md:text-4xl font-bold font-ibm text-darkBlue mb-4" data-id="b9nsakwjx" data-path="components/HowItWorks.js">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-id="bnlxltifa" data-path="components/HowItWorks.js">
            Our platform provides a structured approach to help you improve your interviewing skills in a safe and controlled environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto" data-id="lal7gmqag" data-path="components/HowItWorks.js">
          {steps.map((step, index) =>
          <div
            key={step.id}
            ref={(el) => addToRefs(el, index)}
            className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-700 ease-out opacity-0 translate-y-10"
            style={{ transitionDelay: `${index * 150}ms` }} data-id="cdquhd0ek" data-path="components/HowItWorks.js">

              <div className="w-16 h-16 bg-lightBlue bg-opacity-10 rounded-full flex items-center justify-center text-lightBlue mx-auto mb-6" data-id="yhb0wc0ba" data-path="components/HowItWorks.js">
                <i className={`fas ${step.icon} text-2xl`} data-id="8w0evtm3f" data-path="components/HowItWorks.js"></i>
              </div>
              <h3 className="text-xl font-bold font-ibm text-darkBlue mb-3" data-id="8aijjax29" data-path="components/HowItWorks.js">
                {step.title}
              </h3>
              <p className="text-gray-600" data-id="e2cgcvdm7" data-path="components/HowItWorks.js">
                {step.description}
              </p>
              <div className="mt-4 flex justify-center items-center" data-id="n08f26kcg" data-path="components/HowItWorks.js">
                <span className="flex items-center justify-center bg-darkBlue text-white w-8 h-8 rounded-full font-bold text-sm" data-id="bjnhhk23p" data-path="components/HowItWorks.js">
                  {step.id}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center" data-id="mrfvgnw6u" data-path="components/HowItWorks.js">
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto" data-id="ipkta4bm7" data-path="components/HowItWorks.js">
            Our AI-powered system provides realistic interactions and detailed feedback to help you refine your interviewing techniques.
          </p>
          <button className="bg-mediumBlue hover:bg-darkBlue text-white py-3 px-8 rounded-md font-semibold transition-colors duration-200 shadow-md hover:shadow-lg" data-id="pdozvw9mm" data-path="components/HowItWorks.js">
            Learn More
          </button>
        </div>
      </div>
    </section>);

}