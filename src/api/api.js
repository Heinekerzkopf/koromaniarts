import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export default API_URL;

export const getImages = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/images`);
        return response;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};

export const uploadImage = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/api/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.data && response.data.imageUrls) {
            // Возвращаем массив imageUrls
            return response.data.imageUrls;
        }

        // Если сервер не вернул ожидаемые данные
        throw new Error('Ошибка при получении URL изображений');
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};


