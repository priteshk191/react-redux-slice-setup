import { configureStore } from "@reduxjs/toolkit";
import PostsSlice from "./slices/PostsSlice";
import UserSlice from "./slices/UserSlice";

export const store = configureStore({
  reducer: {
    products: UserSlice,
    posts: PostsSlice,
  },
});
