import React from "react";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  deleteProduct,
  favoriteProduct,
} from "../Redux/slices/Productslice.js";

const Products = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.products);

  const handelDelete = (item) => {
    dispatch(deleteProduct(item));
    toast.success(`Product Deleted`);
  };
  const handleFavData = (item) => {
    dispatch(favoriteProduct(item));
    toast.success("Favorite Added Successfully");
  };

  const CardMain = styled("div")({
    maxWidth: 345,
    background: "#fff",
    margin: 5,
    padding: 5,
    border: "1px solid #1976d2",
    borderRadius: "6px",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.2)",
    },
  });

  return (
    <>
      <Box
        sx={{
          marginTop: "100px",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {users.status === "pending" && users.user.length <= 0 ? (
          <CircularProgress sx={{ marginTop: 50 }} />
        ) : (
          users?.user?.map((item, i) => {
            return (
              <CardMain>
                <Box
                  component="img"
                  sx={{
                    height: 350,
                    width: 350,
                    maxHeight: { xs: 350, md: 230 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="The house from the offer."
                  src={item.image}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 1 }}
                  >
                    {item.title}
                  </Typography>

                  {/* <Box sx={{ display: "flex", gap: "10px" }}>
                    <Typography variant="body2" color="text.secondary">
                      {item.rating.count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.rating.rate}
                    </Typography>
                  </Box> */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 1, marginTop: 2 }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 1, marginTop: 4 }}
                  >
                    Price : ${item.price}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handelDelete(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Link to={`edit/${item.id}`}>
                    <IconButton aria-label="share">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="star"
                    onClick={() => handleFavData(item)}
                  >
                    {users.fav.find((i) => i.id === item.id) ? (
                      <StarIcon sx={{ fill: "green" }} />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButton>
                </CardActions>
              </CardMain>
            );
          })
        )}
      </Box>
    </>
  );
};
export default Products;
