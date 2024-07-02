import React, { useState } from "react"

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const Register = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([])
  const [notification, setNotification] = useState(null)

  const register = async (values) => {

    var { email, password, passwordConfirm } = values

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        passwordConfirm
      }),
    }
    return await fetch("api/account/register", requestOptions)
      .then((response) => {
        console.log(response.status)
        response.status === 200 &&
        setErrorMessages([])
        console.log('registrated');
        setUser({ isAuthenticated: false })
        return response.json()
        
      })
      .then(
        (data) => {
          console.log("Data:", data)
          setNotification({ type: 'success', message: 'Registration successful! ' + data.message });
          if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
          ) 
          typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setNotification(null);
            setErrorMessages(data.error)
        },
        (error) => {
          console.log(error)
        }
      )
  }

  const renderErrorMessage = () =>
  errorMessages && errorMessages.length > 0 && errorMessages.map((error, index) => <div key={index}>{error}</div>)


    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      register(values);
    };

  return (
    <>

          <h3>Регистрация нового пользователя</h3>
          <Form
            name="normal_login"
            className="login-form"
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
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
              />
            </Form.Item>
            <Form.Item
              name="passwordConfirm"
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
                placeholder="Confirm your password"
              />
            </Form.Item>
           

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Register
              </Button>
              
            </Form.Item>
          </Form>
          {renderErrorMessage()}
          {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </>
      
  )
}

export default Register