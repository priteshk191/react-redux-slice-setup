import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Products/slice";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  TextField,
  Container,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const QuantityField = styled(TextField)({
  width: 60,
  marginLeft: "16px",
  marginRight: "16px",
});
const CartItem = styled(ListItem)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
    {
      "-webkit-appearance": "none",
      margin: 0,
    },
});
const CartItemImage = styled(Avatar)({
  marginRight: "16px",
});
const CartContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
});
const CartPaper = styled(Paper)({
  padding: "24px",
});
export default function Cart() {
  const { cart } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value);
    // dispatch(updateQuantity({ id, quantity }));
  };
  return (
    <CartContainer maxWidth="md">
      <CartPaper>
        <Typography variant="h6">Cart</Typography>
        {cart?.length === 0 ? (
          <Typography variant="subtitle1">Your cart is empty</Typography>
        ) : (
          <List>
            {cart &&
              cart.length > 0 &&
              cart?.map((item) => (
                <CartItem key={item.id}>
                  <ListItemAvatar>
                    <CartItemImage alt={item.title} src={item.image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={`Price: $${item.price}`}
                  />
                  <QuantityField
                    type="number"
                    label="Quantity"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    size="small"
                    value={item.quantity ? item.quantity : 1}
                    onChange={(event) => handleQuantityChange(item.id, event)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </CartItem>
              ))}
            <Button variant="contained" color="primary">
              Checkout
            </Button>
          </List>
        )}
      </CartPaper>
    </CartContainer>
  );
}
