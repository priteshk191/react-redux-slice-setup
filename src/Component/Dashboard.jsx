import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, incrementAsync } from "../Redux/slices/ProductDetails.js";

export default function Dashboard() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.products.user);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {users.length <= 0 ? (
        <Button onClick={() => dispatch(incrementAsync())} variant="contained">
          Products
        </Button>
      ) : (
        users.map((item, i) => {
          return (
            <Card sx={{ maxWidth: 345, margin: 5 }}>
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

              <CardContent>
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
                  aria-label="add to favorites"
                  onClick={() => dispatch(deleteUser(item))}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })
      )}
    </Box>
  );
}
