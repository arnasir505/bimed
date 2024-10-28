import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'shared/config';
import { Product, User } from 'types';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleItemInFavorites: (state, { payload: product }: PayloadAction<Product>) => {
      const foundIndex = state.user?.favorites.findIndex((item) => item.id === product.id);
      if (foundIndex === -1) {
        state.user!.favorites.push(product);
      } else {
        state.user!.favorites = state.user!.favorites.filter((item) => item.id !== product.id);
      }
    },
  },
});

export const { toggleItemInFavorites } = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectFavoriteItems = (state: RootState) => state.user.user?.favorites;
export const selectUser = (state: RootState) => state.user.user;
