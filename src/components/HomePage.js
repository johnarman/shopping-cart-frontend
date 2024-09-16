import React from 'react';
import ProductList from './Product/ProductList';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Welcome to Our Store</h1>
            </header>
            <main>
                <ProductList />
            </main>
        </div>
    );
};

export default HomePage;
