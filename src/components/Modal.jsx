import React from 'react';
import './modal.css';

const Modal = ({ image, onClose }) => {
    if (!image) return null;
    const getOptimizedUrl = (url) => {
        if (!url || !url.includes('/upload/')) return url;
        return url.replace('/upload/', '/upload/q_auto,f_auto/');
    };


    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}></button>

                <h2>{image.title}</h2>
                <p>{image.description}</p>

                <div className="modal-images">
                    {image.imageUrls.map((url, index) => (
                        <img key={index} src={getOptimizedUrl(url)} alt={`${image.title} ${index + 1}`} className="modal-image" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;
