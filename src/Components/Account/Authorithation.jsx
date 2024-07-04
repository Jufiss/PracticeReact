import React, { useState } from "react"
import LogIn from "./Login"
import Register from "./Register"
import { IoChevronBackCircleOutline } from "react-icons/io5"
import { Button, ConfigProvider } from "antd"

import "../Styles/Style.css"

const Authorithation = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const handleLoginClick = () => {
    setShowLogin(true)
    setShowRegister(false)
  }

  const handleRegisterClick = () => {
    setShowLogin(false)
    setShowRegister(true)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimaryHover: "#deb887",
        },
      }}
    >
      <center>
        <div className="Auth">
          <>
            <div
              style={{
                display: "flex",
                position: "absolute",
                flexDirection: "column",
                marginTop: "30px",
                fontFamily: "Montserrat, sans-serif",
                width: "100%",
                alignItems: "center",
              }}
            >
              {!showRegister && !showLogin ? (
                <>
                  <Button
                    className="ButtonStyle"
                    style={{ marginBottom: "20px" }}
                    onClick={handleLoginClick}
                  >
                    Вход
                  </Button>
                  <Button className="ButtonStyle" onClick={handleRegisterClick}>
                    Регистрация
                  </Button>
                </>
              ) : (
                ""
              )}
            </div>
            <div style={{ width: "50%", marginTop: "30px" }}>
              {(showLogin || showRegister) && (
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                  <IoChevronBackCircleOutline
                    onClick={() => {
                      setShowLogin(false)
                      setShowRegister(false)
                    }}
                    className="BackButton"
                  />
                  <label style={{ fontSize: "16px", fontWeight: 500, marginLeft: "15px" }}>
                    
                  </label>
                </div>
              )}
              {showLogin && <LogIn />}
              {showRegister && <Register />}
            </div>
          </>
        </div>
      </center>
    </ConfigProvider>
  )
}
export default Authorithation
