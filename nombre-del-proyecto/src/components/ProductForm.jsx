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
        imageUrl: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await productService.addProduct(product);
        setProduct({ name: '', description: '', price: '', category: '', stock: '', imageUrl: '' });
    };

    const InteriorForm = (e) => {
        console.log('AAAAAA')
        console.log(FormData)
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
                    type="text" 
                    name="imageUrl" 
                    value={product.imageUrl} 
                    onChange={handleChange} 
                    placeholder="Imagen URL" 
                />
                <button type="submit">Agregar Producto</button>
            </form>
            <form className="product-form" onSubmit={InteriorForm} action={'http://localhost:3000/images/single'} method='post'>
                <input 
                    type="file" 
                    name="imageUrlFrente" 
                    id="imageUrlFrente" 
                    //value={product.imageUrlFrente} 
                    placeholder="Imagen Frente" 
                />
                <button type="submit">Agregar Producto</button>
            </form>
        </div>
    );
};

export default ProductForm;
