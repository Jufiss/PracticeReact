import React, { useState } from "react"
import { Outlet, Link, useLocation } from "react-router-dom"
import { Layout as LayoutAntd, Menu, Badge, ConfigProvider } from "antd"

import { IoCartOutline } from "react-icons/io5"
import { HiOutlineUserCircle } from "react-icons/hi2"

import LogOff from "../LogOff/LogOff"
import "../Styles/Style.css"

const { Header, Content, Footer } = LayoutAntd

const Layout = ({ user, setUser }) => {
  const [isOpenClose, setIsOpenClose] = useState(false)

  const items = [
    {
      key: "/",
      label: (
        <Link to="/" className="TopLink">
          Каталог
        </Link>
      ),
      position: "left",
    },
    {
      key: "/cart",
      icon: (
        <Badge
          count={2}
          style={{
            backgroundColor: "black",
            borderColor: "black",
            color: "white",
          }}
          size="small"
        >
          <IoCartOutline style={{ width: "200%", height: "200%" }} />
        </Badge>
      ),
      label: <Link to="/cart"></Link>,
      position: "right",
    },
    {
      key: "/account/orders",
      icon: <HiOutlineUserCircle />,
      label: <Link to="/account/orders"></Link>,
      position: "right",
    },
  ]

  const MenuComponent = ({ items }) => {
    const leftItems = items.filter((item) => item.position === "left")
    const rightItems = items.filter((item) => item.position === "right")

    return (
      <Menu theme="#898888" mode="horizontal" className="menu">
        {leftItems.map((item) => (
          <Menu.Item key={item.key}>{item.label}</Menu.Item>
        ))}
        <Menu.Item key="spacer" style={{ flexGrow: 0.999 }} /> {/* пространство для разделения */}
        {rightItems.map((item) => (
          <Menu.Item key={item.key} className="MenuItem" icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    )
  }

  const getMenuItems = () => {
    if (user.userRole === "admin") {
      return [
        { label: <Link to={"/"}>Главная</Link>, key: "1" },
        { label: <Link to={"/products"}>Товары</Link>, key: "2" },
        { label: <Link to={"/firm"}>Фирмы</Link>, key: "3" },
        { label: <Link to={"/category"}>Категории</Link>, key: "4" },
        { label: <Link to={"/orders"}>Заказы</Link>, key: "5" },
        { label: <Link to={`/cart?userName=${user.userName}`}>Корзина</Link>, key: "6" },
      ]
    } else if (user.userRole === "user") {
      return [
        { label: <Link to={"/"}>Главная</Link>, key: "1" },
        { label: <Link to={`/cart?userName=${user.userName}`}>Корзина</Link>, key: "2" },
      ]
    } else if (user.userRole === "") {
      return [{ label: <Link to={"/"}>Главная</Link>, key: "1" }]
    }
  }

  const toggleModalClose = () => {
    setIsOpenClose(true)
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: "linear-gradient(0deg, rgba(245,245,245,1) 0%, rgba(255,255,255,0) 100%)",
            headerHeight: 60,
          },
          Menu: {
            darkItemBg: "#C0C0C0",
            darkItemColor: "black",
            iconSize: 24,
            itemPaddingInline: 7,
            darkItemSelectedBg: "transperent",
            activeBarBorderWidth: 0,
          },
        },
      }}
    >
      <LayoutAntd style={{ minHeight: "100vh" }}>
        <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
          <MenuComponent items={items} />
        </Header>
        <Content className="site-layout" style={{ padding: "0 50px", backgroundColor: "white" }}>
          <Outlet />
        </Content>
        {<Footer style={{ textAlign: "center" }}>Clothing Shop ©2024</Footer>}
      </LayoutAntd>
    </ConfigProvider>
  )
}

export default Layout
