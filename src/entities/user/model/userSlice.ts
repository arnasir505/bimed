import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'shared/config';
import { Product, RegisterForm, User } from 'types';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.isLoggedIn = false;
    },
    updateUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
      state.isLoggedIn = true;
    },
    editUserFields: (state, { payload }: PayloadAction<RegisterForm>) => {
      state.user!.firstName = payload.firstName;
      state.user!.lastName = payload.lastName;
      state.user!.dateOfBirth = payload.dateOfBirth;
      state.user!.phone = payload.phone;
    },
    loginUser: (state, { payload }: PayloadAction<string>) => {
      if (state.user?.phone === payload) {
        state.isLoggedIn = true;
      }
    },
    updateUserPhone: (state, { payload }: PayloadAction<string>) => {
      state.user!.phone = payload;
    },
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

export const {
  toggleItemInFavorites,
  unsetUser,
  updateUser,
  loginUser,
  editUserFields,
  updateUserPhone,
} = userSlice.actions;

export const userReducer = userSlice.reducer;

export const selectFavoriteItems = (state: RootState) => state.user.user?.favorites;
export const selectUser = (state: RootState) => state.user.user;
export const selectIsUserLoggedIn = (state: RootState) => state.user.isLoggedIn;
