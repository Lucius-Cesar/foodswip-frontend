import { createSlice } from "@reduxjs/toolkit";
import {
  addMoney,
  subtractMoney,
  multiplyMoney,
} from "@/utils/moneyCalculations";
const initialState = {
  data: {
    articles: [],
    numberOfArticles: 0,
    articlesSum: 0,
    totalSum: 0,
    orderType: 0,
    note: "",
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addArticleToCart: (state, action) => {
      state.data.articles.push(action.payload);
      state.data.numberOfArticles += action.payload.quantity;
      state.data.articlesSum = addMoney(
        state.data.articlesSum,
        multiplyMoney(action.payload.quantity, action.payload.price)
      );
    },
    incrementArticleQuantity: (state, action) => {
      const { index, increment } = action.payload;
      state.data.articles[index].quantity =
        state.data.articles[index].quantity + increment;
      state.data.numberOfArticles = state.data.numberOfArticles + increment;
      state.data.articlesSum = addMoney(
        state.data.articlesSum,
        multiplyMoney(state.data.articles[index].price, increment)
      );
    },
    decrementArticleQuantity: (state, action) => {
      state.data.articles[action.payload].quantity--;
      state.data.numberOfArticles--;
      state.data.articlesSum = subtractMoney(
        state.data.articlesSum,
        state.data.articles[action.payload].price
      );
      state.data.articles[action.payload].quantity === 0 &&
        state.data.articles.splice(action.payload, 1);
    },
    updateTotalSum: (state, action) => {
      state.data.totalSum = action.payload;
    },
    selectOrderType: (state, action) => {
      state.data.orderType = action.payload;
    },
    addNote: (state, action) => {
      state.data.note = action.payload;
    },
    clearCart: (state, action) => {
      state.data = initialState.data;
    },
  },
});

export const {
  addArticleToCart,
  incrementArticleQuantity,
  decrementArticleQuantity,
  updateTotalSum,
  selectOrderType,
  addNote,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
