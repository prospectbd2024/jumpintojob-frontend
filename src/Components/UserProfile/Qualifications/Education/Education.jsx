import React, { useCallback, useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { RiGraduationCapFill } from "react-icons/ri";
import AddEducation from "@/ResumeBuilder/ResumeComponents/ResumeEducation/AddEducation";
import ModalBox from "../ModalBox";
import AddButton from "@/Components/Buttons/AddButton";
import Visibility from "@/Components/Buttons/Visibility";

const Education = ({ props }) => {
  const educationInterface = {
    id: false,
    visible_on_cv: true,
    education_graduation_year: "",
    grades: "",
    cgpa: "",
    institution_name: "",
    institution_location: "",
    degree: "",
    field_study: "",
    education_starting_year: "",
    education_achievements: "",
  };
  const { educations, setEducations } = props;
  const [education, setEducation] = useState(educationInterface);
  const [modal, setModal] = useState({ display: "none", title: "Loading", state: "new" });
  const [educationErrors, setEducationErrors] = useState({});

  const removeEducation = useCallback(
    (id) => {
      setEducations((prev) => prev.filter((_, index) => index !== id));
    },
    [setEducations]
  );

  const showModal = useCallback(
    (title, state, index) => {
      if (state === "update") {
        setEducation(educations[index]);
      } else {
        setEducation(educationInterface);
      }
      setEducationErrors({});
      setModal({ title, display: "block", state, index });
    },
    [educations]
  );

  const closeModal = useCallback(() => {
    setEducation(educationInterface);
    setEducationErrors({});
    setModal({ display: "none" });
  }, []);

  const validation = useCallback(() => {
    const errors = {};
    let isValid = true;

    if (!education.institution_name) {
      errors.institution_name = true;
      isValid = false;
    }
    if (!education.degree) {
      errors.degree = true;
      isValid = false;
    }
    if (!education.field_study) {
      errors.field_study = true;
      isValid = false;
    }

    if (education.education_graduation_year !== 'present') {
      if (!education.grades) {
        errors.grades = true;
        isValid = false;
      }
      if (!education.cgpa || parseFloat(education.cgpa) < 1 || parseFloat(education.cgpa) > 5) {
        errors.cgpa = true;
        isValid = false;
      }
    }

    setEducationErrors(errors);
    return isValid;
  }, [education]);

  const saveChanges = useCallback(() => {
    if (validation()) {
      if (modal.state === "update") {
        updateEducation(modal.index, education);
      } else {
        setEducations((prev) => [...prev, { ...education, id: prev.length }]);
      }
      closeModal();
    }
  }, [education, modal, setEducations, closeModal, validation]);

  const updateEducation = useCallback(
    (index, updatedEducation) => {
      const updatedEducations = educations.map((item, i) =>
        i === index ? updatedEducation : item
      );
      setEducations(updatedEducations);
    },
    [educations, setEducations]
  );

  const manageVisibility = (id) => {
    setEducations((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, visible_on_cv: !item.visible_on_cv } : item
      )
    );
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-primary-color p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-center sm:justify-start mb-6">
        <RiGraduationCapFill className="text-2xl sm:text-3xl text-primary-color" />
        <h2 className="ml-3 text-xl sm:text-2xl font-bold text-gray-800">Education</h2>
      </div>
      {educations && educations.length > 0 ? (
        <>
          {/* <div className="flex items-center text-lg sm:text-xl md:text-2xl font-bold mt-3 sm:mt-4 md:mt-5 mb-3 sm:mb-4 md:mb-5">
            <HiAcademicCap className="mr-2 text-xl sm:text-2xl md:text-3xl" /> Educations
          </div> */}
          {educations.map((edu, index) => (
            <div key={index} className="relative p-3 pb-7 sm:p-4 md:p-5 border border-secondary rounded-md mb-3 flex flex-col gap-2 sm:gap-3">
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="flex flex-col gap-1 sm:gap-2">
                  <p className="text-base sm:text-lg md:text-xl font-bold">{edu.institution_name}</p>
                  <p className="text-sm sm:text-base md:text-lg font-medium">{edu.institution_location}</p>
                  <p className="text-xs sm:text-sm md:text-base">
                    <span className="font-bold">Degree:</span> {edu.degree}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base">
                    <span className="font-bold">Field of Study:</span> {edu.field_study}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base">
                    <span className="font-bold">Start Year:</span> {edu.education_starting_year}
                  </p>
                  {edu.education_graduation_year && (
                    <p className="text-xs sm:text-sm md:text-base">
                      <span className="font-bold">Graduation Year:</span> {edu.education_graduation_year}
                    </p>
                  )}
                  <p className="text-xs sm:text-sm md:text-base">
                    <span className="font-bold">CGPA/GPA:</span> {edu.cgpa}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base">
                    <span className="font-bold">Grades:</span> {edu.grades}
                  </p>
                  {edu.education_achievements && (
                    <p className="text-xs sm:text-sm md:text-base">
                      <span className="font-bold">Achievements:</span> {edu.education_achievements}
                    </p>
                  )}
                </div>
                <div className="flex justify-between gap-2 sm:gap-3 mt-2 sm:mt-0 mb-4">
                  <Visibility
                    visibility={edu.visible_on_cv}
                    handleVisibility={() => manageVisibility(index)}
                  />
                  <FaTrashAlt
                    className="text-red-600 cursor-pointer text-base sm:text-lg md:text-xl"
                    onClick={() => removeEducation(index)}
                  />
                </div>
              </div>
              <FaPencilAlt
                className="absolute bottom-2 right-2 text-white cursor-pointer text-base sm:text-lg md:text-xl mr-2 mb-3"
                onClick={() => showModal("Edit Education", "update", index)}
              />
            </div>
          ))}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">You haven't added education yet.</p>
          <p className="text-sm text-gray-500 mt-2">Click the button below to get started!</p>
        </div>
      )}
      <AddButton onClick={() => showModal('Add Education', 'add')} />
      <ModalBox props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddEducation props={{ education, setEducation, educationErrors, setEducationErrors }} />
      </ModalBox>
    </div>
  );
};

// const renderField = (label, value) => {
//   if (!value) return null;
//   return (
//     <div className="flex items-center justify-start">
//       <label className="text-base sm:text-lg md:text-xl font-bold mr-2">{label}:</label>
//       <p className="text-xs sm:text-sm md:text-base">{value}</p>
//     </div>
//   );
// };

// const renderMediaLinks = (links) => {
//   if (!links || links.length === 0) return null;
//   return (
//     <div className="flex items-start">
//       <label className="text-base sm:text-lg md:text-xl font-bold mr-2">Media Links:</label>
//       <div className="text-xs sm:text-sm md:text-base">
//         {links.map((link, index) => (
//           <p key={index}>
//             {link.name}: {link.url}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

export default Education;