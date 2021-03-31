import React, {useState} from 'react';
import {AppBar, Tabs, Tab} from '@material-ui/core/';
import useStyles from './TabStyles'
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
const HorizontalTabs = () => {
    
  const classes = useStyles();  
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [value, setValue] = useState(_.get(state, 'ChangeTabs.currentTab',0))
  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch ({type: 'DASHBOARD_TABS', payload: newValue});
  };

  return (
    <div className={classes.horizontalTabs}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Profile" {...a11yProps(0)} />
          <Tab label="Applications" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    </div>
  );
}
export default HorizontalTabs;