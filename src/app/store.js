import { configureStore } from "@reduxjs/toolkit";

import ProductReducer from "../feature/products/ProductSlice";


export const store = configureStore({
    reducer: {

        ProductReducer: ProductReducer,

    },
});