import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home.jsx';
import Families from './pages/Families.jsx';
import Women from './pages/Women.jsx';
import Couples from './pages/Couples.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import './App.css';
import axios from 'axios'

const App = () => {
    const location = useLocation();
    const showHeader = !['/login', '/register'].includes(location.pathname);

    return (
        <div className="App">
            {showHeader && <Header />}
            <main>
            <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Protected routes */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } />
                    <Route path="/families" element={
                        <ProtectedRoute>
                            <Families />
                        </ProtectedRoute>
                    } />
                    <Route path="/women" element={
                        <ProtectedRoute>
                            <Women />
                        </ProtectedRoute>
                    } />
                    <Route path="/couples" element={
                        <ProtectedRoute>
                            <Couples />
                        </ProtectedRoute>
                    } />
                    <Route path="/about" element={
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;