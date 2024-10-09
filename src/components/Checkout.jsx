import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '../features/cartSlice'; 
import BackButton from './BackButton'; 
import axios from 'axios'; // Import axios for HTTP requests
import './Checkout.css';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    // Validation logic
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city ||
        !shippingInfo.state || !shippingInfo.postalCode || !shippingInfo.country ||
        !paymentInfo.cardNumber || !paymentInfo.expirationDate || !paymentInfo.cvv) {
      setError('Please fill in all fields.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:5000/api/checkout', {
          shippingInfo,
          paymentInfo,
        });

        setSuccess('Order placed successfully!');
        // Optionally clear the cart or redirect the user
      } catch (err) {
        setError(err.response?.data?.message || 'Checkout failed.');
      }
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="checkout-page">
      <BackButton /> 
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        {/* Order Summary Section */}
        <section className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.length > 0 ? (
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  {item.images.length > 0 && (
                    <img src={item.images[0]} alt={item.title} className="product-image" />
                  )}
                  <div className="item-details">
                    <p>{item.title} - {item.quantity} x ${item.price.toFixed(2)}</p>
                    <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <p>Total: ${calculateTotal()}</p>
        </section>

        {/* Shipping Information Section */}
        <section className="shipping-info">
          <h2>Shipping Information</h2>
          <input type="text" name="name" value={shippingInfo.name} onChange={handleShippingChange} placeholder="Full Name" required />
          <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} placeholder="Address" required />
          <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingChange} placeholder="City" required />
          <input type="text" name="state" value={shippingInfo.state} onChange={handleShippingChange} placeholder="State" required />
          <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingChange} placeholder="Postal Code" required />
          <input type="text" name="country" value={shippingInfo.country} onChange={handleShippingChange} placeholder="Country" required />
        </section>

        {/* Payment Information Section */}
        <section className="payment-info">
          <h2>Payment Information</h2>
          <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} placeholder="Card Number" required />
          <input type="text" name="expirationDate" value={paymentInfo.expirationDate} onChange={handlePaymentChange} placeholder="Expiration Date (MM/YY)" required />
          <input type="text" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} placeholder="CVV" required />
        </section>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
