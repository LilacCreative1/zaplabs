// ZAP Labs Home Page

function Home() {
  const { useEffect } = React;

  // Set page title
  useEffect(() => {
    document.title = 'ZAP Labs - AI-Powered Interview Simulation';
  }, []);

  return (
    <div className="min-h-screen" data-id="yudhsgtsl" data-path="pages/Home.js">
      <Hero data-id="7tczpl48j" data-path="pages/Home.js" />
      <HowItWorks data-id="wt3hh3f7g" data-path="pages/Home.js" />
      <InterfaceDemo data-id="e5gdhf7k2" data-path="pages/Home.js" />
      <VisualExamples data-id="h3jmn5d9s" data-path="pages/Home.js" />
      <FeaturedScenarios data-id="teqy0joo8" data-path="pages/Home.js" />
      <AboutSection data-id="9xhp96ff1" data-path="pages/Home.js" />
    </div>);

}