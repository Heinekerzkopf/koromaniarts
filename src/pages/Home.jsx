import React, { useState, useEffect } from 'react';
import './home.css';
import ImageCard from '../components/ImageCard';
import Modal from '../components/Modal';
import { getImages } from '../api/api'; // Функция для получения картин с бэкенда

const Home = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    // Загружаем картины с бэкенда при монтировании компонента
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getImages(); // Получаем данные с бэкенда
                setImages(response.data); // Устанавливаем изображения в состояние
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    // Открытие модального окна
    const openModal = (image) => {
        setSelectedImage(image); // Устанавливаем выбранное изображение
    };

    // Закрытие модального окна
    const closeModal = () => {
        setSelectedImage(null); // Сбрасываем выбранное изображение
    };

    return (
        <div className="home">
            <h1>Gallery</h1>
            <div className="gallery">
                {images.map((image) => (
                    <ImageCard
                        key={image._id} // Используем _id, если это MongoDB ID
                        image={image}
                        onClick={() => openModal(image)} // При клике открываем модальное окно
                    />
                ))}
            </div>

            {selectedImage && (
                <Modal image={selectedImage} onClose={closeModal} /> // Передаем выбранное изображение в Modal
            )}
        </div>
    );
};

export default Home;
