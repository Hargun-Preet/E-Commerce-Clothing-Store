const ProgressSteps = ({ step1, step2, step3 }) => {
    return (
      <div className="flex justify-center items-center space-x-4">
        {/* Step 1 */}
        <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
          <span className="ml-2">Login</span>
          <div className="mt-2 text-lg text-center">✅</div>
        </div>
  
        {/* Step 2 */}
        {step2 && (
          <>
            <div
              className={`h-0.5 w-[10rem] ${
                step1 ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <div className={`${step1 ? "text-green-500" : "text-gray-300"}`}>
              <span>Shipping</span>
              <div className="mt-2 text-lg text-center">✅</div>
            </div>
          </>
        )}
  
        {/* Step 3 */}
        <>
          <div
            className={`h-0.5 w-[10rem] ${
              step1 && step2 && !step3 ? "bg-gray-300" : step3 ? "bg-green-500" : ""
            }`}
          ></div>
  
          <div className={`${step3 ? "text-green-500" : "text-gray-300"}`}>
            <span>Summary</span>
            {step3 && <div className="mt-2 text-lg text-center">✅</div>}
          </div>
        </>
      </div>
    );
  };
  
  export default ProgressSteps;
  