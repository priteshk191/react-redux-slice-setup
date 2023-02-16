import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetPosts = createAsyncThunk("post/fetchPostData", async () => {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => {
        return json;
      });
    return response;
  } catch {
    console.log("aaaaaaa");
  }
});
const initialState = {
  post: [],
};
const PostSlice = createSlice({
  name: "posts",
  initialState,
  //   reducers: {
  //     deleteUser: (state, action) => {
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
      .addCase(GetPosts.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(GetPosts.fulfilled, (state, action) => {
        state.post = action.payload;
        state.status = "success";
      })
      .addCase(GetPosts.rejected, (state, action) => {
        state.status = "rejected";
      });
    // .addMatcher(isRejectedAction, (state, action) => {
    //   state.error = action.error.message;
    // })
    // .addDefaultCase((state, action) => {});
  },
});
export const {} = PostSlice.actions;

export default PostSlice.reducer;
