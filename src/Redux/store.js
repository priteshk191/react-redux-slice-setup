import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; //or session
import PostsSlice from "./slices/PostsSlice";
import Productslice from "./slices/Productslice";
const appReducer = combineReducers({
  products: Productslice,
  posts: PostsSlice,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["products", "posts"],
};
// clear persist for remove all data
const rootReducer = (state, action) => {
  // if (action.type === "User/logout") {
  //   storage.removeItem("persist:root");
  //   return appReducer(undefined, action);
  // }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});

export const persistor = persistStore(store);
export default store;
