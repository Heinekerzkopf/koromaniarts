import axios from 'axios';

const API_URL = "https://koromaniarts.onrender.com";

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
        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

