import React, { useState, useEffect } from 'react';
import './home.css';
import ImageCard from '../components/ImageCard';
import Modal from '../components/Modal';
import EditModal from '../components/EditModal'; // Assuming this component is still available
import { getImages } from '../api/api';

const Home = () => {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await getImages();
            setImages(response.data);
        } catch (error) {
            console.error('Ошибка загрузки изображений:', error);
        }
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setIsEditing(false); // Make sure the edit modal is not open
    };

    const openEditModal = (image) => {
        setSelectedImage(image);
        setIsEditing(true); // Set editing mode when "Edit" button is clicked
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleDelete = (id) => {
        setImages(images.filter(image => image._id !== id));
    };


    return (
        <div className="home">
            <h1>Gallery</h1>
            <div className="gallery">
                {images.map((image) => (
                    <ImageCard
                        key={image._id}
                        image={image}
                        onClick={openModal} // Regular modal open
                        onEditClick={openEditModal} // Edit modal open
                        onDelete={handleDelete}
                    />
                ))}
            </div>

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
