// ZAP Labs Scenario Card Component

function ScenarioCard({ scenario, isAuthenticated = false }) {
  const { useState } = React;
  const { Link, useNavigate } = ReactRouterDOM;
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    navigate(`/scenarios/${scenario.id}`);
  };

  return (
    <div
      className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} data-id="qw14wru1z" data-path="components/ScenarioCard.js">

      {/* Card Image */}
      <div className="relative h-48 overflow-hidden" data-id="vc71hd6ik" data-path="components/ScenarioCard.js">
        <img
          src={scenario.thumbnail}
          alt={`${scenario.name} - Scenario`}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} data-id="4946ii8hy" data-path="components/ScenarioCard.js" />

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-darkBlue to-transparent opacity-70 h-24" data-id="3lucrjp2k" data-path="components/ScenarioCard.js"></div>
        <div className={`absolute top-4 right-4 bg-white shadow-md rounded-full px-3 py-1 text-xs font-bold ${getDifficultyClass(scenario.difficulty)}`} data-id="sbr6kech2" data-path="components/ScenarioCard.js">
          {scenario.difficulty}
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-6" data-id="rbuu58ry9" data-path="components/ScenarioCard.js">
        <div className="flex justify-between items-start mb-3" data-id="8ftojvg9q" data-path="components/ScenarioCard.js">
          <h3 className="text-xl font-bold text-darkBlue" data-id="u9ofna51g" data-path="components/ScenarioCard.js">{scenario.name}</h3>
          <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded" data-id="8h0of8a70" data-path="components/ScenarioCard.js">Age: {scenario.age}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4" data-id="ct0hm4dwi" data-path="components/ScenarioCard.js">{truncateText(scenario.description, 100)}</p>
        
        <div className="mb-4" data-id="lnasiunei" data-path="components/ScenarioCard.js">
          {scenario.tags.slice(0, 3).map((tag, index) =>
          <span key={index} className="scenario-tag mr-2" data-id="oef4p5vpx" data-path="components/ScenarioCard.js">
              {tag}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center" data-id="bz1u5llpf" data-path="components/ScenarioCard.js">
          <span className="text-sm text-gray-500" data-id="dnry5vrn1" data-path="components/ScenarioCard.js">Type: {scenario.type}</span>
          <button
            onClick={handleClick}
            className="bg-mediumBlue hover:bg-darkBlue text-white py-2 px-4 rounded font-medium text-sm transition-colors duration-200" data-id="7smztj4d2" data-path="components/ScenarioCard.js">

            Start Interview
          </button>
        </div>
      </div>
    </div>);

}