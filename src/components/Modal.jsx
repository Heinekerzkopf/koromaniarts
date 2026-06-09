import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import './modal.css';

const Modal = ({ image, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!image) return null;

    const getOptimizedUrl = (url) => {
        if (!url || !url.includes('/upload/')) return url;
        return url.replace('/upload/', '/upload/q_auto,f_auto/');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <button className="close-button" onClick={onClose}>
                <FaTimes />
            </button>

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{image.title}</h2>
                <p>{image.description}</p>

                <div className="modal-images">
                    {image.imageUrls.map((url, index) => (
                        <img 
                            key={index} 
                            src={getOptimizedUrl(url)} 
                            alt={`${image.title} ${index + 1}`} 
                            className="modal-image" 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Modal;