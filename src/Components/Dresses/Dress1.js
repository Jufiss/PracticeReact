import React, { createElement, useState } from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Card, Image, Button, Select, Tooltip, FloatButton } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import Comments from './Comments';
import './Dress.css';

const Dress1 = ({ user }) => {
    const [product] = useState(null);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    const navigate = useNavigate();

    const handleFloatButtonClick = () => {
        navigate('/add');
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
                            style={{ width: 120 }}
                            onChange={handleChange}
                            options={[
                                { value: 'XS', label: 'XS' },
                                { value: 'S', label: 'S', disabled: true },
                                { value: 'M', label: 'M' },
                                { value: 'L', label: 'L' },
                                { value: 'XL', label: 'XL' },
                            ]}
                        />
                        <p className="product-tag">Размер на модели: S INT. Параметры модели: рост 172 см, грудь 83 см, талия 62 см, бедра 92 см.</p>
                        <Button style={{ width: '200px' }}>Добавить в корзину</Button>
                    </div>
                </div>
            </Card>

            <FloatButton onClick={handleFloatButtonClick} />

            <Comments
                commentsUrl="http://localhost:3000/comments"
                currentUserId="1"
            />
        </>
    );
};

export default Dress1;
