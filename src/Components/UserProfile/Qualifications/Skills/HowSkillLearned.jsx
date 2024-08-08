import React from 'react';

function HowSkillLearned({ props }) {
  const { learnedFrom, setLearnedFrom } = props;

  const options = [
    { value: "self", label: "Self" },
    { value: "service", label: "Job" },
    { value: "education", label: "Educational" },
    { value: "training", label: "Professional Training" }
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const selectedOption = options.find(option => option.value === value);

    if (checked) {
      setLearnedFrom([...learnedFrom, selectedOption]);
    } else {
      setLearnedFrom(learnedFrom.filter(item => item.value !== value));
    }
  };

  return (
    <>
      <legend className="text-lg font-bold mb-2 mt-4">
        How did you learn the skill?<span className="text-red-500"></span>
      </legend>
      <div className="flex flex-col space-y-2">
        {options.map(({ value, label }) => (
          <div key={value} className="flex items-center">
            <input
              type="checkbox"
              value={value}
              id={value}
              name="skillLearnFrom"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={value} className="text-gray-700 cursor-pointer">
              {label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}

export default HowSkillLearned;
