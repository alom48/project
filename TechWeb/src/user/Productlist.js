import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/get-image')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setProducts(data.data);
                } else {
                    console.error('Error fetching products:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const handleAddToCart = async (productId) => {
        try {
            // Send a POST request to the server to add the product to the cart
            const response = await axios.post(`http://localhost:4000/add-to-cart/${productId}`);

            // Check if the request was successful
            if (response.status === 200) {
                // If successful, update the cart state in the frontend
                const newProduct = response.data.product;
                setCart([...cart, newProduct]);

                // Update the cart items in local storage
                localStorage.setItem('cart', JSON.stringify([...cart, newProduct]));
            }
        } catch (error) {
            // Handle any errors
            console.error('Error adding product to cart:', error);
        }
    };








    const filteredProducts = products.filter(product =>
        (selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase())
    );

    return (
        <div>
            <h1>Buy Product</h1>
            <select onChange={handleCategoryChange}>
                <option value="">All</option>
                <option value="laptop">Laptop</option>
                <option value="mouse">Mouse</option>
                <option value="keyboard">Keyboard</option>
            </select>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredProducts.map(p => (
                    <div key={p._id} style={{ width: '20%', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <img src={`http://localhost:4000/get-image/${p.image}`} alt={p.title} width="100%" />
                        <h3>{p.title}</h3>
                        <p>Price: {p.price}</p>
                        <Link to={`/user/products/${p._id}/view`} className='btn'>View Product</Link>
                        <button onClick={() => handleAddToCart(p._id)}>Add to Cart</button>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
