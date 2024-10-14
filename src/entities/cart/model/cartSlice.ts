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
      state.items.push({ product_id: id, quantity: 1 });
    },
  },
});

export const { addToCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
