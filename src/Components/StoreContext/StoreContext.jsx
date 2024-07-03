import React, { useState } from "react"

const Product = {
  id: "", // Уникальный идентификатор товара
  name: "", // Название товара
  category: "", // Категория товара
  price: 0, // Цена товара
  image: "", // URL изображения товара
  color: "",
  description: "",
}

const initialCategories = [
  {
    id: 1,
    name: "Платья",
  },
  {
    id: 2,
    name: "Юбки",
  },
  {
    id: 3,
    name: "Обувь",
  },
  {
    id: 4,
    name: "Брюки",
  },
  {
    id: 5,
    name: "Аксессуары",
  },
  {
    id: 6,
    name: "Блузки",
  },
  {
    id: 7,
    name: "Рубашки",
  },
  {
    id: 8,
    name: "Купальники и пляжная одежда",
  },
]

const initialProducts = [
  {
    id: "1",
    name: "Amie Платье",
    category: "1",
    price: 4000,
    image: "https://a.lmcdn.ru/product/M/P/MP002XW0Q3M8_22985397_1_v1_2x.jpg",
    color: "Черный",
    description:
      "Размер на модели: S INT. Параметры модели: рост 172 см, грудь 83 см, талия 62 см, бедра 92 см.",
  },
  {
    id: "2",
    name: "Amie Платье",
    category: "1",
    price: 4000,
    image: "https://a.lmcdn.ru/product/M/P/MP002XW0Q3M8_22985397_1_v1_2x.jpg",
    color: "Черный",
    description:
      "Размер на модели: S INT. Параметры модели: рост 172 см, грудь 83 см, талия 62 см, бедра 92 см.",
  },
  {
    id: "3",
    name: "Amie Платье",
    category: "1",
    price: 4000,
    image: "https://a.lmcdn.ru/product/M/P/MP002XW0Q3M8_22985397_1_v1_2x.jpg",
    color: "Черный",
    description:
      "Размер на модели: S INT. Параметры модели: рост 172 см, грудь 83 см, талия 62 см, бедра 92 см.",
  },
  {
    id: "4",
    name: "Amie Платье",
    category: "1",
    price: 4000,
    image: "https://a.lmcdn.ru/product/M/P/MP002XW0Q3M8_22985397_1_v1_2x.jpg",
    color: "Черный",
    description:
      "Размер на модели: S INT. Параметры модели: рост 172 см, грудь 83 см, талия 62 см, бедра 92 см.",
  },
  {
    id: "5",
    name: "Amie Платье",
    category: "1",
    price: 4000,
    image: "https://a.lmcdn.ru/product/M/P/MP002XW0Q3M8_22985397_1_v1_2x.jpg",
    color: "Черный",
    description:
      "Размер на модели: S INT. Параметры модели: рост 172 см, грудь 83 см, талия 62 см, бедра 92 см.",
  },
  {
    id: "6",
    name: "Amie Платье",
    category: "1",
    price: 4000,
    image: "https://a.lmcdn.ru/product/M/P/MP002XW0Q3M8_22985397_1_v1_2x.jpg",
    color: "Черный",
    description:
      "Размер на модели: S INT. Параметры модели: рост 172 см, грудь 83 см, талия 62 см, бедра 92 см.",
  },
  // Добавьте сюда остальные товары
]

const initialOrders = [
  {
    id: "1",
    orderDate: "28.11.2024",
    finishDate: "30.11.2024",
    address: "ул.Кооперативная,д.49,кв.41",
    payment: "Картой",
    products: [
      {
        id: "1",
        quantity: 2,
      },
      {
        id: "2",
        quantity: 1,
      },
    ],
  },
  // Добавьте сюда остальные заказы
]

const StoreContext = React.createContext({
  products: [],
  categories: [],
  orders: [],
})

const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts)
  const [categories, setCategories] = useState(initialCategories)
  const [orders, setOrders] = useState(initialOrders)

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        categories,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export { StoreContext, StoreProvider }
