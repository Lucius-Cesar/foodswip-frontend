"use client";

import { configureStore } from "@reduxjs/toolkit";
import restaurant from "./reducers/restaurant";

const store = configureStore({
  reducer: {
    restaurant
  },
});

export default store;