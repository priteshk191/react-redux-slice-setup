import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { Box, Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, favoriteUser } from "../Redux/slices/UserSlice.js";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.products);

  const handelDeleteUser = (item) => {
    dispatch(deleteUser(item));
    toast.error(`${item.name} Deleted`);
  };
  const handleFavData = (item) => {
    dispatch(favoriteUser(item));
    toast.success(
      `${item.name} ${
        users.fav.find((i) => i.id === item.id) ? "Removed" : "Added"
      } From Favorite`
    );
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {users.status === "pending" && users.user.length <= 0 ? (
          <CircularProgress sx={{ marginTop: 50 }} />
        ) : (
          users.user.map((item, i) => {
            return (
              <Card sx={{ maxWidth: 345, margin: 5, padding: 5 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                      {item.name.charAt(0)}
                    </Avatar>
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item.name}
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
                    {item.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.phone}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.website}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handelDeleteUser(item)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="star"
                    onClick={() => handleFavData(item)}
                  >
                    {users.fav.find((i) => i.id === item.id) ? (
                      <StarIcon />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButton>
                </CardActions>
              </Card>
            );
          })
        )}
      </Box>
    </>
  );
};
export default Dashboard;
