import {
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  Button,
  IconButton,
  InputBase,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import useStyles from "../VendorRegistrationStyles";
import SearchIcon from "@material-ui/icons/Search";
import ModalPop from "../../Modal/ModalPop";
import ProductsServices from "../../../Constants/ProductsServices";
import DoneIcon from "@material-ui/icons/Done";
import Close from "@material-ui/icons/Close";
import WarningIcon from "@material-ui/icons/Warning";
import { useHandleChange } from "../../../Context/TabsContext";
import { useDispatch } from "react-redux";
import { initialSave } from "../../../Actions/vendorRegActions";
import { UserContext } from "../../../Context/UserContext";
import _ from "lodash";

const Products = () => {
  const classes = useStyles();
  const { user, activeCompany, token, vendor } = useContext(UserContext);
  const [searchResult, setSearchResult] = useState(false);
  const [value, setValue] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [filteredResult, setFilteredResult] = useState([]);
  // const [addedProduct, setAddedProduct] = useState([]);
  const product = _.get(vendor[0], "productInfo.product", []);
  const [addedProduct, setAddedProduct] = useState(product);
  useEffect(() => {
    setAddedProduct(product);
  }, [vendor]);
  const [productExists, setProductExists] = useState(false);
  const dispatch = useDispatch();
  const HandleChange = useHandleChange();

  const handleSearchChange = (e) => {
    let keyWrd = e.target.value;
    setValue(keyWrd);
  };

  const handleSearch = (e, value) => {
    setProductExists(false);
    e.preventDefault();
    if (value === "" || value.length < 3) {
      setIsEmpty(true);
      setSearchResult(false);
      setFilteredResult([]);
    } else {
      const kw = value.toLowerCase();
      const filtered = ProductsServices.filter((element) =>
        element.toLowerCase().includes(kw)
      );
      setFilteredResult(filtered);
      setIsEmpty(false);
      setSearchResult(true);
    }
  };

  const handleSubmit = (e) => {
    if (!addedProduct.length) {
      alert("Please add atleast one product or service");
    }
    const reqData = {
      productInfo: { product: addedProduct },
      initRegId: user._id,
      vendorId: vendor.length > 0 ? vendor[0]._id : "",
      companyId: activeCompany.activeCompany._id,
    };

    dispatch(initialSave(reqData, token, HandleChange, "6"));
  };

  const handleAddProduct = (e, index, products) => {
    let flag = false;
    addedProduct.map((item) => {
      if (item === products) {
        flag = true;
        setProductExists(true);
      }
    });
    if (!flag) {
      setAddedProduct((currentProducts) => [...currentProducts, products]);
      setProductExists(false);
    }

    if (filteredResult.length === 1) {
      setSearchResult(false);
    }
  };

  const handleRemoveProduct = (e, index, products) => {
    const values = [...addedProduct];
    values.splice(index, 1);
    setAddedProduct(values);
    // setFilteredResult(products);
  };

  return (
    <Container className={classes.mainContainer}>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Paper className={classes.searchBar}>
            <InputBase
              className={classes.input}
              placeholder="Search products / services"
              inputProps={{ "aria-label": "Search products / services" }}
              onChange={(e) => handleSearchChange(e, value)}
              value={value}
            />
            <IconButton
              className={classes.iconButton}
              aria-label="search"
              onClick={(e) => handleSearch(e, value)}
              type="submit"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          {isEmpty && (
            <div className={classes.resultError}>
              <WarningIcon />
              <Typography>
                Please type minimum three letters to search
              </Typography>
            </div>
          )}
          {searchResult && filteredResult.length === 0 && (
            <div className={classes.resultError}>
              <WarningIcon />
              <Typography>
                Uh Oh!! Your search returned no results. Try rephrasing your
                search.
              </Typography>
            </div>
          )}
          {productExists && (
            <div className={classes.resultError}>
              <WarningIcon />
              <Typography>Product / service already exists</Typography>
            </div>
          )}
        </Grid>

        {filteredResult.map((products, index) => {
          return (
            <Grid item lg={12} xs={12} key={products}>
              <Card className={classes.searchResult}>
                <CardContent
                  className={classes.searchResultContent}
                  index={index}
                >
                  <Typography>{products}</Typography>
                  <IconButton
                    size="small"
                    className={classes.addBtn}
                    onClick={(e) => handleAddProduct(e, index, products)}
                  >
                    <DoneIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Grid item lg={12} xs={12} style={{ padding: "1rem 0" }}>
        <hr />
      </Grid>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Typography className={classes.vrTitle} variant="h5">
            Products / Services Information
          </Typography>
        </Grid>

        <Grid item lg={12} xs={12}>
          <Paper
            elevation={2}
            square={true}
            className={`${classes.customPaper} ${classes.padAdded}`}
          >
            {!addedProduct.length && (
              <div className={classes.resultError}>
                <WarningIcon />
                <Typography>
                  Currently there are no products / services added. Please
                  search to find a product / service to add
                </Typography>
              </div>
            )}
            {addedProduct &&
              addedProduct.map((products, index) => {
                return (
                  <Grid
                    item
                    lg={12}
                    xs={12}
                    key={products}
                    className={classes.addedProducts}
                  >
                    <Card className={classes.searchResult}>
                      <CardContent className={classes.searchResultContent}>
                        <Typography>{products}</Typography>
                        <IconButton
                          size="small"
                          className={classes.removeBtn}
                          onClick={(e) =>
                            handleRemoveProduct(e, index, products)
                          }
                        >
                          <Close />
                        </IconButton>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            <Grid item lg={12} xs={12}>
              <Grid item lg={12} xs={12} className={classes.saveBtn}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  Save and Continue
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Products;
