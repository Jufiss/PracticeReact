import React, { useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { Layout as LayoutAntd, Menu } from "antd" 

import LogOff from "../LogOff/LogOff"

const { Header, Content, Footer } = LayoutAntd

 
const Layout = ({ user, setUser}) => {
  const [isOpenClose, setIsOpenClose] = useState(false);
  
  // Получаем в шапку элементы, которые будет видеть пользователь, в зависимости от своей роли
  const getMenuItems = () => {
  if (user.userRole === "admin") {
    return [
      { label: <Link to={"/"}>Главная</Link>, key: "1" },
      { label: <Link to={"/products"}>Товары</Link>, key: "2" },
      { label: <Link to={"/firm"}>Фирмы</Link>, key: "3" },
      { label: <Link to={"/category"}>Категории</Link>, key: "4" },
      { label: <Link to={"/orders"}>Заказы</Link>, key: "5" },
      { label: <Link to={`/cart?userName=${user.userName}`}>Корзина</Link>, key: "6" },
    ];
  } else {
    return [
      { label: <Link to={"/"}>Главная</Link>, key: "1" },
      { label: <Link to={`/cart?userName=${user.userName}`}>Корзина</Link>, key: "2" },
    ];
  }
};


  const toggleModalClose = () => {
    setIsOpenClose(true);
  };

  return (
    <LayoutAntd style={{minHeight: "100vh"}}>
        <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
         <div style={{ float: "right", color: "rgba(255, 255, 255, 0.65)", }} >
           {user.isAuthenticated ? ( <>
           <strong>{user.userName} </strong>
           <span className="nav-link" onClick={toggleModalClose}>Выход</span>
            
            <LogOff setUser={setUser} isOpenClose={isOpenClose} setIsOpenClose={setIsOpenClose}/>

          </> 
            ) : ( 
            <>
            <Link to="/login"><span className="nav-link">Вход</span></Link>
            <Link to="/register"><span className="nav-link">Регистрация</span></Link>
            <strong>Гость</strong>
            </>
           )} 
           </div> 
           <Menu theme="dark" mode="horizontal" items={getMenuItems()} className="menu" />
          </Header>
            <Content className="site-layout" style={{ padding: "0 50px", backgroundColor: "white", }}>
              <Outlet /> 
            </Content>
            {<Footer style={{ textAlign: "center" }}>Clothing Shop ©2024</Footer>}
    </LayoutAntd>
  )
}

export default Layout
