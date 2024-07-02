import React from 'react';
import { useNavigate } from "react-router-dom"
import { Modal } from 'antd';

const LogOff = ({ setUser, isOpenClose, setIsOpenClose }) => {
  const navigate = useNavigate()

  // функция выхода из системы
  const logOff = async (event) => {
    event.preventDefault()

    const requestOptions = {
      method: "POST",
    }
    return await fetch("api/account/logoff", requestOptions)
      .then((response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: false, userName: "" })
          setIsOpenClose(false);
          navigate('/')
          console.log('vishel');
        response.status === 401 && navigate("/login")
      })      
  }

  const cancelLogOff = () => {
    setIsOpenClose(false);
};

  return (
    <>
      <Modal open={isOpenClose} onCancel={cancelLogOff} onOk={logOff}>
            <p>Вы уверены, что хотите выйти из системы?</p>
        </Modal>
      
    </>
  )
}

export default LogOff
