import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { cartReducer } from 'entities/cart';
import { favoritesReducer } from 'entities/favorites';

const cartPersistConfig = {
  key: 'bimed:cart',
  storage,
  whiteList: ['cart'],
};

const favoritesPersistConfig = {
  key: 'bimed:favorites',
  storage,
  whiteList: ['favorites'],
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  favorites: persistReducer(favoritesPersistConfig, favoritesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
