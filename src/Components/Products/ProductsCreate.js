import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';

const ProductsCreate = ({ products, setProducts, isOpen, setIsOpen }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // состояние для выбранной категории
    const [firms, setFirms] = useState([]);
    const [selectedFirmId, setSelectedFirmId] = useState(''); // состояние для выбранной фирмы
    
    const addProduct = (newProduct) => setProducts([...products, newProduct]) // рендер всех товаров вместе с новым

    useEffect(() => {
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
    }, []); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // считываем все данные из формы
        const { name, description, price, count, color, smell, imageLink, weight, useMethod } = e.target.elements;
        
        // формируем новый товар
        const newProduct = {
            name: name.value,
            description: description.value,
            categoryId: parseInt(selectedCategoryId),
            firmId: parseInt(selectedFirmId),
            price: parseFloat(price.value),
            count: parseInt(count.value),
            color: color.value || null,
            smell: smell.value || null,
            imageLink: imageLink.value || null,
            useMethod: useMethod.value || null,
            weight: parseFloat(weight.value) || null
        };
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        };

        try {
            const response = await fetch("api/Products", requestOptions);
            if (!response.ok) {
                throw new Error('Failed to create product');
            }
            const data = await response.json();
            console.log(data);
            addProduct(data); 
            e.target.reset(); 
        } catch (error) {
            console.error(error);
        }
    };

    const cancelAdd = () => {
        setIsOpen(false);
    };

    return (
        <React.Fragment>
            <Modal open={isOpen} footer={null} onCancel={cancelAdd}>
            <form onSubmit={handleSubmit}>
                <label>Название: </label><br/>
                <input type="text" name="name" placeholder="Введите название:" required />
                <br/>
                <label>Описание: </label><br/>
                <textarea type="text" name="description" placeholder="Введите описание:" required />
                <br/>
                <label>Категория: </label><br/>
                <select id="categoryId" onChange={(e) => setSelectedCategoryId(e.target.value)} required>
                    <option value="">Выберите категорию</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <label>Цена: </label><br/>
                <input type="number" name="price" placeholder="Введите цену:" required />
                <br/>
                <label>Количество: </label><br/>
                <input type="number" name="count" placeholder="Введите количество:" required />
                <br/>
                <label>Фирма: </label><br/>
                <select id="firmId" onChange={(e) => setSelectedFirmId(e.target.value)} required>
                    <option value="">Выберите фирму</option>
                    {firms.map(firm => (
                        <option key={firm.id} value={firm.id}>{firm.name}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <label>Цвет: </label><br/>
                <input type="text" name="color" placeholder="Введите цвет:" />
                <br/>
                <label>Запах: </label><br/>
                <textarea type="text" name="smell" placeholder="Введите запах:" />
                <br/>
                <label>Ссылка на изображение: </label><br/>
                <textarea type="text" name="imageLink" placeholder="Введите url:" />
                <br/>
                <label>Bec: </label><br/>
                <input type="text" name="weight" placeholder="Введите вес:" />
                <br/>
                <label>Способ применения: </label><br/>
                <textarea type="text" name="useMethod" placeholder="Введите способ применения:" /> <br/>
                <div style={{paddingLeft: "75%"}}><button className='btn btn-add' type="submit">Создать</button></div>
            </form>
            </Modal>
        </React.Fragment>
    );
};

export default ProductsCreate;

