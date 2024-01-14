import { createSlice } from "@reduxjs/toolkit";
import {
  addMoney,
  subtractMoney,
  multiplyMoney,
} from "@/utils/moneyCalculations";
const initialState = {
  value: {
    articles: [],
    numberOfArticles: 0,
    articlesSum: 0,
    orderType: 0,
    note: "",
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addArticleToCart: (state, action) => {
      state.value.articles.push(action.payload);
      state.value.numberOfArticles += action.payload.quantity;
      state.value.articlesSum = addMoney(
        state.value.articlesSum,
        multiplyMoney(action.payload.quantity, action.payload.foodPrice)
      );
    },
    incrementArticleQuantity: (state, action) => {
      const { index, increment } = action.payload;
      state.value.articles[index].quantity =
        state.value.articles[index].quantity + increment;
      state.value.numberOfArticles = state.value.numberOfArticles + increment;
      state.value.articlesSum = addMoney(
        state.value.articlesSum,
        multiplyMoney(state.value.articles[index].foodPrice, increment)
      );
    },
    decrementArticleQuantity: (state, action) => {
      state.value.articles[action.payload].quantity--;
      state.value.numberOfArticles--;
      state.value.articlesSum = subtractMoney(
        state.value.articlesSum,
        state.value.articles[action.payload].foodPrice
      );
      state.value.articles[action.payload].quantity === 0 &&
        state.value.articles.splice(action.payload, 1);
    },
    selectOrderType: (state, action) => {
      state.value.orderType = action.payload;
    },
    addNote: (state, action) => {
      state.value.note = action.payload;
    },
    clearCart: (state, action) => {
      state.value = initialState.value;
    },
  },
});

export const {
  addArticleToCart,
  incrementArticleQuantity,
  decrementArticleQuantity,
  selectOrderType,
  addNote,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
