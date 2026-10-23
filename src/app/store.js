import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
} from "redux-persist";

import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";


const storage = {
  getItem: (key) => {
    return Promise.resolve(window.localStorage.getItem(key));
  },

  setItem: (key, value) => {
    window.localStorage.setItem(key, value);
    return Promise.resolve(value);
  },

  removeItem: (key) => {
    window.localStorage.removeItem(key);
    return Promise.resolve();
  },
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedCartReducer = persistReducer(
  cartPersistConfig,
  cartReducer
);

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: persistedCartReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
        ],
      },
    }),
});

export const persistor = persistStore(store);