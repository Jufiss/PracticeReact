import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

const LogIn = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([])
  const navigate = useNavigate()

  const logIn = async (values) => {

    const { email, password, rememberMe } = values;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        rememberMe
      }),
    }
    return await fetch("api/account/login", requestOptions)
      .then((response) => {
         console.log(response.status)
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "" })
        return response.json()
      })
      .then(
        (data) => {
          console.log("Data:", data)
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) {
            setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
            console.log('authorized')
            console.log(user.isAuthenticated)
            navigate("/")
          }
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>)

    // функция для завершения действия в форме (после submit)
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      logIn(values);
    };

  return (
    <>
      {user.isAuthenticated ? (
        <h3>Пользователь {user.userName} успешно вошел в систему</h3>
      ) : (
        <>
          <h3>Вход</h3>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              rememberMe: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" style={{width: '244px'}} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                style={{width: '244px'}}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              
            </Form.Item>
          </Form>
          {renderErrorMessage()}
        </>
      )}
    </>
  )
}

export default LogIn
