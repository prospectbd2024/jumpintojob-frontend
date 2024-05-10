import { FaTrashAlt } from "react-icons/fa"; 
// Hobbies.js
import React, { useCallback, useState } from "react";
import { HiMinus, HiHeart } from "react-icons/hi";
import { FaPencilAlt } from "react-icons/fa";
import ModalBox from "../ModalBox";
import AddHobby from "./AddHobby";
import "./Hobbies.css"; // Import CSS file

const Hobbies = ({ props }) => {
  const { hobbies, setHobbies } = props;
  const [hobby, setHobby] = useState({ id: false });
  const [modal, manageModal] = useState({
    display: "none",
    title: "Loading",
    state: "new",
  });
  const [hobbyErrors, setHobbyErrors] = useState({});

  const removeHobby = useCallback(
    (id) => {
      setHobbies((prev) => prev.filter((h, index) => index !== id));
    },
    [hobbies]
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
    [hobbies]
  );

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

  const updateHobby = useCallback(
    (index, hobby) => {
      const temp = hobbies.map((h, i) => (i === index ? hobby : h));
      setHobbies(temp);
    },
    [hobbies]
  );

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
    <div className="hobbies-content">
      <div className="qualifications-header">
        <HiHeart />
        <h3>Hobbies</h3>
      </div>
      {hobbies && hobbies.length > 0 ? (
        <div className="hobbies-container">
          {hobbies.map((hobby, index) => (
            <div className="hobby-item" key={index}>
              <div className="hobby-name">
              <p >{hobby.name}</p>
              </div>
              <div>

                <FaTrashAlt
                className="remove-hobby"
                style={{color : 'red'}}
                onClick={() => removeHobby(index)}
              />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-hobbies">Please add hobbies</div>
      )}

      <div className="add-hobby" onClick={() => showModal("Add Hobby", "add")}>
        <p>Add Hobby</p>
        <button>+</button>
      </div>
      <ModalBox props={{ ...modal, onSave: saveChanges, onClose: closeModal }}>
        <AddHobby props={{ hobby, setHobby, saveChanges, hobbyErrors }} />
      </ModalBox>
    </div>
  );
};

export default Hobbies;
