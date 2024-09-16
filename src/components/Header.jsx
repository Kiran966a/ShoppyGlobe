import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaHome, FaInfoCircle, FaCreditCard } from 'react-icons/fa'; 
import { selectCartTotalQuantity } from '../features/cartSlice'; 
import './Header.css'; 
const Header = () => {
  const totalQuantity = useSelector(selectCartTotalQuantity); 
  return (
    <header className="header">
      <div className="logo">ShoppyGlobe</div> 
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">
              <FaHome className="nav-icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FaInfoCircle className="nav-icon" />
              About
            </Link>
          </li>
          <li>
            <Link to="/checkout">
              <FaCreditCard className="nav-icon" />
              Checkout
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <FaShoppingCart className="nav-icon" />
              Cart <span className="cart-count">({totalQuantity})</span> 
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
