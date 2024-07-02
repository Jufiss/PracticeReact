import React, { useState, useEffect } from 'react';
import { Card, Image, Button, message } from 'antd';
import { useLocation } from 'react-router-dom';

import './ProductPage.css'

const ProductPage = ({ user }) => {
    const [product, setProduct] = useState(null);
    const [isInCart, setIsInCart] = useState(false); // состояние для проверки наличия товара в корзине
    const location = useLocation();// получаем url
    const queryParams = new URLSearchParams(location.search); //получаем параметр из url
    const idParam = queryParams.get("id"); // смотрим id из полученного параметра

  
    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await fetch(`/api/Products/${idParam}`);


                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('An error occurred while fetching products:', error);
            }
        };
        getProducts();

    }, [idParam]);


    // Проверка корзины юзера, который зашел на товар
    useEffect(() => {
      const fetchCart = async () => {
        try {
          const requestOptions = {
            method: 'GET', 
            headers: { 'Content-Type': 'application/json' },
          };
          const response = await fetch(`api/Cart/${user.userName}`, requestOptions);
          if (!response.ok) {
            throw new Error('Failed to fetch cart');
          }
          const data = await response.json();
          // если находит в корзине текущий товар, то возвращет true
          const isInCart = data.cartProducts && data.cartProducts.some(item => item.productId === parseInt(idParam));
              setIsInCart(isInCart);
        } catch (error) {
          console.error('An error occurred while fetching cart:', error);
        }
      };
    
      fetchCart();

    }, [idParam, user.userName, isInCart])

    // добавляем товар в корзину
    const handleAddToCart = async () => {

      const newProductToCart = {
        count: 1,
        productId: idParam,
      }
      try {
          const response = await fetch(`/api/Cart?userName=${user.userName}`, 
          {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(newProductToCart),
          });
          
          if (!response.ok) {
              throw new Error('Failed to add product to cart');
          }
          setIsInCart(true); // После добавления сразу блокируем кнопку
          message.success('Товар успешно добавлен в корзину!');
      } catch (error) {
          console.error('An error occurred while adding product to cart:', error);
      }
  };


  if (!product) {
    return <div>Товар не найден</div>;
  }


  return (
    <>
    <Card title={product.name}>
      <div className="product-block-info">
      <div className="product-image">
        <Image style={{ width: "400px", height: 400, objectFit: 'contain' }} src={product.imageLink} alt={product.name}></Image>
      </div>
      <div className="product-description">
        <p className="product-tag">Цена: <span>{product.price} ₽</span></p>
        <p className="product-tag">Бренд: <span>{product.firm.name}</span></p>
        {(product.smell !== null && product.smell !== "") && (
        <p className="product-tag">Запах: <span>{product.smell}</span></p>)}
        {(product.color !== null && product.color !== "") && (
        <p className="product-tag">Цвет: <span>{product.color}</span></p>)}
        <p className="product-tag">Способ применения: {product.useMethod}</p>
        <p className="product-tag">Bec: {product.weight}</p>
        <p className="product-tag">Описание: {product.description}</p>
        <Button onClick={handleAddToCart} disabled={isInCart || product.count < 1}>{!isInCart ?("Добавить в корзину") : ("Уже в корзине")}</Button> {product.count < 1 && <p style={{ color: 'red' }}>Товар закончился</p>}
      </div>
    </div>
    
    </Card>
    </>
  );
};

export default ProductPage;