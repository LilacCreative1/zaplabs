// ZAP Labs Evaluation Form Component

function EvaluationForm({ scenarioId, interviewData, onComplete }) {
  const { useState, useEffect } = React;

  const [isLoading, setIsLoading] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

  // Submit for evaluation
  useEffect(() => {
    const submitForEval = async () => {
      if (!scenarioId || !interviewData || interviewData.length === 0) {
        setError('No interview data available to evaluate');
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const { success, data, error } = await submitForEvaluation(scenarioId, interviewData);

        if (!success) throw new Error(error || 'Failed to evaluate interview');

        setEvaluation(data);
      } catch (err) {
        console.error('Evaluation error:', err);
        setError(err.message || 'An error occurred during evaluation');
      } finally {
        setIsLoading(false);
      }
    };

    submitForEval();
  }, [scenarioId, interviewData]);

  // Handle export PDF
  const handleExportPDF = async () => {
    if (!evaluation) return;

    try {
      setExportLoading(true);
      await exportPDFReport(evaluation);

      // In a real app, this would trigger file download
      // For demo purposes, show success message
      alert('PDF report downloaded successfully');
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export PDF: ' + error.message);
    } finally {
      setExportLoading(false);
    }
  };

  // Handle complete evaluation
  const handleComplete = () => {
    // Update user progress
    updateUserProgress(scenarioId);

    if (typeof onComplete === 'function') {
      onComplete(evaluation);
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-full" data-id="9a9i46co2" data-path="components/EvaluationForm.js">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-mediumBlue mb-4" data-id="dp3ccg5je" data-path="components/EvaluationForm.js"></div>
        <h3 className="text-xl font-semibold text-darkBlue mb-2" data-id="qp49m9917" data-path="components/EvaluationForm.js">Analyzing Interview</h3>
        <p className="text-gray-600 max-w-md text-center" data-id="kjmi6xihr" data-path="components/EvaluationForm.js">
          Our AI is evaluating your interview performance against key criteria. This may take a moment...
        </p>
      </div>);

  }

  // Render error state
  if (error) {
    return (
      <div className="text-center p-8" data-id="4hhkw12dq" data-path="components/EvaluationForm.js">
        <div className="text-red-500 mb-4" data-id="6e30n8kkx" data-path="components/EvaluationForm.js">
          <i className="fas fa-exclamation-triangle text-4xl" data-id="3mai31ydi" data-path="components/EvaluationForm.js"></i>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2" data-id="p2q28q5oc" data-path="components/EvaluationForm.js">Evaluation Error</h3>
        <p className="text-gray-600 mb-4" data-id="9jhb21ula" data-path="components/EvaluationForm.js">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="tnsxgsku4" data-path="components/EvaluationForm.js">

          Try Again
        </button>
      </div>);

  }

  // Render evaluation results
  if (evaluation) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden" data-id="z1gseho32" data-path="components/EvaluationForm.js">
        {/* Evaluation Header */}
        <div className="bg-darkBlue text-white p-6" data-id="2u0mddem6" data-path="components/EvaluationForm.js">
          <div className="flex items-center justify-between" data-id="qkhds5n0c" data-path="components/EvaluationForm.js">
            <h2 className="text-2xl font-bold font-ibm" data-id="k8n3pg5rn" data-path="components/EvaluationForm.js">Interview Evaluation</h2>
            <div className="flex items-center" data-id="hwwdizf4w" data-path="components/EvaluationForm.js">
              <div className="text-3xl font-bold mr-2" data-id="q3rnxyorp" data-path="components/EvaluationForm.js">{evaluation.overallScore}</div>
              <div className="text-xs uppercase" data-id="vwexwd7ph" data-path="components/EvaluationForm.js">
                Overall Score
                <div className="text-2xl font-bold text-zapYellow" data-id="k6ow6wslk" data-path="components/EvaluationForm.js">
                  {scoreToGrade(evaluation.overallScore)}
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-300 mt-1" data-id="dnwjn18xd" data-path="components/EvaluationForm.js">
            Evaluation completed {formatDateTime(evaluation.timestamp)}
          </p>
        </div>
        
        {/* Results Grid */}
        <div className="p-6" data-id="i84br8am9" data-path="components/EvaluationForm.js">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-id="4sipbu3g3" data-path="components/EvaluationForm.js">
            {Object.values(evaluation.evaluationResults).map((result) =>
            <div key={result.criterionName} className="bg-gray-50 rounded-lg p-4 shadow" data-id="517rg4287" data-path="components/EvaluationForm.js">
                <div className="flex justify-between items-center mb-2" data-id="h91qlmc3f" data-path="components/EvaluationForm.js">
                  <h3 className="font-bold text-darkBlue" data-id="i3c5nd1vm" data-path="components/EvaluationForm.js">{result.criterionName}</h3>
                  <div className={`text-lg font-bold ${
                result.score >= 90 ? 'text-green-500' :
                result.score >= 80 ? 'text-blue-500' :
                result.score >= 70 ? 'text-yellow-500' :
                'text-red-500'}`
                } data-id="3vlq8lfgt" data-path="components/EvaluationForm.js">
                    {result.score}/100
                  </div>
                </div>
                
                <div className="mb-3" data-id="ofgldisnm" data-path="components/EvaluationForm.js">
                  <div className="progress-bar" data-id="kxcbepvkk" data-path="components/EvaluationForm.js">
                    <div
                    className="progress-bar-fill"
                    style={{
                      width: `${result.score}%`,
                      backgroundColor: result.score >= 90 ? '#10b981' :
                      result.score >= 80 ? '#3b82f6' :
                      result.score >= 70 ? '#f59e0b' :
                      '#ef4444'
                    }} data-id="yy1b9bv9u" data-path="components/EvaluationForm.js">
                  </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm" data-id="muypwtyxo" data-path="components/EvaluationForm.js">{result.feedback}</p>
              </div>
            )}
          </div>
          
          {/* Summary */}
          <div className="mt-8 bg-gray-50 p-5 rounded-lg border border-gray-200" data-id="0y4ydel23" data-path="components/EvaluationForm.js">
            <h3 className="text-lg font-bold text-darkBlue mb-3" data-id="5b49gqak1" data-path="components/EvaluationForm.js">Summary</h3>
            <p className="text-gray-700 mb-4" data-id="72cx0lztr" data-path="components/EvaluationForm.js">
              Based on the analysis of your interview, your overall performance scored <strong data-id="epdzis861" data-path="components/EvaluationForm.js">{evaluation.overallScore}/100</strong>, 
              placing you in the <strong data-id="l59g4a9u9" data-path="components/EvaluationForm.js">{scoreToGrade(evaluation.overallScore)}</strong> grade category. 
              {evaluation.overallScore >= 90 ?
              ' Your interview demonstrated excellent technique and approach.' :
              evaluation.overallScore >= 80 ?
              ' Your interview showed strong competency with some areas for improvement.' :
              evaluation.overallScore >= 70 ?
              ' Your interview was satisfactory with several areas needing further development.' :
              ' Your interview requires significant improvement in multiple key areas.'}
            </p>
            <p className="text-gray-700" data-id="dywl17u2p" data-path="components/EvaluationForm.js">
              Continue practicing different scenarios to further improve your skills.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4" data-id="249yw3fbq" data-path="components/EvaluationForm.js">
            <button
              onClick={handleExportPDF}
              disabled={exportLoading}
              className="bg-white border border-darkBlue text-darkBlue hover:bg-gray-50 py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center" data-id="1h1glzmeq" data-path="components/EvaluationForm.js">

              {exportLoading ?
              <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-darkBlue mr-2" data-id="otq0x7a9l" data-path="components/EvaluationForm.js"></span>
                  Exporting...
                </> :

              <>
                  <i className="fas fa-file-pdf mr-2" data-id="z3q8oimwg" data-path="components/EvaluationForm.js"></i>
                  Export PDF Report
                </>
              }
            </button>
            
            <button
              onClick={handleComplete}
              className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded-md font-medium transition-colors duration-200" data-id="p8ddl65s7" data-path="components/EvaluationForm.js">

              Complete Evaluation
            </button>
          </div>
        </div>
      </div>);

  }

  // Default state (should not reach here)
  return null;
}