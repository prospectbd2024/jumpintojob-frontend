import React, { useState, useCallback } from "react";
import { RiMedalFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import ModalBox from "../ModalBox";
import AddLanguage from "./AddLanguage";
import AddButton from "@/Components/Buttons/AddButton";

function Language({ props }) {
  const { languages, setLanguages } = props;
  const [language, setLanguage] = useState({});
  const [modal, setModal] = useState({
    display: "none",
    title: "Loading",
    state: "new",
  });

  const removeLanguage = useCallback(
    (id) => {
      setLanguages((prev) => prev.filter((lang, index) => index !== id));
    },
    [setLanguages]
  );

  const showModal = useCallback((title) => {
    setModal((prev) => ({ title: title, display: "block" }));
    setLanguage({});
  }, []);

  const closeModal = useCallback(() => {
    setModal({ display: "none" });
    setLanguage({});
  }, []);

  const saveLanguage = useCallback(() => {
    if (language.language && language.proficiency) {
      setLanguages((prev) => [...prev, language]);
      closeModal();
    }
  }, [language, setLanguages, closeModal]);

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-primary-color p-4 sm:p-6 rounded-xl shadow-xl">
      <div className="flex items-center mb-4">
        <RiMedalFill className="text-2xl text-yellow-500" />
        <h3 className="ml-2 text-xl font-semibold text-gray-700">Languages</h3>
      </div>
      {languages && languages.length > 0 ? (
        <div className="space-y-2">
          {languages.map((lang, index) => (
            <div className="flex items-center justify-between bg-gradient-to-br from-blue-200 to-primary-color p-3 rounded-md shadow-sm" key={index}>
              <div className="font-semibold">{lang.language}</div>
              <div className="text-gray-600">{lang.proficiency}</div>
              <FaTrashAlt
                className="text-red-500 cursor-pointer text-lg"
                onClick={() => removeLanguage(index)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-lg text-gray-600">You haven't added languages yet.</p>
          <p className="text-sm text-gray-500 mt-2">Click the button below to get started!</p>
        </div>
      )}
      <div className="mt-4">
        <AddButton onClick={() => showModal('Add Language')} />
      </div>
      <ModalBox props={{ ...modal, onClose: closeModal, onSave: saveLanguage }}>
        <AddLanguage props={{ selectedLanguage: language, setLanguage, selectedLanguages: languages }} />
      </ModalBox>
    </div>
  );
}

export default Language;
