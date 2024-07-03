import ProductInOrder from "./ProductInOrder.jsx"
import { React, useContext } from "react"
import { BsCaretRightFill } from "react-icons/bs"
import { StoreProvider, StoreContext } from "../StoreContext/StoreContext.jsx"
import "../Styles/Style.css"

import { user } from "../StoreContext/StoreContext"
import { Button } from "antd"

const EditAccount = () => {
  const { orders, calculateOrderTotal, getProductById } = useContext(StoreContext)

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif", display: "flex", flexDirection: "column" }}>
      <h3 style={{ fontSize: "xx-large", fontWeight: 550, marginTop: 50 }}>ПРОФИЛЬ</h3>
      <strong className="AccountLabel">личная информация</strong>
      <input className="AccountInput" value={user.name} type="text" placeholder="Имя" />
      <input className="AccountInput" type="text" value={user.surname} placeholder="Фамилия" />
      <input className="AccountInput" type="text" value={user.surname2} placeholder="Отчество" />
      <strong className="AccountLabel">город</strong>
      <input className="AccountInput" type="text" value={user.city} placeholder="Город" />
      <strong className="AccountLabel">контакты</strong>
      <input
        className="AccountInput"
        type="text"
        value={user.phoneNumber}
        placeholder="Номер телефона"
      />
      <input
        className="AccountInput"
        type="text"
        value={user.email}
        placeholder="Электронная почта"
      />
      <Button type="primary">Сохранить</Button>
    </div>
  )
}
export default EditAccount
