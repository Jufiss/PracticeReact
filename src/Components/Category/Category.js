import React, { useState, useEffect } from 'react'
import Button from '../Button/Button';
import CategoryCreate from './CategoryCreate';

import { Modal } from 'antd';


const Category = ({ user }) => {
    const [editingCategory, setEditingCategory] = useState(null);
    const [categories, setCategory] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [deleteCategoryId, setDeleteCategoryId] = useState(null);

    // рендер всех категорий без удаленной
    const removeCategory = (removeId) => setCategory(categories.filter(category => category.id !== removeId));

    useEffect(() => {
        const getCategory = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/Category/", requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log('Data:', data)
                        setCategory(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getCategory()
    }, [setCategory])


    const deleteItem = (id) => {
        setDeleteCategoryId(id);
        setIsConfirmationModalOpen(true);
    };

    // функция удаления фирмы (по подтверждению)
    const confirmDelete = async () => {
        const requestOptions = {
            method: 'DELETE'
        };
        try {
            const response = await fetch(`api/Category/${deleteCategoryId}`, requestOptions);
            if (response.ok) {
                removeCategory(deleteCategoryId);
                console.log('Category deleted successfully.');
            } else {
                console.error('Failed to delete category.');
            }
        } catch (error) {
            console.error('An error occurred while deleting the category:', error);
        } finally {
            setIsConfirmationModalOpen(false);
            setDeleteCategoryId(null);
        }
    };

    const cancelDelete = () => {
        setIsConfirmationModalOpen(false);
        setDeleteCategoryId(null);
    };

    const cancelAdd = () => {
        setIsOpen(false);
    };

    const cancelEdit = () => {
        setIsOpenEditModal(false);
        setEditingCategory(null);
    };

    const handleEditClick = (category) => {
        setEditingCategory(category);
        setIsOpenEditModal(true);
    }

    // изменение полей категории в editingCategory
    const handleInputChange = (e) => {
        const { name, imageLink, value } = e.target;
        setEditingCategory(prevState => ({
            ...prevState,
            [name]: value,
            [imageLink]: value
        }));
    }

    const handleUpdateClick = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingCategory)
        }
        const response = await fetch(`api/Category/${editingCategory.id}`, requestOptions);
        if (response.ok) {
            setCategory(prevCategories => prevCategories.map(category => category.id === editingCategory.id ? editingCategory : category));
            console.log(editingCategory)
        } else {
            console.error('Failed to update category');
        }
        setEditingCategory(null);
        setIsOpenEditModal(false);
    }

    return (
        <React.Fragment>
            {console.log('rendered')}
            {user.isAuthenticated ? (
                <> 
            <Button onClick={() => setIsOpen(true)} className="btn btn-add" buttonText="Создать категорию" />
            <h3>Список категорий</h3>
            <Modal headerText="Создание новой категории" open={isOpen} footer={null} onCancel={cancelAdd}>
                <CategoryCreate categories={categories} setCategory={setCategory}/>
            </Modal>
                </>
        ):(<h3>Список категорий</h3>)}
            {categories.map(({ id, name, imageLink }) => (
                <div className="firms" key={id} id={id} >
                    {editingCategory && editingCategory.id === id ? (
                        <Modal open={isOpenEditModal} onOk={handleUpdateClick} onCancel={cancelEdit}>
                            <h3>Редактирование категории</h3>
                            <label>Название: </label>
                            <input type="text" name="name" value={editingCategory.name} onChange={handleInputChange} />
                            <br/>
                            <label>Картинка url: </label>
                            <input type="text" name="imageLink" value={editingCategory.imageLink} onChange={handleInputChange} placeholder="url:" />
                        </Modal>
                    ) : (
                        <React.Fragment>
                            <strong > {id}: {name} </strong>
                            <br />
                            {user.isAuthenticated ? ( 
                                <>
                            <Button onClick={() => handleEditClick({ id, name, imageLink })} className="btn btn-add" buttonText="Редактировать" />
                            <Button onClick={() => deleteItem(id)} className="btn btn-del" buttonText="Удалить" />
                                </>
                            ):("")}
                        </React.Fragment>
                    )}
                </div>
            ))}
            <Modal open={isConfirmationModalOpen} onOk={confirmDelete} onCancel={cancelDelete}>
                <p>Вы уверены, что хотите удалить эту категорию?</p>
            </Modal>


        </React.Fragment>
    )
}

export default Category