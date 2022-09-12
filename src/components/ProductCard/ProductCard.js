import React from "react";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  cartSelector,
  deleteProduct,
} from "../../redux/products/ducks";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);

  return (
    <Paper key={product.id}>
      <Box px="1rem" py="1rem">
        <img
          src={product.imageURL}
          style={{ width: 150, height: 250, objectFit: "contain" }}
          alt="imag1"
        />
        <Typography variant="h6" guttterBottom>
          <span style={{ fontWeight: 900 }}>Title : </span> {product.name}{" "}
        </Typography>
        <Box display="flex" justiyContent="space-between" alignItems="center">
          <Typography variant="h6">
            <span style={{ fontWeight: 900 }}>Price : </span> {product.currency}{" "}
            {product.price}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            startIcon={
              cart.includes(product.id - 1) ? <CloseIcon /> : <AddIcon />
            }
            // disabled={cart.includes(product.id - 1)}
            disableElevation
            color={cart.includes(product.id - 1) ? "secondary" : "primary"}
            style={{ margin: "auto 1rem", textTransform: "unset" }}
            onClick={() => {
              if (cart.includes(product.id - 1)) {
                dispatch(deleteProduct(product.id - 1));
              } else {
                dispatch(addProduct(product.id - 1));
              }
            }}
          >
            {cart.includes(product.id - 1) ? "Remove" : "Add"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductCard;
