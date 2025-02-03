import React, { useState } from 'react';
import productService from '../services/productService';
import './ProductForm.css';  // Importa un archivo CSS para estilos adicionales.

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imageUrlFrente: '',
        imageUrlEspalda: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await productService.addProduct(product);
        setProduct({ name: '', description: '', price: '', category: '', stock: '', imageUrlFrente: '', imageUrlEspalda: '' });
    };

    return (
        <div className="form-container">
            <form className="product-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={product.name} 
                    onChange={handleChange} 
                    placeholder="Nombre" 
                    required 
                />
                <input 
                    type="text" 
                    name="description" 
                    value={product.description} 
                    onChange={handleChange} 
                    placeholder="Descripción" 
                />
                <input 
                    type="number" 
                    name="price" 
                    value={product.price} 
                    onChange={handleChange} 
                    placeholder="Precio" 
                    required 
                />
                <input 
                    type="text" 
                    name="category" 
                    value={product.category} 
                    onChange={handleChange} 
                    placeholder="Categoría" 
                />
                <input 
                    type="number" 
                    name="stock" 
                    value={product.stock} 
                    onChange={handleChange} 
                    placeholder="Stock" 
                />
                <input 
                    type="file" 
                    name="imageUrlFrente" 
                    //value={product.imageUrlFrente} 
                    onChange={handleChange} 
                    placeholder="Imagen Frente" 
                />
                <input 
                    type="file" 
                    name="imageUrlEspalda" 
                    //value={product.imageUrlEspalda} 
                    onChange={handleChange} 
                    placeholder="Imagen Espalda" 
                />
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};


export default ProductForm ;
