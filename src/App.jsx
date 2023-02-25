import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./Component/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Posts from "./Component/Posts";
import Products from "./Component/Products";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import EditProduct from "./Component/Edit";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/edit/:id" element={<EditProduct />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
