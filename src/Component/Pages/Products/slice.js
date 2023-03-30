import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  product: [],
  fav: [],
  cart: [],
};

export const incrementAsync = createAsyncThunk(
  "products/incrementAsync",
  async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response;
    } catch (e) {
      return e.response;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      state.product = state.product.filter((u) => u.id !== action.payload.id);
    },
    favoriteProduct: (state, action) => {
      const index = state.fav.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) state.fav.splice(index, 1);
      else state.fav.push(action.payload);
    },
    removeFavoriteUser: (state, action) => {
      state.fav = state.product.filter((u) => u.id !== action.payload.id);
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((u) => u.id !== action.payload);
    },
    addToCart: (state, action) => {
      const newProduct = state.product.find((u) => u.id === action.payload.id);
      const newCart = [...state.cart, newProduct];
      state.cart = newCart;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action?.payload?.data;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed";
      });
    // .addMatcher(isRejectedAction, (state, action) => {
    //   state.error = action.error.message;
    // })
    // .addDefaultCase((state, action) => {});
  },
});
export const {
  deleteProduct,
  favoriteProduct,
  removeFavoriteUser,
  addToCart,
  removeFromCart,
} = productsSlice.actions;
export default productsSlice.reducer;
