import React, { useState } from 'react';
import { List, Button, Modal, message } from 'antd';
import { Link } from 'react-router-dom';

function Cart({ user }) {
  const staticCartProducts = [
    {
      id: 1,
      count: 2,
      cartId: 101,
      productId: 1001
    },
    {
      id: 2,
      count: 1,
      cartId: 102,
      productId: 1002
    }
  ];

  const staticProducts = [
    {
      id: 1001,
      name: "Юбка миди из твида",
      color: "Желтый",
      size: "S",
      price: 10000,
      imageLink: "https://images.2moodstore.com/upload/iblock/9b9/30e9ccoad05cl2h6r1p8wmz82wa13mg7.jpg?img_type=pmain",
      count: 10
    },
    {
      id: 1002,
      name: "Nataly Платье",
      color: "Бежевый",
      size: "M",
      price: 5500,
      imageLink: "https://a.lmcdn.ru/product/M/P/MP002XW00ESG_23678000_1_v1.jpeg",
      count: 5
    }
  ];

  const [cartProducts, setCartProducts] = useState(staticCartProducts);
  const [products] = useState(staticProducts);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteCartItemId, setDeleteCartItemId] = useState(null);

  const decreaseCount = (itemId) => {
    const updatedCartItems = cartProducts.map(item => {
      if (item.id === itemId) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    const updatedCartItem = updatedCartItems.find(item => item.id === itemId);

    if (updatedCartItem.count >= 1) {
      setCartProducts(updatedCartItems);
    } else {
      message.error('Нельзя уменьшить товар в корзине до 0');
      console.log('Cannot decrease count');
      return;
    }
  };

  const increaseCount = (itemId) => {
    const updatedCartItems = cartProducts.map(item => {
      if (item.id === itemId) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });

    const updatedCartItem = updatedCartItems.find(item => item.id === itemId);
    const product = products.find(product => product.id === updatedCartItem.productId);

    if (updatedCartItem.count <= product.count) {
      setCartProducts(updatedCartItems);
    } else {
      message.error('Нельзя увеличить товар больше имеющегося на складе');
      console.log('Cannot increase count, exceeds available stock');
      return;
    }
  };

  const deleteCartItem = () => {
    setCartProducts(cartProducts.filter(cartProduct => cartProduct.id !== deleteCartItemId));
    setIsOpen(false);
    setDeleteCartItemId(null);
    message.success('Товар удален из корзины');
  };

  const getDeleteCartItemId = (id) => {
    setDeleteCartItemId(id);
    setIsOpen(true);
  };

  const canceldeleteCartItem = () => {
    setIsOpen(false);
    setDeleteCartItemId(null);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartProducts.forEach(product => {
      const itemProduct = products.find(p => p.id === product.productId);
      if (itemProduct) {
        totalPrice += product.count * itemProduct.price;
      }
    });
    return totalPrice;
  };

  return (
    <>
      <div>
        <h2>Ваша корзина</h2>
        <List
          itemLayout="horizontal"
          dataSource={cartProducts}
          renderItem={(product) => {
            const itemProduct = products.find(p => p.id === product.productId);
            if (!itemProduct) return null;
            return (
              <List.Item
                actions={[
                  <Button style={{ fontSize: 28 }} type="link" danger onClick={() => decreaseCount(product.id)}>
                    -
                  </Button>,
                  <span>{product.count}</span>,
                  <Button style={{ fontSize: 28 }} type="link" onClick={() => increaseCount(product.id)}>
                    +
                  </Button>,
                  <Button onClick={() => getDeleteCartItemId(product.id)} type="link" danger>
                    Remove
                  </Button>,
                  <span>все вместе: {product.count * itemProduct.price} ₽</span>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Link to={`/productpage?id=${itemProduct.id}`}>
                      <div style={{ fontSize: 18 }}>
                        {itemProduct.name}
                      </div>
                    </Link>
                  }
                  description={
                    <>
                      <div>
                        <div>Цвет {itemProduct.color}</div>
                        <div> Размер {itemProduct.size}</div>
                        <div style={{ color: 'black', fontSize: 20, paddingTop: 32 }}>{itemProduct.price} ₽ <br /></div>
                      </div>
                    </>
                  }
                  avatar={<img alt={itemProduct.name} src={itemProduct.imageLink} style={{ width: 128, height: 128, objectFit: 'contain' }} />}
                />
              </List.Item>
            );
          }}
        />
        <Modal open={isOpen} onCancel={canceldeleteCartItem} onOk={deleteCartItem}>
          <p>Вы уверены, что хотите удалить товар из корзины?</p>
        </Modal>
        {cartProducts.length > 0 && (
          <div style={{ paddingLeft: "75%" }}>
            <span style={{ marginRight: 12 }}>Итого: {calculateTotalPrice()} ₽</span>
            <Button onClick={() => message.success('Заказ совершён!')}>Купить</Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
