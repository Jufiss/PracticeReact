import React, { useState } from "react"
import { Input, Button, ConfigProvider } from "antd"
import { PiPassword, PiPhone } from "react-icons/pi"

const LogIn = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            activeBorderColor: "#F08080",
            hoverBorderColor: "#F08080",
            inputFontSize: 16,
            borderRadius: 10,
          },
        },
      }}
    >
      <>
        <form>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "left" }}>
            <strong className="AccountLabel">номер телефона</strong>
            <input className="AccountInput" type="text" />
            <strong className="AccountLabel">пароль</strong>
            <input className="AccountInput" type="text" />
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorPrimaryHover: "#deb887",
              },
            }}
          >
            <Button htmlType="submit" style={{marginTop:"15px"}} className="ButtonStyle">
              Войти
            </Button>
          </ConfigProvider>
        </form>
      </>
    </ConfigProvider>
  )
}
export default LogIn
