import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Menu,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import logo from "../../images/logo.png";
import { withStyles } from "@material-ui/core/styles";
import useStyles from "./MainNavStyles";
import MenuIcon from "@material-ui/icons/Menu";
import SideBarDashboard from "../Sidebar/SideBar";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";



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

const MainNavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const dispatch = useDispatch();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogOut = () => {
    localStorage.setItem("auth-token", "");
    dispatch({ type: "RESET_STORE" });
    localStorage.setItem("master_class", "");
    history.push("/");
  };

  return (
    <>
      <AppBar position='fixed' elevation={2} className={classes.customAppBar}>
        <Toolbar className={classes.flexBar}>
          <IconButton
            color='primary'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.branding}>
            <img src={logo} alt='company logo' />
          </div>
          <div className={classes.mainNavIcon}>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='secondary'
              edge='end'
            >
              <Avatar color='primary'>
                <Typography>MC</Typography>
              </Avatar>
            </IconButton>
            <StyledMenu
              id='menu-appbar'
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
                  color='primary'
                  variant='contained'
                  className={`${classes.capsuleBtn} ${classes.tiny}`}
                >
                  Change password
                </Button>
                <Button
                  color='primary'
                  variant='contained'
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

      <SideBarDashboard mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
    </>
  );
};
export default MainNavBar;
