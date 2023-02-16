import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserData } from "../../Helper/Data";

export const incrementAsync = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    // return UserData;         // json
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((json) => {
          return json;
        });
      return response;
    } catch {
      console.log("aaaaaaa");
    }
  }
);
const initialState = {
  user: [],
  fav: [],
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.user = state.user.filter((u) => u.id !== action.payload.id);
    },
    favoriteUser: (state, action) => {
      const index = state.fav.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.fav.splice(index, 1);
      else state.fav.push(action.payload);
    },
    removeFavoriteUser: (state, action) => {
      state.fav = state.user.filter((u) => u.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";
      })
      .addCase(incrementAsync.rejected, (state, action) => {
        state.status = "rejected";
      });
    // .addMatcher(isRejectedAction, (state, action) => {
    //   state.error = action.error.message;
    // })
    // .addDefaultCase((state, action) => {});
  },
});
export const { deleteUser, favoriteUser, removeFavoriteUser } =
  productsSlice.actions;

export default productsSlice.reducer;
