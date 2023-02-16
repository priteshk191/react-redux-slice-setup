import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import ResponsiveAppBar from "./Component/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Posts from "./Component/Posts";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <ResponsiveAppBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
