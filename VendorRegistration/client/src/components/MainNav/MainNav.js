import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  Icon,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import logo from "../../images/logo.png";
import { withStyles } from "@material-ui/core/styles";
import useStyles from "./MainNavStyles";
import MenuIcon from "@material-ui/icons/Menu";
import SideBarDashboard from "../Sidebar/SideBar";


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

const MainNavBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const company = ["Mersat Consultants", "Mersat Tansports"];
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

  return (
    <>
      <AppBar position="fixed" elevation={2} className={classes.customAppBar}>
        <Toolbar className={classes.flexBar}>
          <IconButton
            color="primary"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.branding}>
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
              <div className={classes.popverAvatar}>
                <Avatar>
                  <Typography>MC</Typography>
                </Avatar>
              </div>
              <div className={classes.popoverTitle}>
                <Icon>
                  <HomeIcon />
                </Icon>
                <Typography>Companies</Typography>
              </div>
              <Divider />
              {company.map((cmpny, index) => {
                return <MenuItem key={index}>{cmpny}</MenuItem>;
              })}

              <Divider />

              <div className={classes.popoverTitle}>
                <Icon>
                  <SettingsIcon />
                </Icon>
                <Typography>Settings</Typography>
              </div>
              <Divider />
              <MenuItem>Change password</MenuItem>
              <Divider />
              <div className={classes.popoverBtnPanel}>
                <Button
                  color="primary"
                  variant="contained"
                  className={`${classes.capsuleBtn} ${classes.tiny}`}
                >
                  Add new Company
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={`${classes.capsuleBtn} ${classes.tiny}`}
                >
                  Logout
                </Button>
              </div>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
      
      <SideBarDashboard mobileOpen={mobileOpen} setMobileOpen = {setMobileOpen} />
    </>
  );
};
export default MainNavBar;
