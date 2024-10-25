import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'shared/config';
import { Product } from 'types';

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleItemInFavorites: (state, { payload: product }: PayloadAction<Product>) => {
      const foundIndex = state.items.findIndex((item) => item.id === product.id);
      if (foundIndex === -1) {
        state.items.push(product);
      } else {
        state.items = state.items.filter((item) => item.id !== product.id);
      }
    },
  },
});

export const { toggleItemInFavorites } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;

export const selectFavoriteItems = (state: RootState) => state.favorites.items;
