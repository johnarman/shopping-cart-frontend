import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user) {
            fetchCart();
        }
    }, [user]);

    const fetchCart = async () => {
        try {
            const response = await axios.get('/shoppingcart', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setCart(response.data);
        } catch (error) {
            console.error('Failed to fetch cart', error);
        }
    };

    const addCartItem = async (productId, quantity) => {
        try {
            const response = await axios.post('/shoppingcart', { productId, quantity }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response.status !== 200) {
                // Manually throw an error if the response status is not 200 (success)
                throw new Error('Failed to add item to cart');
            }

            await fetchCart();
        } catch (error) {
            console.error('Failed to add item to cart', error);
            throw error;
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            await axios.put('/shoppingcart', { productId, quantity }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchCart();
        } catch (error) {
            console.error('Failed to update item in cart', error);
        }
    };

    const removeCartItem = async (productId) => {
        try {
            await axios.delete(`/shoppingcart/${productId}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            fetchCart();
        } catch (error) {
            console.error('Failed to remove item from cart', error);
        }
    };


    return (
        <CartContext.Provider value={{ cart, addCartItem, updateCartItem, removeCartItem, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartContext, CartProvider };
