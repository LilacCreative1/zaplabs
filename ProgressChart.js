// ZAP Labs Progress Chart Component

function ProgressChart() {
  const { useState, useEffect, useRef } = React;

  const [user, setUser] = useState(null);
  const chartCanvasRef = useRef(null);
  const chartInstance = useRef(null);

  // Load user data
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Create simple bar chart
  useEffect(() => {
    if (!user || !chartCanvasRef.current) return;

    // Basic chart drawing with canvas
    const drawChart = () => {
      const canvas = chartCanvasRef.current;
      const ctx = canvas.getContext('2d');

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Chart dimensions
      const chartHeight = canvas.height - 60;
      const chartWidth = canvas.width - 60;
      const barWidth = 40;

      // Mock skill data (in a real app, this would come from evaluations)
      const skills = [
      { name: 'Rapport', score: 85 },
      { name: 'Questions', score: 72 },
      { name: 'Listening', score: 90 },
      { name: 'Evidence', score: 65 },
      { name: 'Legal', score: 78 },
      { name: 'Deception', score: 82 }];


      const barSpacing = chartWidth / skills.length;

      // Draw background grid
      ctx.beginPath();
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let i = 0; i <= 10; i++) {
        const y = 30 + chartHeight - i * chartHeight / 10;
        ctx.moveTo(30, y);
        ctx.lineTo(30 + chartWidth, y);
      }

      ctx.stroke();

      // Draw bars
      skills.forEach((skill, index) => {
        const barHeight = skill.score / 100 * chartHeight;
        const x = 30 + index * barSpacing + barSpacing / 2 - barWidth / 2;
        const y = 30 + chartHeight - barHeight;

        // Bar gradient
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, '#00a1d8');
        gradient.addColorStop(1, '#0065a1');

        // Draw bar
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);

        // Draw score text
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(skill.score, x + barWidth / 2, y - 10);

        // Draw skill name
        ctx.fillStyle = '#4b5563';
        ctx.font = '12px Inter, sans-serif';
        ctx.fillText(skill.name, x + barWidth / 2, 30 + chartHeight + 20);
      });

      // Draw scale
      ctx.fillStyle = '#9ca3af';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'right';

      for (let i = 0; i <= 10; i++) {
        const y = 30 + chartHeight - i * chartHeight / 10;
        ctx.fillText(i * 10, 25, y + 4);
      }
    };

    // Draw the chart initially
    drawChart();

    // Redraw on window resize
    const handleResize = () => {
      if (chartCanvasRef.current) {
        chartCanvasRef.current.width = chartCanvasRef.current.parentElement.clientWidth;
        drawChart();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [user]);

  if (!user) {
    return (
      <div className="text-center p-4" data-id="2be8rtdus" data-path="components/ProgressChart.js">Loading progress data...</div>);

  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" data-id="ddn814lxt" data-path="components/ProgressChart.js">
      <div className="bg-mediumBlue text-white p-4" data-id="e1r5b5utg" data-path="components/ProgressChart.js">
        <h3 className="text-lg font-bold" data-id="pppqg99jr" data-path="components/ProgressChart.js">Your Skills Analysis</h3>
      </div>
      
      <div className="p-4" data-id="jil39izxh" data-path="components/ProgressChart.js">
        <div className="relative" data-id="k0v08qqo1" data-path="components/ProgressChart.js">
          <canvas
            ref={chartCanvasRef}
            width="600"
            height="300"
            className="w-full h-auto" data-id="s19kmixqh" data-path="components/ProgressChart.js">
          </canvas>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200" data-id="jdchvrqoc" data-path="components/ProgressChart.js">
          <div className="flex items-center justify-between" data-id="o7eoxt5qo" data-path="components/ProgressChart.js">
            <div className="text-gray-600 text-sm" data-id="ph5icau3z" data-path="components/ProgressChart.js">
              Based on {user.completedScenarios.length} completed scenarios
            </div>
            
            <div className="flex items-center" data-id="6ft2vq2lr" data-path="components/ProgressChart.js">
              <div className="w-3 h-3 rounded-full bg-lightBlue mr-2" data-id="60hoe1sno" data-path="components/ProgressChart.js"></div>
              <span className="text-sm text-gray-600" data-id="xsrwl61ht" data-path="components/ProgressChart.js">Your performance</span>
            </div>
          </div>
        </div>
      </div>
    </div>);

}