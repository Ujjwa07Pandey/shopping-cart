import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import {
  productsSelector,
  cartSelector,
  deleteProduct,
} from "../../redux/products/ducks";

import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
const CartPage = () => {
  const cart = useSelector(cartSelector);
  const products = useSelector(productsSelector);
  const [qty, setQuantity] = useState(null);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    if (cart.length > 0) {
      const qtyMap = new Map();
      let temp = products.filter((x) => cart.includes(x.id - 1));
      let temp_total = 0;
      for (let i = 0; i < temp.length; i++) {
        qtyMap.set(temp[i]["id"] - 1, 1);
        temp_total += temp[i]["price"];
      }
      setTotal(temp_total);
      setQuantity(Object.fromEntries(qtyMap));
    } else {
      setTotal(0);
    }
    // eslint-disable-next-line
  }, [cart]);
  useEffect(() => {
    if (qty !== null) {
      let temp = products.filter((x) => cart.includes(x.id - 1));
      let temp_total = 0;
      for (let i = 0; i < temp.length; i++) {
        temp_total += temp[i]["price"] * qty[temp[i]["id"] - 1];
      }
      setTotal(temp_total);
    }
    // eslint-disable-next-line
  }, [qty]);
  const handleChange = (e) => {
    setQuantity({
      ...qty,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      <Box my="2rem">
        <Typography variant="h4" style={{ fontWeight: 500 }} align="left">
          Shopping Cart
        </Typography>
      </Box>
      <Typography
        variant="h4"
        style={{ fontWeight: 900 }}
        gutterBottom
        align="center"
      >
        Total = INR {total}
      </Typography>
      <Box
        display={"flex"}
        flexDirection="column"
        justifyContent={"center"}
        alignItems="center"
        style={{
          maxHeight: cart.length % 2 === 0 ? 4 * 142 : 5 * 142,
          overflowY: "scroll",
        }}
      >
        {cart.length > 0 ? (
          <>
            {products
              .filter((x) => cart.includes(x.id - 1))
              .map((product, i) => (
                <Box my="1rem" maxWidth="500px">
                  <Grid container spacing={3}>
                    <Grid item xs={3}>
                      <img
                        src={product.imageURL}
                        style={{ width: 100, height: 100 }}
                        alt="imag1"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Box mx="1rem">
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{ fontWeight: 400 }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          gutterBottom
                          style={{ fontWeight: 400 }}
                        >
                          {product.currency} {product.price}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Box mx="2rem">
                        {qty !== null && (
                          <FormControl variant="outlined">
                            <InputLabel id="demo-simple-select-outlined-label">
                              Qty
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined"
                              value={qty[product.id - 1]}
                              onChange={handleChange}
                              name={product.id - 1}
                              label="Qty"
                            >
                              {Array(product.quantity)
                                .fill()
                                .map((_, i) => (
                                  <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        )}
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        type="submit"
                        variant="contained"
                        disableElevation
                        color="primary"
                        style={{
                          margin: "auto 0.5rem",
                          textTransform: "unset",
                        }}
                        onClick={() => dispatch(deleteProduct(product.id - 1))}
                      >
                        {!mobile ? "Delete" : <DeleteIcon />}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              ))}
          </>
        ) : (
          <Typography variant="h5" align="center">
            Empty Cart , Add Some Products !
          </Typography>
        )}
      </Box>
    </Layout>
  );
};

export default CartPage;
