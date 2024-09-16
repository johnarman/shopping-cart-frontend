// src/App.js

import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './components/HomePage';
import Login from './components/Auth/Login';
import ProductList from './components/Product/ProductList';
import Cart from './components/Cart/Cart';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { CartProvider, CartContext } from './context/CartContext';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                <div className="navbar">
                        <Link to="/" className="nav-link">Home</Link>
                        <AuthNav />
                        <CartIcon/>
                    </div>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                    <ToastContainer position="top-right" autoClose={3000} />
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};
const CartIcon = () => {
    return (
        <Link to="/cart" className="cart-icon">
            🛒
        </Link>
    );
};

const AuthNav = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    return user ? (
        <button onClick={handleLogout} className="logout-btn">
            Logout
        </button>
    ) : (
        <Link to="/login" className="nav-link">Login</Link>
    );
};

export default App;
