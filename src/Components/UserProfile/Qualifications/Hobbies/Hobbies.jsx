import React, { useCallback, useState } from "react";
import { HiHeart, HiMinus } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import ModalBox from "../ModalBox";
import AddHobby from "./AddHobby";
import "./Hobbies.css"; // Import CSS file

const Hobbies = ({ props }) => {
  const { hobbies, setHobbies } = props;
  const [hobby, setHobby] = useState({ id: false });
  const [modal, manageModal] = useState({ display: "none", title: "Loading", state: "new" });
  const [hobbyErrors, setHobbyErrors] = useState({});

  const removeHobby = useCallback(
    (id) => {
      setHobbies((prev) => prev.filter((h, index) => index !== id));
    },
    [hobbies]
  );

  const showModal = useCallback((title, state, index) => {
    if (state === "update") {
      setHobby(hobbies[index]);
    }
    manageModal({ title: title, display: "block", state: state, index: index });
  }, [hobbies]);

  const closeModal = useCallback(() => {
    setHobby({});
    setHobbyErrors({});
    manageModal({ display: "none" });
  }, []);

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
  }, [hobby, hobbyErrors]);

  const updateHobby = useCallback((index, hobby) => {
    const temp = hobbies.map((h, i) => (i === index ? hobby : h));
    setHobbies(temp);
  }, [hobbies]);

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
  }, [hobby, hobbyErrors]);

  return (
    <>
      {hobbies && hobbies.length > 0 ? (
        <>
          <div className="header">
            <HiHeart /> Hobbies
          </div>
          {hobbies.map((h, index) => (
            <div className="hobby-container" key={index}>
              <div className="top-right-icons">
                <HiMinus className="minus-icon" onClick={() => removeHobby(index)} />
              </div>
              <p className="hobby-name">{h.name}</p>
              <div className="bottom-right-icons">
                <FaPencilAlt className="edit-icon" onClick={() => showModal("Edit Hobby", "update", index)} />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="no-hobbies">Please add hobbies</div>
      )}

      <div className="add-hobby" onClick={() => showModal("Add Hobby", "add")}>
        <p className="add-hobby-text">Add Hobby</p>
        <button className="add-button">+</button>
      </div>
      <ModalBox props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddHobby props={{ hobby, setHobby, saveChanges, hobbyErrors }} />
      </ModalBox>
    </>
  );
};

export default Hobbies;
