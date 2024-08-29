import React from 'react';

function PrevNextButton({ props }) {
  const { setCurrentStep } = props;

  return (
    <div className="flex gap-2 items-center justify-center md:justify-start w-full">
      <button
        className="w-24 h-9 font-bold text-xs sm:w-28 sm:h-10 sm:text-sm md:text-base cursor-pointer border border-black bg-transparent text-black rounded-md mt-4 md:w-36 md:h-11"
        onClick={() => setCurrentStep(currentStep => currentStep - 1)}
      >
        Previous
      </button>
      <button
        className="w-24 h-9 font-bold text-xs sm:w-28 sm:h-10 sm:text-sm md:text-base cursor-pointer bg-[var(--primary-color)] text-white rounded-md mt-4 md:w-36 md:h-11"
        onClick={() => setCurrentStep(currentStep => currentStep + 1)}
      >
        Next
      </button>
    </div>
  );
}

export default PrevNextButton;
