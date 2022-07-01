import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import { productsApi } from "../features/productsApi";
import productReducer, { productsFetch } from "../features/productSlice";
import { getTotals } from "../features/cartSlice";


export const store=configureStore({
 reducer:{
 products:productReducer,
 cart:cartReducer,
 [productsApi.reducerPath]:productsApi.reducer,
 },
 middleware: (getDefaultMiddleware) =>
 getDefaultMiddleware().concat(productsApi.middleware),

})
store.dispatch(productsFetch());
store.dispatch(getTotals());

