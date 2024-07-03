import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { Card, Col, Row } from 'antd';


import "./Components/Styles/Style.css"

import Category from './Components/Category/Category'
import Firm from './Components/Firm/Firm'
import Products from './Components/Products/Products'
import SearchPage from './Components/SearchPage/SearchPage';
import Dress from './Components/Dresses/Dress';
import Dress1 from './Components/Dresses/Dress1';
import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"
import Register from "./Components/Register/Register"
import Orders from "./Components/Orders/Orders"
import ProductPage from "./Components/Products/ProductPage"
import CartInfo from "./Components/Cart/Cart"
import Account from "./Components/Account/Account"

const { Meta } = Card

const App = () => {
  const [user, setUser] = useState({ isAuthenticated: false, userName: "", userRole: "" })
  const [categories, setCategory] = useState([])

  useEffect(() => {
    const getUser = async () => {
      return await fetch("api/account/isauthenticated")
        .then((response) => {
          response.status === 401 && setUser({ isAuthenticated: false, userName: "", userRole: "" })
          return response.json()
        })
        .then(
          (data) => {
            if (typeof data !== "undefined" && typeof data.userName !== "undefined") {
              console.log(data)
              setUser({ isAuthenticated: true, userName: data.userName, userRole: data.userRole })
            }
          },
          (error) => {
            console.log(error)
          }
        )
    }
    getUser()
  }, [setUser])

  useEffect(() => {
    const getCategory = async () => {
      const requestOptions = {
        method: "GET",
      }
      return await fetch("api/Category/", requestOptions)
        .then((response) => response.json())
        .then(
          (data) => {
            console.log("Data:", data)
            setCategory(data)
          },
          (error) => {
            console.log(error)
          }
        )
    }
    getCategory()
  }, [setCategory])

  return (
    <BrowserRouter>
      {" "}
      {/* компонент, который оборачивает всё приложение и предоставляет контекст для работы с маршрутами*/}
      <Routes>
        {" "}
        {/* компонент, который определяет набор маршрутов и их соответствующие компоненты*/}
        {/* в каждом роуте мы прописываем, какие компоненты хотим отображать */}
        <Route
          path="/"
          element={
            <>
              <Layout user={user} setUser={setUser} />
            </>
          }
        >
          {/* Отображаем элементы на главной*/}
          <Route
            index
            element={
              <>
                <h1>Каталог</h1>

                <Row gutter={11}>
                  <div className="categories">
                    <Col>
                      <Link to={`/searchpage`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginBottom: 16 }}
                          cover={
                            <img
                              alt="example"
                              src="https://iblogshub.com/wp-content/uploads/2021/12/how-to-start-a-wholesale-clothing-business-online.jpg"
                              style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                          }
                        >
                          <Meta title="Bce" />
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  <div className="categories">
                    <Col>
                      <Link to={`/dress`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginBottom: 16 }}
                          cover={
                            <img
                              alt="example"
                              src="https://avatars.mds.yandex.net/get-mpic/12626365/2a0000018f9a7262b114ff63ca1b2b3004f0/600x800"
                              style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                          }
                        >
                          <Meta title="Платья" />
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  <div className="categories">
                    <Col>
                      <Link to={`/searchpage`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginBottom: 16 }}
                          cover={
                            <img
                              alt="example"
                              src="https://img.shopperboard.com/577813/580902846c0fc.jpg"
                              style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                          }
                        >
                          <Meta title="Юбки" />
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  <div className="categories">
                    <Col>
                      <Link to={`/searchpage`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginBottom: 16 }}
                          cover={
                            <img
                              alt="example"
                              src="https://fashionapp.ru/wp-content/uploads/2017/02/ostryi-nosok.jpg"
                              style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                          }
                        >
                          <Meta title="Обувь" />
                        </Card>
                      </Link>
                    </Col>
                  </div>

                  <div className="categories">
                    <Col>
                      <Link to={`/searchpage`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginBottom: 16 }}
                          cover={
                            <img
                              alt="example"
                              src="https://a.lmcdn.ru/img600x866/M/P/MP002XW003ZC_21539942_1_v1.jpeg"
                              style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                          }
                        >
                          <Meta title="Брюки" />
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  <div className="categories">
                    <Col>
                      <Link to={`/searchpage`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginBottom: 16 }}
                          cover={
                            <img
                              alt="example"
                              src="https://mechtastore.ru/pictures/product/middle/5066_middle.jpg"
                              style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                          }
                        >
                          <Meta title="Аксессуары" />
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  <div className="categories">
                    <Col>
                      <Link to={`/searchpage`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginBottom: 16 }}
                          cover={
                            <img
                              alt="example"
                              src="https://avatars.mds.yandex.net/get-mpic/5220508/2a0000018e99e443a5f3fce954d396ed8e2c/600x800"
                              style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                          }
                        >
                          <Meta title="Блузы и рубашки" />
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  <div className="categories">
                    <Col>
                      <Link to={`/searchpage`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginBottom: 16 }}
                          cover={
                            <img
                              alt="example"
                              src="https://images.2moodstore.com/upload/iblock/574/uv4uqyop516qivc0odg0y6tfovcjsp0v.jpg?img_type=pmain"
                              style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                          }
                        >
                          <Meta title="Джинсы" />
                        </Card>
                      </Link>
                    </Col>
                  </div>
                  <div className="categories">
                    <Col>
                      <Link to={`/searchpage`}>
                        <Card
                          hoverable
                          style={{ width: 240, marginBottom: 16 }}
                          cover={
                            <img
                              alt="example"
                              src="https://a.lmcdn.ru/product/M/P/MP002XW0BL7G_16593473_1_v1_2x.jpg"
                              style={{ width: "100%", height: "250px", objectFit: "cover" }}
                            />
                          }
                        >
                          <Meta title="Купальники и пляжная одежда" />
                        </Card>
                      </Link>
                    </Col>
                  </div>

                  {categories.map(({ id, name, imageLink }) => (
                    <div className="categories" key={id}>
                      <Col>
                        <Link to={`/searchpage?category=${id}`}>
                          <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={
                              <img
                                alt="example"
                                src={imageLink}
                                style={{ width: "100%", height: "250px", objectFit: "cover" }}
                              />
                            }
                          >
                            <Meta title={name} />
                          </Card>
                        </Link>
                      </Col>
                    </div>
                  ))}
                </Row>
              </>
            }
          />
          {/* отображает компоненты по определенному пути */}
          <Route path="/products" element={<Products user={user} />} />
          <Route path="/firm" element={<Firm user={user} />} />
          <Route path="/category" element={<Category user={user} />} />
          <Route path="/login" element={<LogIn user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register user={user} setUser={setUser} />} />
          <Route path="/orders" element={<Orders user={user} />} />
          <Route path="/productpage" element={<ProductPage user={user} />} />
          <Route path="/searchpage" element={<SearchPage user={user} />} />
          <Route path="/dress" element={<Dress user={user} />} />
          <Route path="/dress1" element={<Dress1 user={user} />} />

          <Route path="/account" element={<Account />} />

          <Route path="/cart" element={<CartInfo user={user} />} />
          {/* обработка несуществующей страницы */}
          <Route path="*" element={<h3>404</h3>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>

  <App />
  // </React.StrictMode>
)
