import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice'; // Adjust path if necessary

// Create the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});

// Export the store
export default store;
