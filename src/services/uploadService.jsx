import axios from 'axios';
import API_URL from "../api/api"


const uploadImage = async (file) => {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('Вы не авторизованы');
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await axios.post(`${API_URL}/api/upload`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(`Ошибка: ${error.response.data.message || error.response.statusText}`);
        } else if (error.request) {
            throw new Error('Нет ответа от сервера. Пожалуйста, проверьте ваше соединение.');
        } else {
            throw new Error('Что-то пошло не так. Попробуйте снова.');
        }
    }
};

export default uploadImage;
