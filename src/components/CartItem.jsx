import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../features/cartSlice';
import './CartItem.css'; 

const CartItem = ({ item, onRemove }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity);

  // Dispatches the action to remove the item from the cart
  const handleRemove = () => {
    dispatch(removeFromCart(item));
  };

  // Handles changes to the quantity input and updates the state and Redux store
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="cart-item">
      <img
        src={item.images[0]} 
        alt={item.title}
        className="cart-item-image"
      />
      <div className="cart-item-info">
        <h3>{item.title}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <p>Quantity: 
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="quantity-input"
          />
        </p>
        <button onClick={handleRemove}>Remove from Cart</button>
      </div>
    </div>
  );
};

export default CartItem;
