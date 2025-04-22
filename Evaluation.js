// ZAP Labs Evaluation Page

function Evaluation() {
  const { useState, useEffect } = React;
  const { Link } = ReactRouterDOM;

  const [isLoading, setIsLoading] = useState(true);
  const [evaluationCriteria, setEvaluationCriteria] = useState([]);

  // Set page title
  useEffect(() => {
    document.title = 'Evaluation Criteria - ZAP Labs';

    // Fetch evaluation criteria (mock data)
    const fetchCriteria = async () => {
      try {
        setIsLoading(true);

        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 800));

        setEvaluationCriteria([
        {
          id: 1,
          name: "Rapport Building",
          description: "Effectiveness in establishing trust and open communication with the subject.",
          details: [
          "Creates a non-threatening environment",
          "Uses appropriate tone and body language",
          "Demonstrates active listening",
          "Shows appropriate empathy without compromising objectivity"]

        },
        {
          id: 2,
          name: "Question Structure",
          description: "Use of appropriate question types and sequencing to elicit information.",
          details: [
          "Uses open-ended questions effectively",
          "Avoids leading questions",
          "Properly sequences questions to build on information",
          "Adapts questioning based on subject responses"]

        },
        {
          id: 3,
          name: "Active Listening",
          description: "Demonstration of attention to subject responses and appropriate follow-up.",
          details: [
          "Shows full attention to subject's responses",
          "Follows up on inconsistencies or gaps",
          "Captures key details without interrupting flow",
          "Correctly interprets verbal and non-verbal cues"]

        },
        {
          id: 4,
          name: "Evidence Integration",
          description: "Strategic use of available evidence during the interview process.",
          details: [
          "Times evidence presentation for maximum effectiveness",
          "Accurately references evidence in questioning",
          "Uses evidence to challenge inconsistencies",
          "Maintains evidence integrity throughout interview"]

        },
        {
          id: 5,
          name: "Legal Compliance",
          description: "Adherence to legal requirements and proper procedure.",
          details: [
          "Follows all procedural requirements",
          "Provides appropriate advisements when needed",
          "Respects subject rights throughout the process",
          "Documents interview properly for evidentiary purposes"]

        },
        {
          id: 6,
          name: "Deception Detection",
          description: "Recognition of inconsistencies and deceptive behavior patterns.",
          details: [
          "Identifies verbal and non-verbal indicators of deception",
          "Recognizes inconsistencies in subject's account",
          "Uses effective techniques to address suspected deception",
          "Differentiates between deception and other behaviors (e.g., anxiety)"]

        }]
        );
      } catch (error) {
        console.error('Error fetching evaluation criteria:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCriteria();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50" data-id="bnwp4pghi" data-path="pages/Evaluation.js">
      <div className="container mx-auto px-4" data-id="0e1vt55us" data-path="pages/Evaluation.js">
        <div className="max-w-5xl mx-auto" data-id="9oe4vdsja" data-path="pages/Evaluation.js">
          <h1 className="text-3xl font-bold text-darkBlue mb-6 font-ibm" data-id="fen6deyv7" data-path="pages/Evaluation.js">Evaluation Framework</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-id="rlkkx0p0z" data-path="pages/Evaluation.js">
            <h2 className="text-xl font-bold text-darkBlue mb-4" data-id="dvfgsf18l" data-path="pages/Evaluation.js">How You're Evaluated</h2>
            <p className="text-gray-700 mb-4" data-id="pan5j22p9" data-path="pages/Evaluation.js">
              After each interview simulation, ZAP Labs provides a comprehensive evaluation of your performance 
              across six key competency areas. Our AI analysis examines your interaction techniques, 
              question patterns, and response handling to provide actionable feedback.
            </p>
            <p className="text-gray-700 mb-4" data-id="srr7f08f6" data-path="pages/Evaluation.js">
              Your performance in each area is scored on a scale of 0-100, with detailed feedback on strengths 
              and areas for improvement. These scores are tracked over time to show your progress as you 
              complete more interview simulations.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4" data-id="f0kez93sz" data-path="pages/Evaluation.js">
              <div className="flex" data-id="nuk3zpges" data-path="pages/Evaluation.js">
                <div className="flex-shrink-0" data-id="n77eiw5av" data-path="pages/Evaluation.js">
                  <i className="fas fa-lightbulb text-yellow-500" data-id="etnqjjzkj" data-path="pages/Evaluation.js"></i>
                </div>
                <div className="ml-3" data-id="he5u7z0fe" data-path="pages/Evaluation.js">
                  <p className="text-sm text-yellow-700" data-id="qw1cxznvd" data-path="pages/Evaluation.js">
                    <strong className="font-medium" data-id="aoe0duiy9" data-path="pages/Evaluation.js">Tip:</strong> Focus on one or two key areas for improvement 
                    at a time. Each scenario is designed to challenge different aspects of your interviewing skills.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {isLoading ?
          <div className="flex justify-center items-center py-12" data-id="rjjelqhaq" data-path="pages/Evaluation.js">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mediumBlue" data-id="gr2cptej7" data-path="pages/Evaluation.js"></div>
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-id="a5t6pobj0" data-path="pages/Evaluation.js">
              {evaluationCriteria.map((criterion) =>
            <div key={criterion.id} className="bg-white rounded-lg shadow-md p-6" data-id="p88ux2jal" data-path="pages/Evaluation.js">
                  <div className="flex items-center mb-4" data-id="jdiduztpp" data-path="pages/Evaluation.js">
                    <div className="w-10 h-10 rounded-full bg-lightBlue bg-opacity-20 flex items-center justify-center mr-4" data-id="m63tqto3z" data-path="pages/Evaluation.js">
                      <span className="text-lg font-bold text-lightBlue" data-id="ipbebi679" data-path="pages/Evaluation.js">{criterion.id}</span>
                    </div>
                    <h3 className="text-xl font-bold text-darkBlue" data-id="6vxatwfyj" data-path="pages/Evaluation.js">{criterion.name}</h3>
                  </div>
                  <p className="text-gray-700 mb-4" data-id="j2cfw1qms" data-path="pages/Evaluation.js">{criterion.description}</p>
                  <div data-id="95uxcud0r" data-path="pages/Evaluation.js">
                    <h4 className="font-medium text-gray-800 mb-2" data-id="qr9yjk730" data-path="pages/Evaluation.js">Key Components:</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1" data-id="8u2dvlov6" data-path="pages/Evaluation.js">
                      {criterion.details.map((detail, index) =>
                  <li key={index} data-id="euoqjs3jw" data-path="pages/Evaluation.js">{detail}</li>
                  )}
                    </ul>
                  </div>
                </div>
            )}
            </div>
          }
          
          <div className="text-center" data-id="y0xzgrl7n" data-path="pages/Evaluation.js">
            <Link
              to="/scenarios"
              className="bg-mediumBlue hover:bg-darkBlue text-white py-3 px-8 rounded-md font-semibold transition-colors duration-200 inline-block shadow-md hover:shadow-lg" data-id="k67f4tv9p" data-path="pages/Evaluation.js">

              Practice Interviews
            </Link>
          </div>
        </div>
      </div>
    </div>);

}