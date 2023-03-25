import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  posts: [],
  status: "idle",
  error: null,
};
export const GetPosts = createAsyncThunk("posts/GetPosts", async () => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response;
  } catch (e) {
    return e.response;
  }
});
const PostSlice = createSlice({
  name: "posts",
  initialState: initialState,
  //   reducers: {
  //     deleteUser: (state, action) => {`
  //       state.user = state.user.filter((u) => u.id !== action.payload.id);
  //     },
  //     favoriteUser: (state, action) => {
  //       const index = state.fav.findIndex(
  //         (item) => item.id === action.payload.id
  //       );
  //       if (index !== -1) state.fav.splice(index, 1);
  //       else state.fav.push(action.payload);
  //     },
  //     removeFavoriteUser: (state, action) => {
  //       state.fav = state.user.filter((u) => u.id !== action.payload.id);
  //     },
  //   },
  extraReducers: (builder) => {
    builder
      .addCase(GetPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(GetPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action?.payload?.data;
      })
      .addCase(GetPosts.rejected, (state) => {
        state.status = "failed";
      });
    // .addMatcher(isRejectedAction, (state, action) => {
    //   state.error = action.error.message;
    // })
    // .addDefaultCase((state, action) => {});
  },
});
//export const { deleteUser, favoriteUser, removeFavoriteUser } = PostSlice.actions;
export default PostSlice.reducer;
