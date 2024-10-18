import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'shared/config';
import { Product } from 'types';

type CartItem = { product: Product; quantity: number };

interface CartState {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload: product }: PayloadAction<Product>) => {
      state.items.push({ product: product, quantity: 1 });
    },
    plusOneToCart: (state, { payload: product }: PayloadAction<Product>) => {
      const foundIndex = state.items.findIndex((item) => item.product.id === product.id);
      if (foundIndex !== -1) {
        state.items[foundIndex].quantity++;
      }
    },
    minusOneFromCart: (state, { payload: product }: PayloadAction<Product>) => {
      const foundIndex = state.items.findIndex((item) => item.product.id === product.id);
      if (foundIndex !== -1) {
        state.items[foundIndex].quantity--;
        if (state.items[foundIndex].quantity === 0) {
          state.items = state.items.filter((item) => item.product.id !== product.id);
        }
      }
    },
    inputToCart: (state, { payload }: PayloadAction<CartItem>) => {
      const foundIndex = state.items.findIndex((item) => item.product.id === payload.product.id);
      if (foundIndex !== -1) {
        state.items[foundIndex].quantity = payload.quantity;
        if (payload.quantity === 0) {
          state.items = state.items.filter((item) => item.product.id !== payload.product.id);
        }
      }
    },
    getCartTotalPrice: (state) => {
      state.totalPrice = state.items.reduce((acc, cur) => {
        return (acc += (cur.product.newPrice || cur.product.oldPrice) * cur.quantity);
      }, 0);
    },
    getCartTotalItems: (state) => {
      state.totalItems = state.items.length;
    },
  },
});

export const {
  addToCart,
  minusOneFromCart,
  plusOneToCart,
  inputToCart,
  getCartTotalPrice,
  getCartTotalItems,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartItemsTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartItemsTotal = (state: RootState) => state.cart.totalItems;
