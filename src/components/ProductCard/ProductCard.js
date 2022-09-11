import React from "react";
import { Box, Button, Paper, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, cartSelector } from "../../redux/products/ducks";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);

  return (
    <Paper key={product.id}>
      <Box px="1rem" py="1rem">
        <img
          src={product.imageURL}
          style={{ width: 150, height: 250, objectFit: "contain" }}
        />
        <Box
          display="flex"
          my="1rem"
          justiyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">
            <span style={{ fontWeight: 900 }}>Price : </span> {product.currency}{" "}
            {product.price}
          </Typography>
          <Button
            type="submit"
            variant="contained"
            disabled={cart.includes(product.id - 1)}
            disableElevation
            color="primary"
            style={{ margin: "auto 1rem", textTransform: "unset" }}
            onClick={() => dispatch(addProduct(product.id - 1))}
          >
            {cart.includes(product.id - 1) ? "Added" : " Add to cart"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProductCard;
