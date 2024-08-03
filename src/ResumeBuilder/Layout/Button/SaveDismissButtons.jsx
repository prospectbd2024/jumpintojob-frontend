import React, { useCallback } from 'react';

function SaveDismissButtons({ props }) {
  const isRequiredMissing = (array) => {
    let rv = false;
    array.forEach((field) => {
      if (field === '') {
        rv = true;
      }
    });
    return rv;
  };

  const { state, setState, setWarning, requiredFields } = props;
  
  const saveChanges = useCallback(() => {
    if (isRequiredMissing(requiredFields)) {
      setWarning(true);
    } else {
      setState({ ...state, type: "list-view" });
    }
  }, [state, setState, setWarning, requiredFields]);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        saveChanges();
      }}
      className="h-9 w-20 bg-blue-500 text-white text-center rounded cursor-pointer border border-blue-500 mt-4"
    >
      Save
    </button>
  );
}

export default SaveDismissButtons;
