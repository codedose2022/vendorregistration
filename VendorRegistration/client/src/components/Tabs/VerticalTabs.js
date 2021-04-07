import { Tab, Tabs } from "@material-ui/core/";
import React from "react";
import VendorRegisterTabs from "../../Constants/VendorRegisterTabs";
import { useHandleChange, useValue } from "../../Context/TabsContext";
import useStyles from "./TabStyles";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const classes = useStyles();
  const value = useValue();
  const handleChange = useHandleChange();

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
