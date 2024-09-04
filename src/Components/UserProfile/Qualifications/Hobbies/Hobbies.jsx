import React, { useCallback, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { FaTrashAlt } from "react-icons/fa";
import ModalBox from "../ModalBox";
import AddHobby from "./AddHobby";
import AddButton from "@/Components/Buttons/AddButton";

const Hobbies = ({ props }) => {
  const { hobbies, setHobbies } = props;
  const [hobby, setHobby] = useState({ id: false });
  const [modal, manageModal] = useState({
    display: "none",
    title: "Loading",
    state: "new",
  });
  const [hobbyErrors, setHobbyErrors] = useState({});

  const updateHobby = useCallback(
    (index, updatedHobby) => {
      const temp = hobbies.map((h, i) => (i === index ? updatedHobby : h));
      setHobbies(temp);
    },
    [hobbies, setHobbies]
  );

  const removeHobby = useCallback(
    (id) => {
      setHobbies((prev) => prev.filter((h, index) => index !== id));
    },
    [setHobbies]
  );

  const showModal = useCallback(
    (title, state, index) => {
      if (state === "update") {
        setHobby(hobbies[index]);
      }
      manageModal({
        title: title,
        display: "block",
        state: state,
        index: index,
      });
    },
    [hobbies, setHobby]
  );

  const closeModal = useCallback(() => {
    setHobby({});
    setHobbyErrors({});
    manageModal({ display: "none" });
  }, []);

  const validation = useCallback(() => {
    const required = ["name"];
    let flag = true;

    required.forEach((element) => {
      if (!hobby[element]) {
        setHobbyErrors((prev) => ({ ...prev, [element]: 1 }));
        flag = false;
      } else {
        setHobbyErrors((prev) => ({ ...prev, [element]: 0 }));
      }
    });

    return flag;
  }, [hobby]);

  const saveChanges = useCallback(() => {
    if (validation()) {
      if (modal.state === "update") {
        updateHobby(modal.index, hobby);
      } else {
        setHobbies((prev) => [...prev, hobby]);
      }
      closeModal();
    }
  }, [hobby, hobbyErrors, modal, closeModal, updateHobby, setHobbies, validation]);

  return (
    <div className="mt-8 bg-gradient-to-br from-blue-50 to-primary-color p-4 sm:p-6 rounded-xl shadow-xl">
      <div className="flex items-center mb-4 text-xl font-semibold text-gray-700">
        <HiHeart className="text-red-500 mr-2 text-2xl" />
        <h3>Hobbies</h3>
      </div>
      {hobbies && hobbies.length > 0 ? (
        <div className="space-y-2">
          {hobbies.map((hobby, index) => (
            <div className="flex items-center justify-between bg-gradient-to-br from-blue-200 to-primary-color p-3 rounded-md shadow-sm" key={index}>
              <div className="font-semibold text-gray-800">{hobby.name}</div>
              <FaTrashAlt
                className="text-red-500 cursor-pointer text-lg"
                onClick={() => removeHobby(index)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <p className="text-lg text-gray-600">You haven't added hobbies yet.</p>
          <p className="text-sm text-gray-500 mt-2">Click the button below to get started!</p>
        </div>
      )}
      <AddButton onClick={() => showModal('Add Hobby', 'add')} />
      <ModalBox props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddHobby props={{ hobby, setHobby, saveChanges, hobbyErrors }} />
      </ModalBox>
    </div>
  );
};

export default Hobbies;
