"use client";

import { configureStore } from "@reduxjs/toolkit";
import restaurant from "./reducers/restaurant";
import cart from "./reducers/cart";



const store = configureStore({
  reducer: {
    restaurant,
    cart
  },
});

export default store;