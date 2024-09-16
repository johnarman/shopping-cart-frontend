// src/components/Cart/Cart.js

import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const { cart, addCartItem, updateCartItem, removeCartItem } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    // Calculate the total amount
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        // If the user is logged out, redirect to the login page
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cart.map((item) => (
                    <div key={item.productId} className="cart-item">
                        <div className="cart-item-details">
                        <h3>{item.productName}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <div className="cart-item-actions">
                            <button onClick={() => addCartItem(item.productId, 1)}>
                                +
                            </button>
                            <button onClick={() => updateCartItem(item.productId, item.quantity - 1)}>
                                -
                            </button>
                            <button onClick={() => removeCartItem(item.productId)}>Remove</button>
                        </div>
                    </div>
                ))
            )}
            </div>
            {cart.length > 0 && (
                <div className="cart-total">
                    <h3>Total Amount: ${(totalAmount).toFixed(2)}</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;
