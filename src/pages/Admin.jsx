import React, { useState, useEffect } from 'react';
import './admin.css';
import axios from 'axios';
import API_URL from "../api/api";

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                username,
                password
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
        } catch (error) {
            console.log('API URL:', API_URL);
            console.error('Ошибка при логине:', error.response?.data || error.message);
            setError('Неверный логин или пароль');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files).slice(0, 5);
        setImages(selectedFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (images.length === 0) {
            setError('Выберите хотя бы одно изображение.');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        images.forEach((image, index) => {
            formData.append(`images`, image); // На сервере жди массив `images`
        });

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Пожалуйста, войдите в систему');
                return;
            }

            setLoading(true); // Начинаем загрузку

            // Отправляем данные на сервер
            const response = await axios.post(`${API_URL}/api/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            setLoading(false); // Завершаем загрузку
            setSuccess(true);  // Показываем сообщение об успехе
            alert('Изображение загружено успешно!');
            setTitle('');
            setDescription('');
            setImages([]);
        } catch (error) {
            setLoading(false); // Завершаем загрузку
            console.error('Ошибка при загрузке изображения:', error);
            setError('Что-то пошло не так... Попробуйте снова.');
        }
    };

    return (
        <div className="admin">
            {!isLoggedIn ? (
                <div className="login-form">
                    <h2>Admin Panel</h2>
                    <form onSubmit={handleLogin}>
                        <div className='form-div'>
                            <label htmlFor="username">Login</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-div'>
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <button type="submit">Enter</button>
                    </form>
                </div>
            ) : (
                <div className="image-upload-form">
                    <h2>Add Picture</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='form-div'>
                            <label htmlFor="title">Name</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-div'>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className='form-div'>
                            <label htmlFor="image">Picture</label>
                            <input
                                type="file"
                                id="image"
                                onChange={handleFileChange}
                                required
                                multiple
                            />
                        </div>
                        <button type="submit" disabled={loading}>Upload Picture</button>
                        {loading && <div>Uploading...</div>}
                        {success && <div style={{ color: 'green' }}>Picture uploaded successfully!</div>}
                        {error && <div style={{ color: 'red' }}>{error}</div>}
                        <button className="logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Admin;
