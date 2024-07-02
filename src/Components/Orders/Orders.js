import React, { useState, useEffect } from 'react';
import { Button, Select, message } from 'antd';

const { Option } = Select;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderStatuses, setOrderStatuses] = useState([]);
    const [selectedOrderStatuses, setSelectedOrderStatuses] = useState({}); // создаем состояние для всех выбранных статусов заказов

    useEffect(() => {
        const getOrders = async () => {
            const requestOptions = {
                method: 'GET'
            }
            try {
                const response = await fetch("api/Order/", requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.log(error);
            }
        }

        const getOrderStatuses = async () => {
            const requestOptions = {
                method: 'GET'
            }
            try {
                const response = await fetch("api/OrderStatus", requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch order statuses');
                }
                const data = await response.json();
                setOrderStatuses(data);
            } catch (error) {
                console.log(error);
            }
        }

        getOrders();
        getOrderStatuses();
    }, []);

    const handleEditOrderStatus = async (id) => {
        try {
            // Находим заказ с заданным идентификатором
            const newOrder = orders.find(o => o.id === id);

             // получаем выбранный статус для заказа из объекта с этим же id
            const selectedOrderStatus = selectedOrderStatuses[id];

            // проверка, чтобы нельзя было поменять на предыдущий статус
            if (selectedOrderStatus < newOrder.orderStatusId) {
                message.error('Статус нельзя изменить');
                throw new Error('Failed to update order status');
            }

            // формируем заказ с обновленным статусом заказа
            const updatedOrder = {
                ...newOrder,
                orderStatusId: selectedOrderStatus
            };

            // изменяем заказ
            const updatedOrders = orders.map(order => {
                if (order.id === id) {
                    return { ...order, orderStatusId: selectedOrderStatus };
                }
                return order;
            });

            const response = await fetch(`/api/Order/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedOrder),
            });

            
            if (response.ok){
            setOrders(updatedOrders); // перерисовываем все заказы
            message.success('Статус заказа успешно изменен');
        }
        } catch (error) {
            console.error('An error occurred:', error);
           
        }
    };

    const handleChange = (value, id) => {
        setSelectedOrderStatuses({ ...selectedOrderStatuses, [id]: value });
    };

    return (
        <>
            <div>
                <h3>Список всех заказов</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Номер</th>
                            <th>Дата</th>
                            <th>Статус</th>
                            <th>Сумма</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(({ id, number, orderDate, orderStatusId, sum }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{number}</td>
                                <td>{orderDate}</td>
                                <td>
                                    <Select defaultValue={orderStatusId} style={{ width: 150 }} onChange={(value) => handleChange(value, id)} disabled={orderStatusId === 4 || orderStatusId === 5}>
                                        {orderStatuses.map(status => (
                                            <Option key={status.id} value={status.id}>{status.name}</Option>
                                        ))}
                                    </Select>
                                </td>
                                <td>{sum} ₽</td>
                                <td>
                                    <Button onClick={() => handleEditOrderStatus(id)}>Изменить статус</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Orders;
