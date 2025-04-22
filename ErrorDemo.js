// ZAP Labs Error Handling Demo Page

function ErrorDemo() {
  return (
    <div className="container mx-auto py-8 px-4" data-id="5ui0smnfs" data-path="pages/ErrorDemo.js">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden" data-id="keag9xua3" data-path="pages/ErrorDemo.js">
        <div className="bg-darkBlue text-white p-6" data-id="m9dzfxlx3" data-path="pages/ErrorDemo.js">
          <h1 className="text-2xl font-bold" data-id="q3on3tuke" data-path="pages/ErrorDemo.js">Error Handling System</h1>
          <p className="mt-2 text-blue-100" data-id="q0qiz8r72" data-path="pages/ErrorDemo.js">A demonstration of ZAP Labs' robust error handling capabilities</p>
        </div>
        
        <div className="p-6" data-id="lmjlc8oyh" data-path="pages/ErrorDemo.js">
          <div className="prose max-w-none mb-8" data-id="t3yx18zoi" data-path="pages/ErrorDemo.js">
            <h2 data-id="rb8j2lrdq" data-path="pages/ErrorDemo.js">About This System</h2>
            <p data-id="lhzl74dm1" data-path="pages/ErrorDemo.js">
              The ZAP Labs platform includes a comprehensive error handling system designed to provide 
              meaningful feedback to users when things go wrong. The system can:
            </p>
            
            <ul data-id="ito7y4d46" data-path="pages/ErrorDemo.js">
              <li data-id="6swgm5c1z" data-path="pages/ErrorDemo.js">Distinguish between different types of errors (network, authentication, etc.)</li>
              <li data-id="pi2kz007h" data-path="pages/ErrorDemo.js">Provide user-friendly error messages</li>
              <li data-id="rm0mu1z80" data-path="pages/ErrorDemo.js">Automatically retry failed requests when appropriate</li>
              <li data-id="ppx3ecox0" data-path="pages/ErrorDemo.js">Monitor network connectivity</li>
              <li data-id="r38vonm5g" data-path="pages/ErrorDemo.js">Log detailed error information for debugging</li>
            </ul>
            
            <h3 data-id="ev2lr6zff" data-path="pages/ErrorDemo.js">Key Components</h3>
            <p data-id="j2vmv7880" data-path="pages/ErrorDemo.js">
              This error handling system includes several key components working together:
            </p>
            
            <ul data-id="qdle45x9d" data-path="pages/ErrorDemo.js">
              <li data-id="g33bjbols" data-path="pages/ErrorDemo.js"><strong data-id="ok3s7a3sg" data-path="pages/ErrorDemo.js">Error Classification</strong> - Categorizes errors by type</li>
              <li data-id="obwam1t7o" data-path="pages/ErrorDemo.js"><strong data-id="a5wsx70fi" data-path="pages/ErrorDemo.js">Notification System</strong> - Displays user-friendly toast notifications</li>
              <li data-id="fj5ctysvm" data-path="pages/ErrorDemo.js"><strong data-id="iby8eb3kg" data-path="pages/ErrorDemo.js">Retry Mechanism</strong> - Automatically retries failed network requests</li>
              <li data-id="nus9yr7em" data-path="pages/ErrorDemo.js"><strong data-id="re0o2nbyn" data-path="pages/ErrorDemo.js">Network Monitor</strong> - Tracks online/offline status</li>
              <li data-id="xx9b9or5y" data-path="pages/ErrorDemo.js"><strong data-id="qw50v7pdk" data-path="pages/ErrorDemo.js">Error Boundaries</strong> - Prevents UI crashes from propagating</li>
            </ul>
          </div>
          
          <ErrorHandlingDemo data-id="vn8w7fois" data-path="pages/ErrorDemo.js" />
        </div>
      </div>
    </div>);

}