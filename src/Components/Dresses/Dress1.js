import React, { useState, useEffect } from 'react';
import { Card, Image, Button, Select, Space } from 'antd';
import { useLocation } from 'react-router-dom';

import './Dress.css'

const Dress1 = ({ user }) => {
    const [product,] = useState(null);


    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const handleAddToCart = async () => {


    };


    return (
        <>
            <Card title={"Amie Платье"}>
                <div className="product-block-info">
                    <div className="product-image">
                        <Image style={{ width: "400px", height: 400, objectFit: 'contain' }} src="https://a.lmcdn.ru/product/M/P/MP002XW0Q3M8_22985397_1_v1_2x.jpg" alt={"Amie Платье"}></Image>
                    </div>
                    <div className="product-description">
                        <p className="product-tag">Цена: <span>4000 ₽</span></p>

                        <p className="product-tag">Цвет: <span>Черный</span></p>
                        <p className="product-tag">Размер: </p>

                        <Select
                            defaultValue="M"
                            style={{
                                width: 120,
                            }}
                            onChange={handleChange}
                            options={[
                                {
                                    value: 'XS',
                                    label: 'XS',
                                },
                                {
                                    value: 'S',
                                    label: 'S',
                                    disabled: true,
                                },
                                {
                                    value: 'M',
                                    label: 'M',
                                },
                                {
                                    value: 'L',
                                    label: 'L',
                                },
                                {
                                    value: 'XL',
                                    label: 'XL',
                                    
                                },
                            ]}
                        />
                        <p className="product-tag">Размер на модели: S INT. Параметры модели: рост 172 см, грудь 83 см, талия 62 см, бедра 92 см.</p>
                        <Button onClick={handleAddToCart} disabled={"Добавить в корзину"}></Button>
                    </div>
                </div>

            </Card>
        </>
    );
};

export default Dress1;