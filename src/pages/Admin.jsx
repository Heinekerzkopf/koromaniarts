import React, { useState, useEffect } from 'react';
import './admin.css';
import axios from 'axios';
import API_URL from "../api/api"

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL }/api/auth/login`, {
                username,
                password
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
        } catch (error) {
            console.error('Ошибка при логине:', error.response?.data || error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Удаляем токен
        setIsLoggedIn(false); // Обновляем состояние
        setUsername('');
        setPassword('');
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Пожалуйста, войдите в систему');
                return;
            }

            const response = await axios.post(`${API_URL }/api/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log('Изображение успешно загружено:', response.data);
            setTitle('');
            setDescription('');
            setImage(null);
        } catch (error) {
            console.error('Ошибка при загрузке изображения:', error);
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
                            />
                        </div>
                        <button type="submit">Upload Picture</button>
                        {/* Кнопка Logout */}
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
