import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from "../api/api";
import './imageCard.css';
import editIcon from '../img/8666681_edit_icon.svg'
import deleteIcon from '../img/9104213_close_cross_remove_delete_icon.svg'

const ImageCard = ({ image, onClick, onEditClick, onDelete }) => {
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
                console.log("Image deleted successfully");
                onDelete(image._id);  // Обновление состояния на главной
            } else {
                console.error("Failed to delete image:", response.status);
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };


    return (
        <div className="image-card" onClick={handleCardClick}>
            {image.imageUrls && image.imageUrls.length > 0 ? (
                <div className='image-div'>
                    <img src={image.imageUrls[0]} alt={image.title} />
                    <span
                        className={`image-span ${image.availability === 'AVAILABLE'
                                ? 'image-span-available'
                                : 'image-span-not-available'
                            }`}
                    >
                        {image.availability === 'AVAILABLE' ? 'AVAILABLE' : 'NOT AVAILABLE'}
                    </span>
                </div>
            ) : (
                <p>No image available</p>
            )}
            <h3>{image.title}</h3>
            <p>{image.description}</p>

            {isLoggedIn && (
                <div className='image-card-button'>
                    <button className="icon-btn edit-btn" onClick={handleEditClick}><img src={editIcon} alt="" /></button>
                    <button className="icon-btn delete-btn" onClick={handleDeleteClick}><img src={deleteIcon} alt="" /></button>
                </div>
            )}
        </div>
    );
};

export default ImageCard;
