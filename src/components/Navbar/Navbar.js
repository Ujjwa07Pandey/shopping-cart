import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Badge, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartSelector } from "../../redux/products/ducks";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    boxShadow: "none",
  },

  title: {
    flexGrow: 1,
  },
}));
const Navbar = () => {
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  const cart = useSelector(cartSelector);
  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar style={{ margin: "auto 0.5rem" }}>
          <Typography variant="h5" className={classes.title}>
            TeeRex Store
          </Typography>
          <Link
            to="/"
            style={{
              textDecoration: "none",

              color: "#fff",
              margin: "auto 1.5rem",
            }}
          >
            <Typography variant="h6">Products</Typography>
            {location.pathname === "/" && (
              <Divider style={{ backgroundColor: "#fff" }} />
            )}
          </Link>

          <IconButton color="inherit" onClick={() => history.push("/cart")}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon
                fontSize="large"
                style={{
                  color: location.pathname === "/cart" ? "#fff" : "#000",
                }}
              />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
