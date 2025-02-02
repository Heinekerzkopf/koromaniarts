import axios from 'axios';

export const getImages = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/images');
        return response;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};

export const uploadImage = async (formData) => {
    try {
        const response = await axios.post('http://localhost:5001/api/upload', formData, {
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