import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; 

const Home = () => {
    return (
        <div className="home">
            <h1>Welcome to Explore Columbus</h1>
            <p>Your guide to family, women’s, and couples’ activities in Columbus, Ohio.</p>
            <div className="quick-links">
                <Link to="/families">Families</Link>
                <Link to="/women">Women’s Safe Spaces</Link>
                <Link to="/couples">Couples & Friends</Link>
            </div>
        </div>
    );
};

export default Home;
