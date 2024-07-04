import { React, useContext } from "react"
import { Link, Outlet } from "react-router-dom"

import "../Styles/Style.css"
import { StoreProvider, StoreContext } from "../StoreContext/StoreContext.jsx"
import { ConfigProvider, Menu } from "antd"

import { user } from "../StoreContext/StoreContext"

const Account = () => {
  const { orders, calculateOrderTotal, getProductById } = useContext(StoreContext)
  const items = [
    {
      key: "/",
      label: (
        <Link to="/account/edit" className="UserNameLink">
          {user.name + " " + user.surname}
        </Link>
      ),
    },

    {
      key: "/account/orders",
      label: (
        <Link to="/account/orders" className="AcoountButton">
          мои заказы
        </Link>
      ),
    },
    {
      key: "/account",
      label: (
        <Link to="/login" className="AcoountButton">
          выход
        </Link>
      ),
    },
  ]

  return (
    <StoreProvider>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemSelectedBg: "transperent",
              itemHoverBg: "transperent",
              itemActiveBg: "transperent",
              itemHoverColor: "#deb887",
              itemSelectedColor: "#deb887",
            },
          },
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "35%",
              flex: "1 1 auto",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 50 }}
            >
              <img
                src="https://koshka.top/uploads/posts/2021-12/1638584723_6-koshka-top-p-melkii-kotenok-7.jpg"
                style={{
                  maxWidth: 350,
                  borderRadius: "50%",
                  objectFit: "cover",
                  aspectRatio: 1,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Menu defaultSelectedKey={["/account/orders"]} items={items} />
              </div>
            </div>
          </div>
          <div style={{ flex: "1 1 auto", width: "65%" }}>
            <Outlet />
          </div>
        </div>
      </ConfigProvider>
    </StoreProvider>
  )
}
export default Account
