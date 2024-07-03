import { React, useContext } from "react"
import { UserOutlined } from "@ant-design/icons"
import { Avatar, Space } from "antd"
import { Outlet, Link, useLocation } from "react-router-dom"

import "../Styles/Style.css"
import { StoreProvider, StoreContext } from "../StoreContext/StoreContext.jsx"

const Account = () => {
  function OrderList() {
    const { orders } = useContext(StoreContext)

    return (
      <div>
        {orders.map(({ id, address, products, orderDate, finishDate }) => (
          <div className="Order" key={id} id={id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>{address}</h3>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "35%",
          flex: "1 1 auto",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 50 }}>
          <img
            src="https://koshka.top/uploads/posts/2021-12/1638584723_6-koshka-top-p-melkii-kotenok-7.jpg"
            style={{
              maxWidth: 350,
              borderRadius: "50%",
              objectFit: "cover",
              aspectRatio: 1,
            }}
          />
          <Link className="UserNameLink">Имя пользователя</Link>
        </div>
      </div>
      <div style={{ flex: "1 1 auto", width: "65%" }}>
        <h3 style={{ fontSize: "xx-large", fontWeight: 550, margin: 50, marginTop: 50 }}>ЗАКАЗЫ</h3>
        <StoreProvider>
          <OrderList />
        </StoreProvider>
      </div>
    </div>
  )
}
export default Account
