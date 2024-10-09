import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Auth from './components/Auth'; 

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout')); 
const About = lazy(() => import('./components/About'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const [token, setToken] = useState(null); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchUserData = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await fetch('http://localhost:5000/profile', {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          const data = await response.json();
          setUser(data); 
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [token]);

  return (
    <Router>
      <Header user={user} /> 
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth setToken={setToken} />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
