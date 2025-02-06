import React, { useState } from 'react';
import axios from 'axios';
import './editModal.css'

const EditModal = ({ image, onClose, onUpdate }) => {
    const [title, setTitle] = useState(image.title);
    const [description, setDescription] = useState(image.description);
    const [error, setError] = useState('');

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Вы не авторизованы');
                return;
            }

            await axios.put(`http://localhost:5001/api/images/${image._id}`, {
                title,
                description
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            onUpdate(); // Обновляем данные в галерее
            onClose();
        } catch (error) {
            console.error('Ошибка при обновлении:', error);
            setError('Ошибка обновления');
        }
    };

    return (
        <div className="modal-edit">
            <div className="modal-edit-content">
                <h2>Editing panel</h2>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                {error && <p className="error">{error}</p>}
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditModal;