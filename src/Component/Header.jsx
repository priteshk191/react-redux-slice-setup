import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useDispatch } from "react-redux";
import { incrementAsync } from "../Redux/slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import { GetPosts } from "../Redux/slices/PostsSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FitbitIcon from "@mui/icons-material/Fitbit";

const pages = ["Products", "Posts"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElNav(null);
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
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    handleCloseNavMenu();
    setAnchorElNav(null);
    // if (e.target.innerText === "Logout") window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ borderRadius: "6px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <FitbitIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => {
              navigate("/");
            }}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Home
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontWeight: 500,
                  fontSize: "15px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Cart">
              <Link to="/cart">
                <IconButton
                  //  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <ShoppingCartIcon style={{ color: "#fff" }} />
                </IconButton>
              </Link>
            </Tooltip>
            {/* <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={(e) => handleCloseUserMenu(e)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={(e) => handleCloseUserMenu(e)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
