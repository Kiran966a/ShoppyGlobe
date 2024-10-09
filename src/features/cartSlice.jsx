import { createSlice } from '@reduxjs/toolkit';
const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find(item => item._id === product._id);
     
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload._id;
      return state.filter(item => item._id !== productId);
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const product = state.find(item => item._id === _id);
      if (product) {
        product.quantity = quantity;
      }
    }
  }
});
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export const selectCartItems = (state) => state.cart;
export const selectCartTotalQuantity = (state) =>
  state.cart.reduce((total, item) => total + item.quantity, 0);
export default cartSlice.reducer;
