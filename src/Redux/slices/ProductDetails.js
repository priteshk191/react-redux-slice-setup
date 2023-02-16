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
const productsSlice = createSlice({
  name: "products",
  initialState: {
    user: [],
  },
  reducers: {
    deleteUser: (state, action) => {
      state.user = state.user.filter((u) => u.id !== action.payload.id);
    },
  },
  extraReducers: {
    [incrementAsync.pending]: (state, action) => {
      state.status = "pending";
    },
    [incrementAsync.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.status = "success";
    },
    [incrementAsync.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});
export const { deleteUser } = productsSlice.actions;

export default productsSlice.reducer;
