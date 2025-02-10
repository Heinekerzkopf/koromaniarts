import React from 'react';
import './modal.css';
import API_URL from "../api/api";

const Modal = ({ image, onClose }) => {
  if (!image) return null; // If no image, do not render the modal

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}></button>
        <img src={`${API_URL}${image.imageUrl}`} alt={image.title} className="modal-image" />
        <h2>{image.title}</h2>
        <p>{image.description}</p>
      </div>
    </div>
  );
};

export default Modal;
