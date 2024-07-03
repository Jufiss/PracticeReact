import ProductInOrder from "./ProductInOrder.jsx"
import { React, useContext } from "react"
import { BsCaretRightFill } from "react-icons/bs"
import { StoreProvider, StoreContext } from "../StoreContext/StoreContext.jsx"

const OrderList = () => {
  const { orders, calculateOrderTotal, getProductById } = useContext(StoreContext)

  return (
    <div>
      <h3 style={{ fontSize: "xx-large", fontWeight: 550, marginTop: 50 }}>ЗАКАЗЫ</h3>
      {console.log(orders)}
      {orders.map(({ id, address, products, orderDate, finishDate, payment, status }) => (
        <div className="Order" key={id} id={id}>
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <strong>способ оплаты</strong>
                {payment}
              </div>
              <div style={{ display: "flex", flexDirection: "column", marginLeft: "70px" }}>
                <strong>адрес</strong>
                {address}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "70px" }}>
              <strong>сумма заказа</strong>
              {calculateOrderTotal({ products })} ₽
            </div>
          </div>
          <div style={{ margin: "30px 0px 10px 0px" }}>
            <div>
              <label
                style={{
                  background: "#32CD32",
                  borderRadius: 15,
                  height: 30,
                  padding: "5px 15px 5px 15px",
                  color: "white",
                  fontWeight: "550",
                }}
              >
                {status}
              </label>
              <div style={{ display: "flex", marginTop: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: 18, fontWeight: 550 }}>{orderDate}</label>
                  <label s>дата заказа</label>
                </div>
                <div
                  style={{
                    width: "100%",
                    borderTop: "dotted 5px",
                    margin: "10px -10px 0px 10px ",
                  }}
                />
                <BsCaretRightFill
                  style={{ width: "30px", height: "30px", margin: "-3px 5px 0px 0px" }}
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label style={{ fontSize: 18, fontWeight: 550 }}>{finishDate}</label>
                  <label>получен</label>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 15 }}>
              <strong>состав заказа</strong>
              <div style={{ display: "flex", marginTop: 5 }}>
                {products.map(({ id, quantity }) => (
                  <div
                    className="Product"
                    key={id}
                    id={id}
                    style={{ display: "flex", alignItems: "end", marginRight: 20 }}
                  >
                    <ProductInOrder product={getProductById(id)} />{" "}
                    <label style={{ fontSize: 16 }}> x{quantity}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default OrderList
