import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import ProductsUpdate from '../Products/ProductsUpdate';
import ProductsCreate from './ProductsCreate';

import { Modal } from 'antd';


const Products = ({ user }) => {
    const [editingProductId, setEditingProductId] = useState(null); // Состояние для хранения id товара, который собираемся редактировать
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // булевая для модального окна 
    const [isOpenEditModal, setIsOpenEditModal] = useState(false); // булевая для модального окна редактирования
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false); // булевая для модального окна удаления
    const [deleteProductId, setDeleteProductId] = useState(null); // Состояние для хранения id товара, который собираемся удалить

    const removeProduct = (removeId) => setProducts(products.filter(product => product.id !== removeId)); // функция для отрисовки товаров после удаления.

    useEffect(() => {
        const getProducts = async () => {
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
                console.log(data)
                
            } catch (error) {
                console.error('An error occurred while fetching products:', error);
            }
        };
        getProducts();
    }, [setProducts]);

    const deleteItem = (id) => {
        setDeleteProductId(id);
        setIsConfirmationModalOpen(true);
    };

    const confirmDelete = async () => {
        const requestOptions = {
            method: 'DELETE'
        };

        try {
            const response = await fetch(`api/Products/${deleteProductId}`, requestOptions);
            if (response.ok) {
                removeProduct(deleteProductId);
                console.log('Product deleted successfully.');
            } else {
                console.error('Failed to delete product.');
            }
        } catch (error) {
            console.error('An error occurred while deleting the product:', error);
        } finally {
            setIsConfirmationModalOpen(false);
            setDeleteProductId(null);
        }
    };

    const cancelDelete = () => {
        setIsConfirmationModalOpen(false);
        setDeleteProductId(null);
    };


    const handleEditClick = (id) => {
        setEditingProductId(id);
        setIsOpenEditModal(true);
    }

    // Рендер товаров, после подтверждения обновления товара
    const handleProductUpdate = (updatedProduct) => {
        // Обновляем состояние продуктов, заменяя старый продукт на обновленный
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === updatedProduct.id ? updatedProduct : product, 
            )
        );
        setEditingProductId(null);
        setIsOpenEditModal(false);
        console.log(updatedProduct)
    };


    return (
        <React.Fragment>
            {console.log(products)}
            {user.userRole === "admin" ? ( 
                <>
            <Button onClick={() => setIsOpen(true)} className="btn btn-add" buttonText="Создать товар" />
            <h3>Список товаров</h3>
                <ProductsCreate products={products} setProducts={setProducts} isOpen={isOpen} setIsOpen={setIsOpen}/>
                </>):(<h3>Список товаров</h3>)}
            {products.map(({ id, name, description, categoryId, category, price, count, firm, color, smell, imageLink, weight, useMethod }) => (
                <div className="products" key={id} id={id}>
                    <hr />
                    <span>ID: {id}</span><br />
                    <strong> Название - </strong> <span>{name}</span>
                    <br />
                    <strong>Описание - </strong> <span>{description}</span>
                    <br />
                    <strong>Категория - </strong> <span>{category.name}</span>
                    <br />
                    <strong>Цена - </strong> <span>{price}</span>
                    <br />
                    <strong>Кол-во в наличии - </strong> <span>{count}</span>
                    <br />
                    <strong>Фирма - </strong> <span>{firm.name}</span>
                    <br />
                    {(color !== null && color !== "") && (
                        <>
                            <strong>Цвет - </strong> <span>{color}</span>
                            <br />
                        </>
                    )}
                    {(smell !== null && smell !== "") && (
                        <>
                            <strong>Запах - </strong> <span>{smell}</span>
                            <br />
                        </>)}
                    {(imageLink !== null && imageLink !== "") && (
                        <>
                            <strong>Изображение - </strong> <span>{imageLink}</span>
                            <br />
                        </>)}
                    {(weight !== null && weight !== "") && (
                        <>
                            <strong>Bec - </strong> <span>{weight}</span>
                            <br />
                        </>)}
                    {(useMethod !== null && useMethod !== "") && (
                        <>
                            <strong>Способ применения - </strong> <span>{useMethod}</span>
                            <br />
                        </>)}
                    {user.userRole === "admin" ? (
                        <>
                        <Button onClick={() => handleEditClick(id)} className="btn btn-add" buttonText="Редактировать" />
                        <Button onClick={() => deleteItem(id)} className="btn btn-del" buttonText="Удалить" />
                        </>
                    ):("")}
                    {editingProductId === id && 
                            <ProductsUpdate productId={id} updateProduct={handleProductUpdate} isOpenEditModal={isOpenEditModal} setIsOpenEditModal={setIsOpenEditModal} />
                    }
                    
                </div>
            ))}
            <Modal open={isConfirmationModalOpen} onOk={confirmDelete} onCancel={cancelDelete}>
                <p>Вы уверены, что хотите удалить этот товар?</p>
            </Modal>
            
        </React.Fragment>
    );
};

export default Products;
