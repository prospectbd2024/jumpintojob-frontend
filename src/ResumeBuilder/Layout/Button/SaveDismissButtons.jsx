import React, { useCallback } from 'react'

function SaveDismissButtons({props}) {


  const isRequiredMissing = (array)=>{
    const values = array 
    let rv = false
    values.forEach((field) =>{
      if (field==''){
        rv= true
      }
    }) 

    return rv
  }


  const {state,setState,id,setWarning,requiredFields} = props;
  const saveChanges = useCallback(() => {
    // console.log(state)

    if(isRequiredMissing(requiredFields)){
      setWarning(true)
    }
    else{
      setState({...state, type: "list-view"});
    
    }

  });

  return (

    <button
      onClick={(e) => {
        e.preventDefault();


        saveChanges();
      }}
      style={{
        height: '35px',
        width: '76px',
        backgroundColor: 'rgb(52, 152, 219)',
        textAlign: 'center',
        paddingTop: '0px',
        color: 'white',
        borderRadius: '5px',
        cursor: 'pointer',
        border: '1px solid rgb(52, 152, 219)',
        marginTop: '18px'
      }}
    >
      Save
    </button>

  )
}

export default SaveDismissButtons