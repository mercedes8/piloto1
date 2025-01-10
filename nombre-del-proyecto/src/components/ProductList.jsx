import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Hacer la solicitud al backend
        axios.get('http://localhost:4000/api/products')
            .then(response => {
                setProducts(response.data); // Guardar los productos en el estado
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Productos</h1>
            {products.map(product => (
                <div key={product._id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Precio: ${product.price}</p>
                    <p>Stock: {product.stock}</p>
                    {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
                </div>
            ))}
        </div>
    );
};

export default ProductList;
