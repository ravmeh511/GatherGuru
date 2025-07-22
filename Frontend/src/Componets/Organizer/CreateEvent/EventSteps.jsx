import React from 'react';

const EventSteps = ({ currentStep }) => {
  const steps = [
    { id: 1, name: 'Edit' },
    { id: 2, name: 'Banner' },
    { id: 3, name: 'Ticketing' },
    { id: 4, name: 'Review' }
  ];

  return (
    <div className="flex items-center justify-between mb-6 md:mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base ${
              step.id <= currentStep ? 'bg-[#2B293D] text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {step.id}
            </div>
            <div className="ml-1 md:ml-2 text-xs md:text-base whitespace-nowrap">{step.name}</div>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 md:h-1 mx-2 md:mx-4 bg-gray-200">
              <div 
                className="h-full bg-[#2B293D] transition-all duration-300"
                style={{ width: `${step.id < currentStep ? '100%' : step.id === currentStep ? '50%' : '0%'}` }}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default EventSteps; 