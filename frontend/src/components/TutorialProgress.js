import React from 'react';
import PropTypes from 'prop-types';

const TutorialProgress = ({ totalSteps, currentStep }) => {
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-blue-700">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-blue-700">{Math.round(progress)}% Complete</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

TutorialProgress.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default TutorialProgress;