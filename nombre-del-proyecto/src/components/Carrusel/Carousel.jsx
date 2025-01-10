import React, { useState, useEffect } from 'react';
import './Carousel.css';

import arbol from '../../assets/logos/arbol.jpg';
import mendoza from '../../assets/logos/mendoza.jpg';

import arbolMobile from '../../assets/logos/menMov.jpg';
import mendozaMobile from '../../assets/logos/menMov.jpg';

const Carousel = () => {
    const [isMobile, setIsMobile] = useState(false);

    const desktopImages = [arbol, mendoza]; // Imágenes para escritorio
    const mobileImages = [arbolMobile, mendozaMobile]; // Imágenes para móvil

    const [currentIndex, setCurrentIndex] = useState(0);

    // Detectar el tamaño de pantalla
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Cambiar según el breakpoint
        };

        handleResize(); // Inicializar
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === (isMobile ? mobileImages.length : desktopImages.length) - 1
                ? 0
                : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0
                ? (isMobile ? mobileImages.length : desktopImages.length) - 1
                : prevIndex - 1
        );
    };

    const images = isMobile ? mobileImages : desktopImages;

    return (
        <div className="carousel">
            <button className="prev" onClick={prevSlide}>
                &#8592;
            </button>
            <div className="carousel-content">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        <div className="image-container">
                            <img src={image} alt={`Slide ${index}`} />
                        </div>
                    </div>
                ))}
            </div>
            <button className="next" onClick={nextSlide}>
                &#8594;
            </button>
        </div>
    );
};

export default Carousel;
