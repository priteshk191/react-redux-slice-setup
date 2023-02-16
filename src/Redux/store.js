import { configureStore } from "@reduxjs/toolkit";
import ProductDetails from "./slices/ProductDetails";

export const store = configureStore({
  reducer: {
    products: ProductDetails,
  },
});
