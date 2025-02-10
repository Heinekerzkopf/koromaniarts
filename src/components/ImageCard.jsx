import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from "../api/api";
import './imageCard.css';

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
                onDelete(image._id);
            } else {
                console.error("Failed to delete image:", response.status);
            }
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };


    return (
        <div className="image-card" onClick={handleCardClick}>
            <img src={`${API_URL}${image.imageUrl}`} alt={image.title} />
            <h3>{image.title}</h3>
            <p>{image.description}</p>

            {isLoggedIn && (
                <>
                    <button className="edit-btn" onClick={handleEditClick}>EDIT</button>
                    <button className="delete-btn" onClick={handleDeleteClick}>DELETE</button>
                </>
            )}
        </div>
    );
};

export default ImageCard;
