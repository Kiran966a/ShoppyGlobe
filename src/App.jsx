import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './components/Login'; // Import the Login component
import Register from './components/Register'; // Import the Register component
import Profile from './components/Profile'; // Import the Profile component

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));
const Cart = lazy(() => import('./components/Cart'));
const Checkout = lazy(() => import('./components/Checkout')); 
const About = lazy(() => import('./components/About'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const [token, setToken] = React.useState(null); // Manage the token state

  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setToken={setToken} />} /> {/* Add Login route */}
          <Route path="/register" element={<Register />} /> {/* Add Register route */}
          <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
