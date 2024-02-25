import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        // Retrieve cart items from local storage when component mounts
        const storedCartItems = localStorage.getItem('cart');
        if (storedCartItems) {
            const cartData = JSON.parse(storedCartItems);
            setCartItems(cartData.map(item => ({
                ...item,
                image: item.image,
                price: item.price
            })));
            setTotalItems(cartData.length);
        }
        setLoading(false);
    }, []);


    const handleRemove = (index) => {
        // Remove item from cart and update local storage and state
        const updatedCart = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedCart);
        setTotalItems(updatedCart.length);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <section className='cart-page m-4'>
            <div className='jumbotron'>
                <h1 className='display-4'>Cart</h1>
            </div>
            <div className='row'>
                <div className='col-md-8'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Product</th>
                                {/* <th scope='col'>Quantity</th> */}
                                <th scope='col'>Price</th>
                                <th scope='col'>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan='4'>Loading...</td>
                                </tr>
                            ) : cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {item.image && <img src={item.image} alt={item.title} style={{ maxWidth: '110px' }} />}
                                            {item.title && <h3>{item.title}</h3>}
                                        </td>
                                        {/* <td>{item.quantity}</td> */}
                                        <td>
                                            <p>{item.price && `  ${item.price}`}</p>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleRemove(index)}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan='4'>No items in the cart</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className='col-md-4 border-left pl-4'>
                    <h2>Cart Summary</h2>
                    <p className='font-weight-light text-muted border-bottom'>
                        ({totalItems}) Items
                    </p>
                    <p className='font-weight-bold'>
                        Total: ${(cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)).toFixed(2)}
                    </p>
                    {/* Add the order button and its functionality here */}
                </div>
            </div>
        </section>
    );
}

export default Cart;
