"use client"
import React,{createContext,useContext,useState,useEffect} from 'react'
const modalContext = createContext();
export const useModalContext = ()=> useContext(modalContext);


function ModalContext({children}) {

    const [modal, manageModal] = useState({display : 'none', modal : null,title : 'education'});
    const [modalState,setModalState] = useState('none');
    const [handleChange,setHandleChange] = useState(()=>{});
  return (
    <modalContext.Provider value={{modal, manageModal,modalState,setModalState,setHandleChange,handleChange}}>
      {children}
    </modalContext.Provider>
  )
}

export default ModalContext
