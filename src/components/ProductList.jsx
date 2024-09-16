import React, { useState } from 'react';
import ProductItem from './ProductItem';
import useFetchProducts from '../hooks/useFetchProducts';
import './ProductList.css';
const ProductList = () => {
  const { products, error, loading } = useFetchProducts();
  const [searchQuery, setSearchQuery] = useState('');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  // Filter products based on the search query
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="product-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};
export default ProductList;
