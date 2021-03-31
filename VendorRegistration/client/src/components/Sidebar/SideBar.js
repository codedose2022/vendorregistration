import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import useStyles from "../Sidebar/sideBarStyles";
import MenuDrawer from "../Sidebar/MenuDrawer/MenuDrawer";

const SideBarDashboard = (props) => {
  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {props.mobileOpen && (
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <MenuDrawer  mobileOpen={props.mobileOpen} setMobileOpen = {props.setMobileOpen}/>
          </Drawer>
        )}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <MenuDrawer/>
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default SideBarDashboard;
