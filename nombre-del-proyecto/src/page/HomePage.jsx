import React, { useState } from 'react';
import Carousel from '../components/Carrusel/Carousel';  // Carrusel superior
import CircularCarousel from './CircularCarousel'; // Nuevo carrusel circular
import './homePage.css';  // Estilos generales
import './CardGlobal.css';  // Estilos de las tarjetas
import Footer from './Footer'; // Importar el Footer

// Datos de las tarjetas
import aImg from '../assets/prendas/Bb.jpg';
import bImg from '../assets/prendas/b.jpg'; // Imagen alternativa para hover
import depo from '../assets/logos/de.jpg';
import moda from '../assets/logos/Tu moda.jpg';

const cardsData = [
  {
    id: 1,
    image: aImg,
    imageHover: bImg, // Imagen para hover
    title: 'Card 1',
    description: 'Esta es la descripción',
    price: '$10.00',
    tags: ['descuento', 'xl', 'regular'],
  },
  {
    id: 2,
    image: aImg,
    imageHover: bImg,
    title: 'Card 2',
    description: 'Esta es la descripción',
    price: '$15.00',
    tags: ['descuento', 'xl', 'regular'],
  },
  {
    id: 3,
    image: aImg,
    imageHover: bImg,
    title: 'Card 3',
    description: 'Esta es la descripción',
    price: '$10.00',
    tags: ['descuento', 'xl', 'regular'],
  },
  {
    id: 4,
    image: aImg,
    imageHover: bImg,
    title: 'Card 4',
    description: 'Esta es la descripción',
    price: '$15.00',
    tags: ['descuento', 'M', 'oversize'],
  },
  {
    id: 5,
    image: aImg,
    imageHover: bImg, // Imagen para hover
    title: 'Card 1',
    description: 'Esta es la descripción',
    price: '$10.00',
    tags: ['descuento', 'L', 'musculosa'],
  },
  {
    id: 6,
    image: aImg,
    imageHover: bImg,
    title: 'Card 2',
    description: 'Esta es la descripción',
    price: '$15.00',
    tags: ['descuento', 'S', 'deportivas'],
  },
  {
    id: 7,
    image: aImg,
    imageHover: bImg,
    title: 'Card 3',
    description: 'Esta es la descripción',
    price: '$10.00',
    tags: ['descuento', 'xxl', 'camisa'],
  },
  {
    id: 8,
    image: aImg,
    imageHover: bImg,
    title: 'Card 4',
    description: 'Esta es la descripción',
    price: '$15.00',
    tags: ['descuento', 'l', 'regular', 'rojo'],
  },
];

function HomePage() {
  return (
    <div className="global">
      {/* Carrusel Independiente (superior) */}
      <div className="carousel-container">
        <Carousel />
      </div>

      <div className="divicion">
        <h1>HASTA 3 CUOTAS SIN INTERÉS</h1>
        <h1>ENVÍO GRATIS A PARTIR DE $50</h1>
        <h1>DESCUENTOS EXCLUSIVOS ONLINE</h1>
      </div>

      {/* Contenedor para los filtros y las tarjetas */}
      <div className="eltodo">
        <div className="filt">
          <div className="filtroglobal">
            <h3>Ofertas</h3>
            <ul>
              <li><input type="checkbox" /> 5% (181)</li>
              <li><input type="checkbox" /> 7% (1)</li>
              <li><input type="checkbox" /> 10% (190)</li>
              <li><input type="checkbox" /> 15% (190)</li>
            </ul>
            <h3>Talle</h3>
            <ul>
              <li><input type="checkbox" /> Xxxl (181)</li>
              <li><input type="checkbox" /> Xs (1)</li>
              <li><input type="checkbox" /> S (190)</li>
              <li><input type="checkbox" /> M (190)</li>
              <li><input type="checkbox" /> L (190)</li>
              <li><input type="checkbox" /> Xl (189)</li>
              <li><input type="checkbox" /> Xxl (190)</li>
            </ul>
            <h3>Corte</h3>
            <ul>
              <li><input type="checkbox" /> Oversize (186)</li>
              <li><input type="checkbox" /> Regular (179)</li>
              <li><input type="checkbox" /> Musculosa (179)</li>
              <li><input type="checkbox" /> Deportivas (1)</li>
              <li><input type="checkbox" /> Baby look (179)</li>
              <li><input type="checkbox" /> Camisas (179)</li>
              <li><input type="checkbox" /> Fotbool (179)</li>
            </ul>
            <h3 className="color-filter">Filtrar por color</h3>
            <ul className="color-list">
              <li className="red" title="Rojo"></li>
              <li className="blue" title="Azul"></li>
              <li className="green" title="Verde"></li>
              <li className="yellow" title="Amarillo"></li>
              <li className="orange" title="Naranja"></li>
              <li className="purple" title="Morado"></li>
              <li className="black" title="Negro"></li>
            </ul>
          </div>
        </div>

        {/* Contenedor de las tarjetas */}
        <div className="card-container">
          {cardsData.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* Nuevo carrusel circular debajo de las tarjetas */}
      <div className="carousel-container">
        <CircularCarousel />
      </div>

      {/* Contenedor de imágenes debajo del carrusel circular */}
      <div className="image-pair-container">
        <div className="image-pair">
          <img src={depo} alt="Imagen 1" />
          <img src={moda} alt="Imagen 2" />
        </div>
      </div>

      {/* Footer al final de la página */}
      <Footer />
    </div>
  );
}

const Card = ({ image, imageHover, title, description, price }) => {
  const [currentImage, setCurrentImage] = useState(image);

  return (
    <div className="card">
      <div
        className="card-image"
        onMouseEnter={() => setCurrentImage(imageHover)}
        onMouseLeave={() => setCurrentImage(image)}
      >
        <img src={currentImage} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <p className="card-price">{price}</p>
        <div className="card-buttons">
          <button className="card-btn"><span>Comprar 🛒</span></button>
          <button className="card-btn"><span>Ver 👀</span></button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
