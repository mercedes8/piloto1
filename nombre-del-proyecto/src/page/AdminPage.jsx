import React, { useState, useEffect } from 'react';
import Cloudinary from '../components/Cloudinary'; // Importa el componente Cloudinary
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import productService from '../services/productService';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await productService.getProducts();
            setProducts(data || []);
        } catch (error) {
            setError('Error al cargar los productos.');
            console.error(error);
        }
    };

    const handleProductAdded = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const handleUpload = (uploadedFile) => {
        console.log('Archivo subido:', uploadedFile);
        // Opcional: asociar URL del archivo subido a un producto
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Cloudinary onUpload={handleUpload} />
            <ProductForm onProductAdded={handleProductAdded} />
            <ProductList products={products} />
        </div>
    );
};

export default AdminPage;
