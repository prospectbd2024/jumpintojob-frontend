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
    } else {
      console.log(hobbyErrors);
    }
  }, [hobby, hobbyErrors, modal, closeModal, updateHobby, setHobbies, validation]);

  return (
    <div className="mt-10 mb-12">
      <div className="flex items-center mb-4 text-2xl font-bold">
        <HiHeart className="mr-2 text-red-500" />
        <h3>Hobbies</h3>
      </div>
      {hobbies && hobbies.length > 0 ? (
        <div>
          {hobbies.map((hobby, index) => (
            <div className="flex justify-between items-center mb-3" key={index}>
              <div className="w-[325px] bg-gray-200 border border-secondary-color rounded-xl p-2.5 font-bold text-lg">
                <p>{hobby.name}</p>
              </div>
              <FaTrashAlt
                className="text-red-500 text-[20px] cursor-pointer"
                onClick={() => removeHobby(index)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-3 text-lg font-bold">Please add hobbies</div>
      )}
      <AddButton onClick={() => showModal('Add Hobby', 'add')} />
      <ModalBox props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddHobby props={{ hobby, setHobby, saveChanges, hobbyErrors }} />
      </ModalBox>
    </div>
  );
};

export default Hobbies;
