// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setAxiosAuthHeader(storedUser.token);
        }
    }, []);

    const setAxiosAuthHeader = (token) => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    const login = async (username, password) => {
        try {
            const response = await axios.post('/api/auth/login', { username, password });
            const { token } = response.data;
            const userData = { username, token };
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            setAxiosAuthHeader(token);
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization']; // Remove token from axios
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
