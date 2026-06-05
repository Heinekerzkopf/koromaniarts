import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await getImages();
            setImages(response.data);
        } catch (error) {
            console.error('error during pictures load:', error);
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

    const handleDelete = async (id) => {
        setImages(images.filter(image => image._id !== id));  
    };

    const filteredImages = images.filter((image) => {
        if (filter === 'ALL') {
            return true;
        }
        return image.availability === filter;
    });

    return (
        <div className="home">
            <Helmet>
                <title>Galerie | Koroman Arts</title>
                <meta name="description" content="Prohlédněte si mou nejnovější tvorbu a obrazy." />
            </Helmet>
            <h1>Galerie</h1>

            <div className="filter-container">
                <button 
                    className={filter === 'ALL' ? 'active-filter' : ''} 
                    onClick={() => setFilter('ALL')}
                >
                    Všechny
                </button>
                <button 
                    className={filter === 'AVAILABLE' ? 'active-filter' : ''} 
                    onClick={() => setFilter('AVAILABLE')}
                >
                    Dostupné
                </button>
                <button 
                    className={filter === 'NOT_AVAILABLE' ? 'active-filter' : ''} 
                    onClick={() => setFilter('NOT_AVAILABLE')}
                >
                    Nedostupné
                </button>
            </div>

            {loading && (
                <div className="loading-indicator">
                    <div className="circle"></div>
                </div>
            )}

            <div className="gallery">
                {filteredImages.map((image) => (
                    <ImageCard
                        key={image._id}
                        image={image}
                        onClick={openModal}
                        onEditClick={openEditModal}
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