import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart } from '../features/cartSlice';
import CartItem from './CartItem';
import BackButton from './BackButton';
import './Cart.css';
const Cart = () => {
  const cartItems = useSelector((state) => state.cart); // Selects cart items from the Redux store
  const dispatch = useDispatch(); // Provides access to dispatch actions
  const navigate = useNavigate(); // Provides navigation functionality

  // Dispatches the action to remove a product from the cart
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  // Navigates to the checkout page
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <BackButton /> 
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p> 
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} onRemove={handleRemoveFromCart} />
          ))}
        </div>
      )}
      <button className="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
