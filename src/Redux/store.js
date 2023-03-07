import { configureStore } from "@reduxjs/toolkit";
import PostsSlice from "./slices/PostsSlice";
import Productslice from "./slices/Productslice";

export const store = configureStore({
  reducer: {
    products: Productslice,
    posts: PostsSlice,
  },
});
