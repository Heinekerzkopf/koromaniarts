import React, { useState } from 'react';
import axios from 'axios';
import API_URL from "../api/api";
import './editModal.css'

const EditModal = ({ image, onClose, onUpdate }) => {
    const [title, setTitle] = useState(image.title);
    const [description, setDescription] = useState(image.description);
    const [availability, setAvailability] = useState(image.availability);
    const [error, setError] = useState('');

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Вы не авторизованы');
                return;
            }

            await axios.put(`${API_URL}/api/images/${image._id}`, {
                title,
                description,
                availability
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
                <label className="modal-label">Status</label>
                <select className='modal-edit-select'
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="NOT_AVAILABLE">NOT AVAILABLE</option>
                </select>
                {error && <p className="error">{error}</p>}
                <button className='edit-modal-btn save-button' onClick={handleSave}>Save</button>
                <button className='edit-modal-btn cancel-button' onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default EditModal;