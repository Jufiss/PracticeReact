import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

const ProductsUpdate = ({ productId, updateProduct, isOpenEditModal, setIsOpenEditModal }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [firms, setFirms] = useState([]);
    const [selectedFirmId, setSelectedFirmId] = useState('');
    const [editingProduct, setEditingProduct] = useState(null); 
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`api/Products/${productId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch product, status: ${response.status}`);
                }
                const data = await response.json();
                setEditingProduct(data);
                setSelectedCategoryId(data.categoryId.toString()); 
                setSelectedFirmId(data.firmId.toString()); 
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchProduct();

        const fetchCategories = async () => {
            try {
                const response = await fetch("api/Category");
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();

        const fetchFirms = async () => {
            try {
                const response = await fetch("api/Firm");
                if (!response.ok) {
                    throw new Error('Failed to fetch firms');
                }
                const data = await response.json();
                setFirms(data); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchFirms();
    }, [productId]);


    // меняем поля для editingProduct
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // обновляем состояние редактируемого продукта, добавляя новое значение поля 
        setEditingProduct(prevState => ({
            ...prevState, 
            [name]: value,
        }));
    }

    // Обновляем категорию, после обновления товара
    useEffect(() => {
         // Находим выбранную категорию по её идентификатору
        const selectedCategory = categories.find(category => category.id === parseInt(selectedCategoryId));
          // Если выбранная категория найдена, обновляем состояние редактируемого продукта 
        if (selectedCategory) {
            setEditingProduct(prevState => ({
                ...prevState,
                category: selectedCategory,
                categoryId: selectedCategoryId
            }));
        }
    }, [selectedCategoryId, categories]);

    // Обновляем фирму, после обновления товара
    useEffect(() => {
        const selectedFirm = firms.find(firm => firm.id === parseInt(selectedFirmId));
        if (selectedFirm) {
            setEditingProduct(prevState => ({
                ...prevState,
                firm: selectedFirm,
                firmId: selectedFirmId
            }));
        }
    }, [selectedFirmId, firms]);

    // подтверждаем измененния
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingProduct)
        };
    
        try {
            const response = await fetch(`api/Products/${editingProduct.id}`, requestOptions);
            console.log(response.status); 
            if (!response.ok) {
                throw new Error('Failed to update product');
            }
            
            if (response.status === 204) {
                updateProduct(editingProduct); 
            } else if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                updateProduct(data);
                setIsOpenEditModal(false);
            } else {
                throw new Error('Failed to update product: Unexpected response status');
            }
            
        } catch (error) {
            console.error(error);
        }
    };

    const cancelEdit = () => {
        setIsOpenEditModal(false);
    };

    
    

    if (!editingProduct) {
        return <div>Loading...</div>;
    }

    return (
        <React.Fragment>
            <Modal open={isOpenEditModal} onOk={handleSubmit} onCancel={cancelEdit}>
            <form onSubmit={handleSubmit}>
                <label>Название: </label><br/>
                <input type="text" name="name" value={editingProduct.name} onChange={handleInputChange} required />
                <br/>
                <label>Описание: </label><br/>
                <textarea style={{width: "90%", height: 100}} type="text" name="description" value={editingProduct.description} onChange={handleInputChange} required />
                <br/>
                <label>Категория: </label><br/>
                <select id="categoryId" value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)}>
                    <option value="">Выберите категорию</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <br/>
                <label>Цена: </label><br/>
                <input type="number" name="price" value={editingProduct.price} onChange={handleInputChange} required />
                <br/>
                <label>Количество: </label><br/>
                <input type="number" name="count" value={editingProduct.count} onChange={handleInputChange} required />
                <br/>
                <label>Фирма: </label><br/>
                <select id="firmId" value={selectedFirmId} onChange={(e) => setSelectedFirmId(e.target.value)}>
                    <option value="">Выберите фирму</option>
                    {firms.map(firm => (
                        <option key={firm.id} value={firm.id}>{firm.name}</option>
                    ))}
                </select>
                <br/>
                <label>Цвет: </label><br/>
                <input type="text" name="color" value={editingProduct.color || ''} onChange={handleInputChange} />
                <br/>
                <label>Запах: </label><br/>
                <textarea style={{width: "90%"}} type="text" name="smell" value={editingProduct.smell || ''} onChange={handleInputChange} />
                <br/>
                <label>Ссылка на изображение: </label><br/>
                <textarea style={{width: "90%"}} type="text" name="imageLink" value={editingProduct.imageLink || ''} onChange={handleInputChange} />
                <br/>
                <label>Bec: </label><br/>
                <input type="number" name="weight" value={editingProduct.weight || ''} onChange={handleInputChange} />
                <br/>
                <label>Способ применения: </label><br/>
                <textarea style={{width: "90%"}} type="text" name="useMethod" value={editingProduct.useMethod || ''} onChange={handleInputChange} />
            </form>
            </Modal>
        </React.Fragment>
    );
};

export default ProductsUpdate;
