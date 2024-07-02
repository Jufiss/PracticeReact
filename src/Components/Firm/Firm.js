import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import FirmCreate from './FirmCreate';

import { Modal } from 'antd';

const Firm = ({ user }) => {
    const [editingFirm, setEditingFirm] = useState(null); 
    const [firms, setFirm] = useState([]);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [deleteFirmId, setDeleteFirmId] = useState(null);

    // рендер всех фирм без удаленной
    const removeFirm = (removeId) => setFirm(firms.filter(firm => firm.id !== removeId));

    useEffect(() => {
        const getFirm = async () => {
            const requestOptions = {
                method: 'GET'
            }
            return await fetch("api/Firm/", requestOptions)
                .then(response => response.json())
                .then(
                    (data) => {
                        console.log('Data:', data)
                        setFirm(data)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
        }
        getFirm()
    }, [setFirm])

    const deleteItem = (id) => {
        setDeleteFirmId(id);
        setIsConfirmationModalOpen(true);
        
    };

    // функция удаления фирмы (по подтверждению)
    const confirmDelete = async () => {
        const requestOptions = {
            method: 'DELETE'
        };
        try {
            const response = await fetch(`api/Firm/${deleteFirmId}`, requestOptions);
            if (response.ok) {
                removeFirm(deleteFirmId);
                console.log('Firm deleted successfully.');
            } else {
                console.error('Failed to delete firm.');
            }
        } catch (error) {
            console.error('An error occurred while deleting the firm:', error);
        } finally {
            setIsConfirmationModalOpen(false);
            setDeleteFirmId(null);
        }
    };

    const cancelDelete = () => {
        setIsConfirmationModalOpen(false);
        setDeleteFirmId(null);
    };

    const cancelEdit = () => {
        setIsOpenEditModal(false);
        setEditingFirm(null);
    }

    const cancelAdd = () => {
        setIsOpen(false);
    }


    const handleEditClick = (firm) => {
        setEditingFirm(firm);
        setIsOpenEditModal(true);
    }

    // изменение поля фирмы в editingFirm
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingFirm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // обновление товара при подтверждении
    const handleUpdateClick = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingFirm)
        }
        const response = await fetch(`api/Firm/${editingFirm.id}`, requestOptions);
        if (response.ok) {
            setFirm(prevFirms => prevFirms.map(firm => firm.id === editingFirm.id ? editingFirm : firm));
            
        } else {
            console.error('Failed to update firm');
        }
        setEditingFirm(null);
        setIsOpenEditModal(false);
    }

    

    return (
        <React.Fragment>
            {user.isAuthenticated ? (
                <>
            <Button onClick={() => setIsOpen(true)} className="btn btn-add" buttonText="Создать фирму" />
            <h3>Список фирм</h3>
                <Modal open={isOpen} footer={null} onCancel={cancelAdd}>
                    <FirmCreate firms={firms} setFirm={setFirm}></FirmCreate>
                </Modal>
                </>
                ):(<h3>Список фирм</h3>)}
            {firms.map(({ id, name}) => (
                <div className="firms" key={id} id={id} >
                    {editingFirm && editingFirm.id === id ? (
                    <Modal open={isOpenEditModal} onOk={handleUpdateClick} onCancel={cancelEdit}>
                        <h3>Редактирование фирмы</h3>
                        <input type="text" name="name" value={editingFirm.name} onChange={handleInputChange} />
                    </Modal>
                    ) : (
                        <React.Fragment>
                            <strong > {id}: {name} </strong>    
                            <br/>
                            {user.isAuthenticated ? (
                                <>
                            <Button onClick={() => handleEditClick({ id, name })} className="btn btn-add" buttonText="Редактировать" />
                            <Button onClick={() => deleteItem(id)} className="btn btn-del" buttonText="Удалить" />
                            
                                </>
                            ):("")}
                        </React.Fragment>
                    )}
                </div>
            ))}

            <Modal open={isConfirmationModalOpen} onOk={confirmDelete} onCancel={cancelDelete}>
                <p>Вы уверены, что хотите удалить эту фирму?</p>
            </Modal>
        </React.Fragment>
    )
}

export default Firm;
