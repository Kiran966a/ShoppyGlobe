import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import './ProductItem.css';
const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
  const defaultImage = 'https://via.placeholder.com/300x200'; 
  const imageSrc = imageError || !product.images.length 
    ? defaultImage 
    : product.images[0];

  return (
    <div className="product-item">
      <Link to={`/product/${product._id}`} className="product-link">
        <img 
          src={imageSrc} 
          alt={product.title} 
          className="product-image"
          onError={() => setImageError(true)} // Set error state if image fails to load
        />
        <h2 className="product-title">{product.title}</h2>
      </Link>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

// Define prop types for ProductItem
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired, 
  }).isRequired,
};

export default ProductItem;
