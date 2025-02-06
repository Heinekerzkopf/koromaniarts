import React, { useState, useEffect } from 'react';
import './imageCard.css';

const ImageCard = ({ image, onClick, onEditClick }) => {
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

    return (
        <div className="image-card" onClick={handleCardClick}>
            <img src={`http://localhost:5001${image.imageUrl}`} alt={image.title} />
            <h3>{image.title}</h3>
            <p>{image.description}</p>
            
            {isLoggedIn && (
                <button className="edit-btn" onClick={handleEditClick}>EDIT</button>
            )}
        </div>
    );
};

export default ImageCard;
