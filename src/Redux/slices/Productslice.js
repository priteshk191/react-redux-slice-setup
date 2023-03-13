import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserData } from "../../Helper/Data";

export const incrementAsync = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    // return UserData;         // json
    try {
      let response = await fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((json) => {
          return json.reverse();
        });
      return response;
    } catch {
      console.log("aaaaaaa");
    }
  }
);
const cartFromLocalStorage = localStorage.getItem('cart');

const initialState = {
  product: [],
  fav: [],
  cart: cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : []
};
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
      // Update cart data in local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    addToCart: (state, action) => {
      const newProduct = state.product.find((u) => u.id === action.payload.id);
      const newCart = [...state.cart, newProduct];
      state.cart = newCart;
      // Store cart data in local storage
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.product = action.payload;
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
export const { deleteProduct, favoriteProduct, removeFavoriteUser, addToCart, removeFromCart } =
  productsSlice.actions;

export default productsSlice.reducer;
