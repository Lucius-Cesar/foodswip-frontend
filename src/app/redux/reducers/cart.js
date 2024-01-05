import { createSlice } from "@reduxjs/toolkit";
import {
  addMoney,
  subtractMoney,
  multiplyMoney,
} from "@/utils/moneyCalculations";
const initialState = {
  articles: [],
  numberOfArticles: 0,
  articlesSum: 0,
  orderType: 0,
  note: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addArticleToCart: (state, action) => {
      state.articles.push(action.payload);
      state.numberOfArticles += action.payload.quantity;
      state.articlesSum = addMoney(
        state.articlesSum,
        multiplyMoney(action.payload.quantity, action.payload.foodPrice)
      );
    },
    incrementArticleQuantity: (state, action) => {
      const { index, increment } = action.payload;
      state.articles[index].quantity =
        state.articles[index].quantity + increment;
      state.numberOfArticles = state.numberOfArticles + increment;
      state.articlesSum = addMoney(
        state.articlesSum,
        multiplyMoney(state.articles[index].foodPrice, increment)
      );
    },
    decrementArticleQuantity: (state, action) => {
      state.articles[action.payload].quantity--;
      state.numberOfArticles--;
      state.articlesSum = subtractMoney(
        state.articlesSum,
        state.articles[action.payload].foodPrice
      );
      state.articles[action.payload].quantity === 0 &&
        state.articles.splice(action.payload, 1);
    },
    selectOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    addNote: (state, action) => {
      state.note = action.payload;
    },
  },
});

export const {
  addArticleToCart,
  incrementArticleQuantity,
  decrementArticleQuantity,
  selectOrderType,
  addNote,
} = cartSlice.actions;
export default cartSlice.reducer;
