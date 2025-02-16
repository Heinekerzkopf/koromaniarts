import React, { useState, useEffect } from 'react';
import './home.css';
import ImageCard from '../components/ImageCard';
import Modal from '../components/Modal';
import EditModal from '../components/EditModal'; 
import { getImages } from '../api/api';

const Home = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await getImages();
            setImages(response.data);
        } catch (error) {
            console.error('Ошибка загрузки изображений:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setIsEditing(false);
    };

    const openEditModal = (image) => {
        setSelectedImage(image);
        setIsEditing(true);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    // Обработка удаления изображения
    const handleDelete = async (id) => {
        setImages(images.filter(image => image._id !== id));  
    };

    return (
        <div className="home">
            <h1>Gallery</h1>

            {/* Индикатор загрузки */}
            {loading && (
                <div className="loading-indicator">
                    <div className="circle"></div>
                </div>
            )}

            <div className="gallery">
                {images.map((image) => (
                    <ImageCard
                        key={image._id}
                        image={image}
                        onClick={openModal}
                        onEditClick={openEditModal}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {/* Модальные окна для просмотра и редактирования */}
            {selectedImage && !isEditing && (
                <Modal image={selectedImage} onClose={closeModal} />
            )}

            {selectedImage && isEditing && (
                <EditModal
                    image={selectedImage}
                    onClose={closeModal}
                    onUpdate={fetchImages}
                />
            )}
        </div>
    );
};

export default Home;
