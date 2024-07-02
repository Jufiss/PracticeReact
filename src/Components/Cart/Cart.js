import React, { useState, useEffect } from 'react';
import { List, Button, Modal, message} from 'antd';
import { Link, useLocation } from 'react-router-dom';

function Cart({ user }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteCartItemId, setDeleteCartItemId] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userNameParam = queryParams.get("userName");
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const requestOptions = {
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`api/Cart/${userNameParam}`, requestOptions);
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        setCartProducts(data.cartProducts);
        console.log(data.cartProducts);
      } catch (error) {
        console.error('An error occurred while fetching cart:', error);
      }
    };
  
    fetchCart();
    
    const fetchProducts = async () => {
      try {
        const requestOptions = {
          method: 'GET', 
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch("api/Products", requestOptions);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('An error occurred while fetching products:', error);
      }
    };
    
    fetchProducts();
  }, [userNameParam]);

  const decreaseCount = async (itemId) => {

    // переносим все товары из корзины в updatedCartItems и уменьшаем count на 1
    const updatedCartItems = cartProducts.map(item => {
      if (item.id === itemId) {
        return { ...item, count: item.count - 1 };
      }
      return item;
    });
    const updatedCartItem = updatedCartItems.find(item => item.id === itemId); // находим товар, который обновляем

    if (updatedCartItem.count >= 1) {
      setCartProducts(updatedCartItems);  // обновляем все товары на странице
    }
      else{
        message.error('Нельзя уменьшить товар в корзине до 0');
        console.log('Cannot decrease count');
        return;
      }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: updatedCartItem.count, cartId: updatedCartItem.cartId, productId: updatedCartItem.productId, id: updatedCartItem.id })
    };

    try {
        const response = await fetch(`api/Cart/${updatedCartItem.id}`, requestOptions);
        if (!response.ok) {
            throw new Error('Failed to update cart');
        }
    } catch (error) {
        console.error('An error occurred while updating cart:', error);
    }
};


const increaseCount = async (itemId) => {
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

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count: updatedCartItem.count, cartId: updatedCartItem.cartId, productId: updatedCartItem.productId, id: updatedCartItem.id }) // Отправляем только обновленное количество товара для конкретного cartProduct
  }

  try {
    const response = await fetch(`api/Cart/${updatedCartItem.id}`, requestOptions);
    if (!response.ok) {
      throw new Error('Failed to update cart');
    }
  } catch (error) {
    console.error('An error occurred while updating cart:', error);
  }
};

// удаляем по айди, который получаем в getDeleteCartItemId 
const deleteCartItem = async () => {
  const requestOptions = {
    method: 'DELETE'
};

try {
    const response = await fetch(`api/Cart/${deleteCartItemId}`, requestOptions);
    if (response.ok) {
      setCartProducts(cartProducts.filter(cartProduct => cartProduct.id !== deleteCartItemId))
      setIsOpen(false);
      setDeleteCartItemId(null);
      message.success('Товар удален из корзины')
    }
} catch (error) {
    console.error('An error occurred while deleting the product:', error);
} 
}

const getDeleteCartItemId = (id) => {
  setDeleteCartItemId(id); // получаем айди товара
  setIsOpen(true) // открываем окно модальное
}

// отменяем удаление в окне модальном
const canceldeleteCartItem = () => {
  setIsOpen(false);
  setDeleteCartItemId(null);
}

const decreaseStockProduct = async () => {
  try {
    for (const cartProduct of cartProducts) { // проходимся по каждому товару из корзины
      const product = products.find(p => p.id === cartProduct.productId); // находим товар из корзины во всех товарах

      // создаем обновленный товар, со всеми полями, но с количеством убавленым от кол-ва товара в корзине
      const updatedProduct = {
        ...product, 
        count: product.count - cartProduct.count 
      };

      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      };

      const response = await fetch(`api/Products/${product.id}`, requestOptions); // обновляем товар
      if (!response.ok) {
        console.error('Failed to decrease stock for product:', product.id);
      }
    }

    console.log('Stock decreased successfully.');
  } catch (error) {
    console.error('An error occurred while decreasing stock:', error);
  }
};



const resetCart = async () => {
  try {
    for (const cartProduct of cartProducts) { // проходимся по всем товарам в корзине
      const requestOptions = {
        method: 'DELETE'
      };

      const response = await fetch(`api/Cart/${cartProduct.id}`, requestOptions); // и удалям каждый
      if (!response.ok) {
        console.error('Failed to delete product from cart:', cartProduct.id);
      }
    }

    // После удаления всех товаров из корзины обновляем состояние корзины (делаем пустым)
    setCartProducts([]);
    console.log('All products deleted from cart successfully.');
  } catch (error) {
    console.error('An error occurred while deleting products from cart:', error);
  }
};


const makeOrder = async () => {
  const currentDate = new Date();
  const newOrder = {
    orderStatusId: 1,
    sum: calculateTotalPrice(),
    orderDate: currentDate.toISOString(),
  }
  try {
      const response = await fetch(`/api/Order?userName=${user.userName}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrder),
      });
      if (response.ok) {
        console.log(newOrder)
        decreaseStockProduct(); // уменьшаем кол-во товара в общих товарах
        resetCart(); // очищаем корзину
        message.success('Заказ совершён!');
      }
  } catch (error) {
      console.error('An error occurred while making order:', error);
  }
}

const calculateTotalPrice = () => {
  let totalPrice = 0;
  // Проход по каждому товару в корзине
  cartProducts.forEach(product => { 
    const itemProduct = products.find(p => p.id === product.productId);  // Поиск соответствующего товара в массиве всех товаров по его идентификатору
    if (itemProduct) {  // Если товар найден, добавляем его стоимость к общей стоимости
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
          const itemProduct = products.find(p => p.id === product.productId); // Находим соответствующий товар в массиве всех товаров по его идентификатору
          if (!itemProduct) return null; // Если товар не найден, пропускаем его отображение
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
                </Button>
                ,
                <span>все вместе: {product.count * (products.find(p => p.id === product.productId).price)} ₽</span>,
              ]}
            >
              <List.Item.Meta
                title={
                  <Link to={`/productpage?id=${itemProduct.id}`}>
                    <div style={{fontSize: 18}}>
                    {itemProduct.name} 
                    </div>
                  </Link>
                }
                description={
                  <>
                  <div>
                  {itemProduct.color}
                  {itemProduct.smell}
                  <div style={{color: 'black', fontSize: 20, paddingTop: 32}}>{itemProduct.price} ₽ <br/></div>
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
      <div style={{paddingLeft: "75%"}}>
        <span style={{marginRight: 12}}>Итого: {calculateTotalPrice()} ₽</span>
        <Button onClick={makeOrder}>Купить</Button>
      </div>
      )}
    </div>
    </>
  );
}

export default Cart;
