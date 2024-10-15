import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'shared/config';

type CartItem = { product_id: string; quantity: number };

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload: id }: PayloadAction<string>) => {
      const foundIndex = state.items.findIndex((item) => item.product_id === id);
      if (foundIndex === -1) {
        state.items.push({ product_id: id, quantity: 1 });
      } else {
        state.items[foundIndex].quantity++;
      }
    },
    plusOneToCart: (state, { payload: id }: PayloadAction<string>) => {
      const foundIndex = state.items.findIndex((item) => item.product_id === id);
      if (foundIndex !== -1) {
        state.items[foundIndex].quantity++;
      }
    },
    minusOneFromCart: (state, { payload: id }: PayloadAction<string>) => {
      const foundIndex = state.items.findIndex((item) => item.product_id === id);
      if (foundIndex !== -1) {
        state.items[foundIndex].quantity--;
        if (state.items[foundIndex].quantity === 0) {
          state.items = state.items.filter((item) => item.product_id !== id);
        }
      }
    },
    inputToCart: (state, { payload }: PayloadAction<CartItem>) => {
      const foundIndex = state.items.findIndex((item) => item.product_id === payload.product_id);
      if (foundIndex !== -1) {
        state.items[foundIndex].quantity = payload.quantity;
        if (payload.quantity === 0) {
          state.items = state.items.filter((item) => item.product_id !== payload.product_id);
        }
      }
    },
  },
});

export const { addToCart, minusOneFromCart, plusOneToCart, inputToCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
