import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductViews(props) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:4000/get-product/${props.match.params.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch product');
                }
                return res.json();
            })
            .then(productData => {
                setProduct(productData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, [props.match.params.id]);



    return (
        <div>
            <h2>Product Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : product ? (
                <div>
                    <img src={`http://localhost:4000/get-image/${product.image}`} alt={product.title} />
                    <div>
                        <h3>{product.title}</h3>
                        <p>Price: {product.price}</p>
                        <p>Category: {product.category}</p>
                        <p>Details: {product.details}</p>
                    </div>
                    <Link to={`/user/products/view`} className='btn'>add to car</Link>
                </div>
            ) : (
                <p>No product found</p>
            )}
        </div>
    );
}

export default ProductViews;
