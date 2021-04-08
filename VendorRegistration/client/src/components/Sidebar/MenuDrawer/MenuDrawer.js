import React, { useState } from "react";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import useStyles from "./MenuDrawerStyles";
import VerticalTabs from "../../Tabs/VerticalTabs";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { useHandleChange, useValue } from "../../../Context/TabsContext";

const MenuDrawer = (props) => {
  const classes = useStyles();
  const menuItems = ["Home", "Dashboard", "Vendor Registration"];
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  const [value, setValue] = useState(_.get(state, "ChangeTabs.selectedTab", 0));
  const [isVendorReg, setIsVendorReg] = useState(false);
  const handleChange = useHandleChange();
  const handleClick = (e, text) => {
    setValue(text);

    if (text === "Dashboard") {
      dispatch({ type: "SIDEBAR_MAINTABS_CHANGE", payload: text });

      handleChange(null, 0);
      setIsVendorReg(false);
      props.mobileOpen && props.setMobileOpen(false);
    }
    if (text === "Vendor Registration") {
      dispatch({ type: "SIDEBAR_MAINTABS_CHANGE", payload: text });
      setIsVendorReg(true);
    }
    if (text === "Home") {
      setIsVendorReg(false);
      dispatch({ type: "SIDEBAR_MAINTABS_CHANGE", payload: "Dashboard" });

      handleChange(null, 0);
      history.push("/main");
    }
  };
  return (
    <>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {menuItems.map((text, index) => (
          <div key={index}>
            <ListItem
              button
              value={value}
              index={index}
              onClick={(e) => handleClick(e, text)}
            >
              <ListItemText primary={text} />
            </ListItem>
            <Divider />
          </div>
        ))}
        {isVendorReg && (
          <>
            <VerticalTabs
              mobileOpen={props.mobileOpen}
              setMobileOpen={props.setMobileOpen}
            />
          </>
        )}
      </List>
    </>
  );
};

export default MenuDrawer;
