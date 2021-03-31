import React, {useState} from "react";
import {Tabs, Tab} from "@material-ui/core/";
import useStyles from './TabStyles'
import VendorRegisterTabs from "../../Constants/VendorRegisterTabs";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [value, setValue] = useState(_.get(state, 'ChangeTabs.selectedTab',0))
  const handleChange = (event, newValue) => {
    props.mobileOpen && props.setMobileOpen(false);
    setValue(newValue);
    dispatch ({type: 'SIDEBAR_VENDOR_TABS_CHANGE', payload: newValue});
  };

  return (
    <div className={classes.verticalTabs}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {VendorRegisterTabs.map((tab, index) => {
          return <Tab key={tab} label={tab} {...a11yProps(index)} />;
        })}
      </Tabs>
    </div>
  );
}
