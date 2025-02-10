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
        console.error('Ошибка загрузки:', error);
        throw error;
    }
};

export default uploadImage;
