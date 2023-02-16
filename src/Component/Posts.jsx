import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

const Posts = () => {
  const post = useSelector((state) => state.posts);
  console.log(post);
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
        {post.post.map((item, i) => {
          return (
            <>
              <Card sx={{ maxWidth: 345, margin: 5, padding: 5 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                      {item.userId}
                    </Avatar>
                  }
                  title={item.title}
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
                    {item.body}
                  </Typography>
                </CardContent>
              </Card>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default Posts;
