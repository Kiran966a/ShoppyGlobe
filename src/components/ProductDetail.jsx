import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice'; 
import BackButton from './BackButton'; 
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`); 
        setProduct(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching product details.'); 
      }
    };

    fetchProductDetail();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (error) return <p>{error}</p>; 
  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-container">
      <BackButton /> 
      <div className="product-detail">
        <div className="product-main-image-container">
          <img
            src={product.images[0]}
            alt={product.title}
            className="product-main-image"
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
