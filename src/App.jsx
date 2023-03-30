import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResponsiveAppBar from "./Component/Common/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Posts from "./Component/Pages/Posts/Posts";
import Products from "./Component/Pages/Products/Products";
import Home from "./Component/Pages/Home/Home";
import Cart from "./Component/Pages/Cart/Cart";
import EditProduct from "./Component/Edit";
import Box from "@mui/material/Box";
function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <ToastContainer />
      <Box sx={{ paddingTop: "60px", flex: 1, overflowY: "auto" }}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/edit/:id" element={<EditProduct />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
