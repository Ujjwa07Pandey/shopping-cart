import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../redux/notifications/ducks";
import { setProducts, productsSelector } from "../../redux/products/ducks";
import Loading from "./../../components/Loading/Loading";
import ProductCard from "../../components/ProductCard/ProductCard";
import Fuse from "fuse.js";
import axios from "axios";

const filtersList = [
  {
    filter_name: "Color",
    options: ["Red", "Blue", "Green"],
  },
  {
    filter_name: "Gender",
    options: ["Men", "Women"],
  },
  {
    filter_name: "Type",
    options: ["Polo", "Hoodie", "Basic"],
  },
];

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProductsData] = useState(null);
  const productsData = useSelector(productsSelector);
  const [priceFilter, setPriceFilter] = useState({
    p1: false,
    p2: false,
    p3: false,
  });
  const [filters, setFilters] = useState({
    Color: [],
    Gender: [],
    Type: [],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(
          "https://leaguex.s3.ap-south-1.amazonaws.com/task/shopping/catalogue.json"
        );
        if (res?.status === 200) {
          dispatch(setProducts(res.data));
          setProductsData(res.data);

          setLoading(false);
        } else {
          dispatch(
            setNotification("An error has occured , Try Again", "error", true)
          );
        }
      } catch (err) {
        console.error(err);
        dispatch(setNotification(err.message, "error", true));
      }
    }
    fetchProducts();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (productsData !== null) {
      let temp = productsData
        .filter((x) => {
          if (filters.Color.length > 0) {
            return filters.Color.includes(x.color);
          } else {
            return true;
          }
        })
        .filter((x) => {
          if (filters.Gender.length > 0) {
            return filters.Gender.includes(x.gender);
          } else {
            return true;
          }
        })
        .filter((x) => {
          if (filters.Type.length > 0) {
            return filters.Type.includes(x.type);
          } else {
            return true;
          }
        })
        .filter((x) => {
          if (priceFilter.p1 && priceFilter.p2) {
            return x.price > 0 && x.price <= 450;
          } else if (priceFilter.p2 && priceFilter.p3) {
            return x.price > 251;
          } else if (priceFilter.p1 && priceFilter.p3) {
            return x.price > 450;
          } else if (priceFilter.p1) {
            return x.price > 0 && x.price <= 250;
          } else if (priceFilter.p2) {
            return x.price > 251 && x.price <= 450;
          } else if (priceFilter.p3) {
            return x.price > 450;
          } else {
            return true;
          }
        });
      if (temp.length > 0) {
        setProductsData(temp);
      } else {
        setProductsData(null);
      }
    }
    // eslint-disable-next-line
  }, [filters, priceFilter]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setProductsData(productsData);
    }
    setFilters({
      Color: [],
      Gender: [],
      Type: [],
    });
    setPriceFilter({
      p1: false,
      p2: false,
      p3: false,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fuse = new Fuse(products, {
      useExtendedSearch: true,
      keys: ["name", "color", "type"],
    });
    if (fuse.search(`'${search}`).length > 0) {
      setProductsData(fuse.search(`'${search}`).map((result) => result.item));
    } else {
      setProductsData(null);
    }
  };
  const handleFilterChange = (e, filter) => {
    setSearch("");
    if (e.target.checked) {
      setFilters({
        ...filters,
        [filter]: [...filters[filter], e.target.name],
      });
    } else {
      setFilters({
        ...filters,
        [filter]: filters[filter].filter((x) => x !== e.target.name),
      });
    }
  };
  const handlePriceFilter = (e) => {
    setSearch("");
    setPriceFilter({
      ...priceFilter,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <Box
          my="2rem"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ background: "none" }}
        >
          <Box width="100%" maxWidth={500}>
            <TextField
              id="filled-basic"
              fullWidth
              value={search}
              label="Search"
              onChange={handleChange}
              placeholder="Looking for something..."
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={search === "" ? true : false}
            disableElevation
            color="primary"
            style={{ margin: "auto 1rem" }}
          >
            <SearchIcon />
          </Button>
        </Box>
      </form>
      {loading ? (
        <Loading />
      ) : (
        <Grid container spacing={3}>
          <Grid item md={3} xs={12}>
            <Paper elevation={0}>
              <Box px="1rem" py="1rem" display={"flex"} flexDirection="column">
                {filtersList.map((filter, i) => (
                  <FormControl
                    component="fieldset"
                    style={{ margin: "1rem 0rem" }}
                  >
                    <Typography variant="h6" style={{ fontWeight: 600 }}>
                      {filter.filter_name}
                    </Typography>
                    <FormGroup>
                      {filter.options.map((item, j) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={filters[filter.filter_name].includes(
                                item
                              )}
                              color="primary"
                              onChange={(e) =>
                                handleFilterChange(e, filter.filter_name)
                              }
                              name={item}
                            />
                          }
                          label={item}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                ))}
                <FormControl
                  component="fieldset"
                  style={{ margin: "1rem 0rem" }}
                >
                  <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Price
                  </Typography>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={priceFilter.p1}
                          color="primary"
                          onChange={(e) => handlePriceFilter(e)}
                          name={"p1"}
                        />
                      }
                      label={"INR 0 - 250"}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={priceFilter.p2}
                          color="primary"
                          onChange={(e) => handlePriceFilter(e)}
                          name={"p2"}
                        />
                      }
                      label={"INR 251 - 450"}
                    />
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={priceFilter.p3}
                          color="primary"
                          onChange={(e) => handlePriceFilter(e)}
                          name={"p3"}
                        />
                      }
                      label={" > INR 450"}
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </Paper>
          </Grid>
          <Grid
            item
            md={9}
            xs={12}
            style={{ maxHeight: "80vh", overflowY: "scroll" }}
          >
            <Grid container spacing={3}>
              {products === null ? (
                <Box
                  my="3rem"
                  width="100%"
                  display="flex"
                  justifyContent={"center"}
                  alignItems="center"
                >
                  <Typography variant="h4" align="center">
                    No results found
                  </Typography>
                </Box>
              ) : (
                <>
                  {products.map((product, i) => (
                    <Grid item lg={3} md={4} xs={12}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
};

export default ProductsPage;
