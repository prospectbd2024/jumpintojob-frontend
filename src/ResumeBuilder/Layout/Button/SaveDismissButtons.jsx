import React, { useCallback } from 'react'

function SaveDismissButtons({props}) {

  const {state,setState,id} = props;
  const saveChanges = useCallback(() => {
    // console.log(state)

    setState({...state, type: "list-view"});
  });

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      width: "200px",
      marginTop: "30px",
    }}
  >

    <div
      onClick={() => {
        saveChanges();
      }}
    >
      Save
    </div>
  </div>
  )
}

export default SaveDismissButtons