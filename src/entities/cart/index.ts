export {
  addToCart,
  minusOneFromCart,
  plusOneToCart,
  inputToCart,
  getCartTotalPrice,
  getCartTotalItems,
  deleteFromCart,
  clearCart,
} from './model/cartSlice';

export { cartReducer } from './model/cartSlice';

export {
  selectCartItems,
  selectCartItemsTotal,
  selectCartItemsTotalPrice,
} from './model/cartSlice';
