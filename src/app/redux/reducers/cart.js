"use client";
import { createSlice } from '@reduxjs/toolkit';
import { addMoney, subtractMoney} from '@/utils/moneyCalculations';
const initialState = {
    articles: [],
    numberOfArticles: 0,
    articlesSum: 0,
    orderType: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
       addArticleToCart: (state, action) => {
           state.articles.push(action.payload)
           state.numberOfArticles += action.payload.quantity
           state.articlesSum += action.payload.quantity * action.payload.foodPrice

        },
        incrementArticleQuantity: (state, action) => {
            state.articles[action.payload].quantity ++
            state.numberOfArticles ++
            state.articlesSum = addMoney(state.articlesSum, state.articles[action.payload].foodPrice)

        },
        decrementArticleQuantity: (state, action) => {
            state.articles[action.payload].quantity --
            state.numberOfArticles --
            state.articlesSum = subtractMoney(state.articlesSum, state.articles[action.payload].foodPrice)
            state.articles[action.payload].quantity === 0 && state.articles.splice(action.payload, 1)
        },
        selectOrderType: (state, action) => {
            state.orderType = action.payload
        }
    }
})
   
   export const { addArticleToCart, incrementArticleQuantity, decrementArticleQuantity, selectOrderType} = cartSlice.actions;
   export default cartSlice.reducer;