import React, { useState, useEffect, useRef } from 'react';
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
    const [yearFilter, setYearFilter] = useState('ALL');

    // NOVÉ: Vytvoření reference na sekci s portfoliem
    const portfolioRef = useRef(null);

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
        if (yearFilter === 'ALL') {
            return true;
        }
        return image.year === parseInt(yearFilter, 10);
    });

    const groupedImages = filteredImages.reduce((acc, image) => {
        const y = image.year || 2024; 
        if (!acc[y]) {
            acc[y] = [];
        }
        acc[y].push(image);
        return acc;
    }, {});

    const sortedYears = Object.keys(groupedImages).sort((a, b) => b - a);

    // NOVÉ: Funkce pro plynulé sjetí dolů
    const scrollToPortfolio = () => {
        portfolioRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-wrapper">
            <Helmet>
                <title>Portfolio | Koroman Arts</title>
                <meta name="description" content="Prohlédněte si mou nejnovější tvorbu a obrazy." />
            </Helmet>

            <div 
                className="hero-section" 
                // URL 
                style={{ backgroundImage: `url('https://cdn.forbes.cz/uploads/2025/07/detinsky-20250602-116a5089-scaled.webp?r=eyJ3IjoxNTAwLCJxIjo5MCwicyI6ImpwZyJ9')` }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Ilona Koroman</h1>
                    <button className="hero-button" onClick={scrollToPortfolio}>
                        Moje portfolio
                    </button>
                </div>
            </div>

            <div className="portfolio-section" ref={portfolioRef}>
                
                <div className="year-filter-container">
                    <select 
                        id="year-select"
                        value={yearFilter} 
                        onChange={(e) => setYearFilter(e.target.value)}
                    >
                        <option value="ALL">Všechny roky</option>
                        {Array.from({ length: 12 }, (_, i) => 2035 - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {loading && (
                    <div className="loading-indicator">
                        <div className="circle"></div>
                    </div>
                )}

                <div className="gallery-wrapper">
                    {sortedYears.length > 0 ? (
                        sortedYears.map((year) => (
                            <div key={year} className="year-section">
                                <h2 className="year-title">{year}</h2>
                                <div className="gallery">
                                    {groupedImages[year].map((image) => (
                                        <ImageCard
                                            key={image._id}
                                            image={image}
                                            onClick={openModal}
                                            onEditClick={openEditModal}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && <p>Zatím zde nejsou žádná díla.</p>
                    )}
                </div>
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