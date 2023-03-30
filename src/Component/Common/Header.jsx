import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { incrementAsync } from "../Pages/Products/slice";
import { Link, useNavigate } from "react-router-dom";
import { GetPosts } from "../Pages/Posts/slice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FitbitIcon from "@mui/icons-material/Fitbit";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { styled } from "@mui/system";

const pages = ["Home", "Products", "Posts"];
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -1,
    top: 0,
    padding: "1px",
    backgroundColor: "#FF6B6B",
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    minWidth: "20px",
    minHeight: "20px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
function ResponsiveAppBar() {
  const cart = useSelector((state) => state.products.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [tab, setTab] = React.useState(2);
  React.useEffect(() => {
    const url = window.location.href;
    if (!pages.some((word) => url.includes(word.toLowerCase()))) {
      setTab(1);
    }
  });
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const handleCloseNavMenu = (e) => {
    if (e.target.innerText === "PRODUCTS") {
      dispatch(incrementAsync());
      navigate("/products");
    }
    if (e.target.innerText === "POSTS") {
      navigate("/posts");
      dispatch(GetPosts());
    }
    if (e.target.innerText === "HOME") {
      navigate("/");
    }
    setAnchorElNav(null);
  };
  return (
    <Box>
      <AppBar
        sx={{
          width: "100%",
          padding: "0",
          position: "fixed",
          borderRadius: "6px",
          color: "#1976d2",
          background: "#fff",
          boxShadow: "none",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <FitbitIcon sx={{ display: { md: "flex" }, mr: 1 }} />
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={tab}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                centered
              >
                {pages.map((page, i) => (
                  <Tab
                    key={i}
                    onClick={handleCloseNavMenu}
                    value={i + 2}
                    label={page}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#1976d2",
                    }}
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Cart">
                <Link to="/cart">
                  <IconButton sx={{ p: 0, color: "#1976d2" }} aria-label="cart">
                    <StyledBadge
                      badgeContent={cart.length > 0 ? cart.length : 0}
                      color="secondary"
                    >
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </IconButton>
                </Link>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
export default ResponsiveAppBar;
