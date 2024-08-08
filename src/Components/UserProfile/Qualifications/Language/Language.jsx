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
    setLanguage({}); // Reset language when opening modal
  }, []);

  const closeModal = useCallback(() => {
    setModal({ display: "none" });
    setLanguage({}); // Reset language when closing modal
  }, []);

  const saveLanguage = useCallback(() => {
    if (language.language && language.proficiency) {
      setLanguages((prev) => [...prev, language]);
      closeModal();
    }
  }, [language, setLanguages, closeModal]);

  return (
    <div className="mt-5">
      <div className="flex items-center mb-2">
        <RiMedalFill className="text-2xl text-yellow-500" />
        <h3 className="ml-2 text-xl font-semibold">Languages</h3>
      </div>
      
      {languages && languages.length > 0 ? (
        <div className="space-y-2">
          {languages.map((lang, index) => (
            <div className="grid grid-cols-3 gap-10 items-center mb-2" key={index}>
              <div className="bg-gray-200 border border-secondary-color rounded-xl p-2 text-lg font-bold">
                {lang.language}
              </div>
              <div className="text-gray-700">{lang.proficiency}</div>
              <div className="flex justify-end">
                <FaTrashAlt
                  className="text-red-500 cursor-pointer text-xl ml-2"
                  onClick={() => removeLanguage(index)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-2 text-lg font-bold">Please Add Languages</div>
      )}
      
      <div>
        <AddButton onClick={() => showModal('Add Language')} />
      </div>
      
      <ModalBox props={{ ...modal, onClose: closeModal, onSave: saveLanguage }}>
        <AddLanguage props={{ selectedLanguage: language, setLanguage, selectedLanguages: languages }} />
      </ModalBox>
    </div>
  );
}

export default Language;
