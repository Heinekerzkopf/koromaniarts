import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from "../api/api";
import './imageCard.css';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';

const ImageCard = ({ image, onClick, onEditClick, onDelete }) => {
    const getOptimizedUrl = (url) => {
        if (!url || !url.includes('/upload/')) return url;
        return url.replace('/upload/', '/upload/q_auto,f_auto/');
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleCardClick = () => {
        onClick(image);
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        onEditClick(image);
    };

    const handleDeleteClick = async (e) => {
        e.stopPropagation();

        if (!window.confirm("Are you sure you want to delete this image?")) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("User is not authenticated");
                return;
            }

            const response = await axios.delete(`${API_URL}/api/images/${image._id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 200) {
                onDelete(image._id); 
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    return (
        <div className="image-card" onClick={handleCardClick}>
            <div className='image-div'>
                {image.imageUrls && image.imageUrls.length > 0 ? (
                    <img src={getOptimizedUrl(image.imageUrls[0])} alt={image.title} />
                ) : (
                    <div className="no-image-placeholder">No image available</div>
                )}

                {isLoggedIn && (
                    <div className='admin-actions'>
                        <button className="admin-btn edit-btn" onClick={handleEditClick}>
                            <FaRegEdit />
                        </button>
                        <button className="admin-btn delete-btn" onClick={handleDeleteClick}>
                            <FaRegTrashAlt />
                        </button>
                    </div>
                )}
            </div>
            
            <h3>{image.title}</h3>
            <p>{image.description}</p>

            {image.availability === 'NOT_AVAILABLE' && (
                <span className="sold-text">SOLD</span>
            )}
        </div>
    );
};

export default ImageCard;