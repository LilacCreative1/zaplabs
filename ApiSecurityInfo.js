// ZAP Labs API Security Info Component

function ApiSecurityInfo() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6" data-id="wb3xq1k1s" data-path="components/ApiSecurityInfo.js">
      <h2 className="text-xl font-bold text-darkBlue mb-4 font-ibm" data-id="rvr3bvyxu" data-path="components/ApiSecurityInfo.js">API Security Information</h2>
      
      <div className="space-y-6" data-id="jtcyobf06" data-path="components/ApiSecurityInfo.js">
        {/* Browser-based API Security */}
        <div data-id="0gg0amhb7" data-path="components/ApiSecurityInfo.js">
          <h3 className="text-md font-medium text-darkBlue mb-2" data-id="o4j76rxju" data-path="components/ApiSecurityInfo.js">Browser-based API Security</h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4" data-id="nzry0abmq" data-path="components/ApiSecurityInfo.js">
            <div className="flex" data-id="gj50tn6v7" data-path="components/ApiSecurityInfo.js">
              <div className="flex-shrink-0" data-id="e6ho58ss6" data-path="components/ApiSecurityInfo.js">
                <i className="fas fa-exclamation-triangle text-yellow-500" data-id="t8b2ymvfg" data-path="components/ApiSecurityInfo.js"></i>
              </div>
              <div className="ml-3" data-id="4pqm0r1u3" data-path="components/ApiSecurityInfo.js">
                <p className="text-sm text-yellow-700" data-id="c06a9naxb" data-path="components/ApiSecurityInfo.js">
                  <strong data-id="zfdm62adh" data-path="components/ApiSecurityInfo.js">Important Security Notice:</strong> This application uses browser-based API calls which have inherent security limitations.
                </p>
                <p className="text-sm text-yellow-700 mt-2" data-id="034rwy1on" data-path="components/ApiSecurityInfo.js">
                  In a production environment, sensitive API calls should be proxied through a secure backend server to prevent API key exposure.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Current Security Measures */}
        <div data-id="a69kiregi" data-path="components/ApiSecurityInfo.js">
          <h3 className="text-md font-medium text-darkBlue mb-2" data-id="t5d5lcpv2" data-path="components/ApiSecurityInfo.js">Current Security Measures</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600" data-id="klpzeure1" data-path="components/ApiSecurityInfo.js">
            <li data-id="bx5z4q10x" data-path="components/ApiSecurityInfo.js">
              <span className="font-medium" data-id="yixzvy6sb" data-path="components/ApiSecurityInfo.js">Rate Limiting:</span> Requests are limited to prevent abuse of API services
            </li>
            <li data-id="ud8wbmsqo" data-path="components/ApiSecurityInfo.js">
              <span className="font-medium" data-id="pyp900ouv" data-path="components/ApiSecurityInfo.js">Request Throttling:</span> Adaptive throttling to prevent burst requests and API misuse
            </li>
            <li data-id="uwnsjrp96" data-path="components/ApiSecurityInfo.js">
              <span className="font-medium" data-id="a3e5lzllv" data-path="components/ApiSecurityInfo.js">API Key Masking:</span> API keys are masked in the UI to prevent accidental exposure
            </li>
            <li data-id="x0me4vfe9" data-path="components/ApiSecurityInfo.js">
              <span className="font-medium" data-id="i60ftm9zi" data-path="components/ApiSecurityInfo.js">Secure Storage:</span> API keys are stored securely in the database when possible
            </li>
            <li data-id="9ohth4t4h" data-path="components/ApiSecurityInfo.js">
              <span className="font-medium" data-id="3729ins1o" data-path="components/ApiSecurityInfo.js">Usage Logging:</span> All API requests are logged for audit purposes (without sensitive data)
            </li>
            <li data-id="xvjayh7ij" data-path="components/ApiSecurityInfo.js">
              <span className="font-medium" data-id="rfo7xsa88" data-path="components/ApiSecurityInfo.js">Error Handling:</span> Detailed error handling without exposing sensitive information
            </li>
          </ul>
        </div>
        
        {/* Recommended Best Practices */}
        <div data-id="o92eplvks" data-path="components/ApiSecurityInfo.js">
          <h3 className="text-md font-medium text-darkBlue mb-2" data-id="trdp0j0hy" data-path="components/ApiSecurityInfo.js">Recommended Best Practices</h3>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200" data-id="un6025qhw" data-path="components/ApiSecurityInfo.js">
            <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-600" data-id="wfzvh8jq1" data-path="components/ApiSecurityInfo.js">
              <li data-id="swga1qj6n" data-path="components/ApiSecurityInfo.js">
                <span className="font-medium" data-id="ksge6l3fj" data-path="components/ApiSecurityInfo.js">Implement a Server-side Proxy:</span> For maximum security, implement a backend server to proxy all API requests
              </li>
              <li data-id="qhhvj2bzx" data-path="components/ApiSecurityInfo.js">
                <span className="font-medium" data-id="dir1yl4h4" data-path="components/ApiSecurityInfo.js">Regular Key Rotation:</span> Change API keys periodically to limit the impact of potential key exposure
              </li>
              <li data-id="6j4radulq" data-path="components/ApiSecurityInfo.js">
                <span className="font-medium" data-id="o0j0a7ntn" data-path="components/ApiSecurityInfo.js">IP Restrictions:</span> If possible, restrict API access to specific IP addresses
              </li>
              <li data-id="fxlz1yyfh" data-path="components/ApiSecurityInfo.js">
                <span className="font-medium" data-id="1wg7mffg1" data-path="components/ApiSecurityInfo.js">Usage Monitoring:</span> Regularly review API usage logs to identify unusual patterns
              </li>
              <li data-id="ixeat9z1q" data-path="components/ApiSecurityInfo.js">
                <span className="font-medium" data-id="g1bnvvkdb" data-path="components/ApiSecurityInfo.js">Request Encryption:</span> Ensure all API requests are made over HTTPS
              </li>
            </ol>
          </div>
        </div>
        
        {/* Implementation Note */}
        <div className="text-sm text-gray-500 mt-4 pt-4 border-t border-gray-200" data-id="mngbfrnd7" data-path="components/ApiSecurityInfo.js">
          <p data-id="b2wq0pqmf" data-path="components/ApiSecurityInfo.js">
            <i className="fas fa-info-circle mr-1" data-id="g577a21or" data-path="components/ApiSecurityInfo.js"></i>
            The current implementation includes client-side security measures as a compromise between security and ease of deployment. 
            For a fully secure implementation, a server-side proxy (similar to the one shown in your provided code example) would be recommended.
          </p>
        </div>
      </div>
    </div>);

}