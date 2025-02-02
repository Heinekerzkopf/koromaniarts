import React from 'react';

const ImageCard = ({ image, onClick }) => {
  return (
    <div className="image-card" onClick={onClick}>
      <img src={`http://localhost:5001${image.imageUrl}`} alt={image.title} /> {/* Используем imageUrl с полным путем */}
      <h3>{image.title}</h3>
      <p>{image.description}</p>
    </div>
  );
};

export default ImageCard;
