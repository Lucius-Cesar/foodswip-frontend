"use client";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import restaurant from "@/redux/restaurant/restaurantSlice";
import cart from "@/redux/cart/cartSlice";
import auth from "@/redux/auth/authSlice";

//workaround (redux-persist failed to create sync storage. falling back to noop storage when you import storage from redux-persist/lib/storage) because you cannot create the local storage in Node.js.
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const reducers = combineReducers({ restaurant, cart, auth });
const persistConfig = { key: "root", storage, blacklist: ["auth"] };

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
