import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import './ProductList.css';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Auth/Login';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const { addCartItem } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);  // Fetch product list
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, []);

    
    const handleAddToCart = async (productId, quantity) => {
        if (user) {
        try {
            
            await addCartItem(productId, quantity);
            toast.success("Item has been added to the cart!");
        } catch (error) {
            toast.error("Failed to add item to cart");
        }
    }else {
        navigate('/login');
    }
    };

   


    return (
        <div className="product-grid">
        {products.map((product) => (
            <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleAddToCart(product.id, 1)}>
                    Add to Cart
                </button>
            </div>
        ))}
         
    </div>
    );
};

export default ProductList;
