import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query'); // Obtenemos el término de búsqueda
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/search?query=${query}`);
                setResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (query) {
            fetchResults();
        }
    }, [query]);

    return (
        <div>
            <h1>Resultados de búsqueda para: "{query}"</h1>
            <div className="search-results">
                {results.length > 0 ? (
                    results.map((product) => (
                        <div key={product._id} className="product-card">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>${product.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron resultados.</p>
                )}
            </div>
        </div>
    );
}

export default SearchPage;
