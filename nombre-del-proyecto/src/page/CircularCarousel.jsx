import React from 'react';
import './CircularCarousel.css';  // Asegúrate de que esta ruta sea correcta

// Importa las imágenes correctamente
import image1 from '../assets/prendas/a.jpg';
import image2 from '../assets/prendas/C.jpg';
import image3 from '../assets/prendas/Q.jpg';
import image4 from '../assets/prendas/R.jpg';
import image5 from '../assets/prendas/B.jpg';
import image6 from '../assets/prendas/D.jpg';
import image7 from '../assets/prendas/Qq.jpg';
import image8 from '../assets/prendas/W.jpg';
import image9 from '../assets/prendas/T.jpg';
import image10 from '../assets/prendas/S.jpg';
import image11 from '../assets/prendas/L.jpg';
import image12 from '../assets/prendas/E.jpg';

const CircularCarousel = () => {
    return (
        <div className="carousel-background">
            <div className="circular-carousel">
                <div className="circular-slide">
                    {/* Cada imagen está envuelta en un contenedor con fondo pequeño */}
                    <div className="carousel-item">
                        <img src={image1} alt="Imagen 1" />
                    </div>
                    <div className="carousel-item">
                        <img src={image2} alt="Imagen 2" />
                    </div>
                    <div className="carousel-item">
                        <img src={image3} alt="Imagen 3" />
                    </div>
                    <div className="carousel-item">
                        <img src={image4} alt="Imagen 4" />
                    </div>
                    <div className="carousel-item">
                        <img src={image5} alt="Imagen 5" />
                    </div>
                    <div className="carousel-item">
                        <img src={image6} alt="Imagen 6" />
                    </div>
                    <div className="carousel-item">
                        <img src={image7} alt="Imagen 7" />
                    </div>
                    <div className="carousel-item">
                        <img src={image8} alt="Imagen 8" />
                    </div>
                    <div className="carousel-item">
                        <img src={image9} alt="Imagen 9" />
                    </div>
                    <div className="carousel-item">
                        <img src={image10} alt="Imagen 10" />
                    </div>
                    <div className="carousel-item">
                        <img src={image11} alt="Imagen 11" />
                    </div>
                    <div className="carousel-item">
                        <img src={image12} alt="Imagen 12" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CircularCarousel;
