import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../images/logo.png";
import useStyles from "../MainNav/MainNavStyles";
import MainVendorProfile from "./MainVendorProfile";

export default function Main() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#00695c",
        light: "#439889",
        dark: "#003d33",
      },
      secondary: {
        main: "#9e9e9e",
        light: "#cfcfcf",
        dark: "#707070",
      },
      error: {
        main: "#e57373",
      },
      warning: {
        main: "#f57c00",
      },
      info: {
        main: "#64b5f6",
      },
    },
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });
  const StyledMenu = withStyles({
    paper: {
      width: "250px",
      top: "56px !important",
    },
  })((props) => (
    <Menu
      elevation={5}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.setItem("auth-token", "");
    dispatch({ type: "RESET_STORE" });
    localStorage.setItem("master_class", "");
    history.push("/");
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar
          position="relative"
          elevation={0}
          className={classes.customAppBar}
        >
          <Toolbar className={classes.flexBar}>
            <div className={classes.branding} style={{ display: "block" }}>
              <img src={logo} alt="company logo" />
            </div>
            <div className={classes.mainNavIcon}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="secondary"
                edge="end"
              >
                <Avatar color="primary">
                  <Typography>MC</Typography>
                </Avatar>
              </IconButton>
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <div className={classes.popoverBtnPanel}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={`${classes.capsuleBtn} ${classes.tiny}`}
                  >
                    Change password
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className={`${classes.capsuleBtn} ${classes.tiny}`}
                    onClick={handleLogOut}
                  >
                    Logout
                  </Button>
                </div>
              </StyledMenu>
            </div>
          </Toolbar>
        </AppBar>

        <MainVendorProfile />
      </ThemeProvider>
    </>
  );
}
