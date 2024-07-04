import React, { useState } from "react"
import { Input, Button, ConfigProvider } from "antd"
import { PiPassword, PiPhone } from "react-icons/pi"

const Register = () => {
  return (
    <>
      <form>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "left" }}>
          <strong className="AccountLabel">личная информация</strong>
          <input className="AccountInput" type="text" placeholder="Имя" />
          <input className="AccountInput" type="text" placeholder="Фамилия" />
          <input className="AccountInput" type="text" placeholder="Отчество" />
          <strong className="AccountLabel">город</strong>
          <input className="AccountInput" type="text" />
          <strong className="AccountLabel">контакты</strong>
          <input className="AccountInput" type="text" placeholder="Номер телефона" />
          <input className="AccountInput" type="text" placeholder="Электронная почта" />
          <strong className="AccountLabel">пароль</strong>
          <input className="AccountInput" type="password" placeholder="Пароль" />
          <input className="AccountInput" type="password" placeholder="Повторите пароль" />
        </div>
        <ConfigProvider
          theme={{
            token: {
              colorPrimaryHover: "#deb887",
            },
          }}
        >
          <Button htmlType="submit" style={{marginTop:"15px"}} className="ButtonStyle">Зарегистрироваться</Button>
        </ConfigProvider>
      </form>
    </>
  )
}
export default Register
