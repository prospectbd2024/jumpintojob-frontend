import React from 'react';

function PrevNextButton({ props }) {
  const { setCurrentStep } = props;

  return (
    <div className="flex gap-2 items-center">
      <button
        className="w-36 h-11 font-bold text-base cursor-pointer border border-black bg-transparent text-black rounded-md mt-4"
        onClick={() => setCurrentStep(currentStep => currentStep - 1)}
      >
        Previous
      </button>
      <button
        className="w-36 h-11 font-bold text-base cursor-pointer bg-[var(--primary-color)] text-white rounded-md mt-4"
        onClick={() => setCurrentStep(currentStep => currentStep + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default PrevNextButton;
