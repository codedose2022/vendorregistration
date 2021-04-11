import React from "react";
import TabPanel from "../TabPanel/TabPanel";
import { useSelector } from "react-redux";
import _ from "lodash";
import HorizontalTabs from "../Tabs/HorizontalTabs";
import Profile from "./Profile/Profile";
import Company from "../VendorRegistration/Company/Company";
import Owners from "../VendorRegistration/Owner/Owners";
import Tax from "../VendorRegistration/Tax/Tax";
import Contact from "../VendorRegistration/Contact/Contact";
import Other from "../VendorRegistration/Other/Others";
import useStyles from "./DashboardStyles";
import BankAccount from "../VendorRegistration/BankAccount/BankAccount";
import Products from "../VendorRegistration/Products/Products";
import Certification from "../VendorRegistration/Certification/Certification";
import Applications from "./Applications/Applications";

const Dashboard = (props) => {
  const state = useSelector((state) => state);
  const classes = useStyles();
  const activeMainTabs = _.get(state, "ChangeTabs.activeTab", "Dashboard");
  const activeTabs = _.get(state, "ChangeTabs.selectedTab", 0);
  const dashboardTabs = _.get(state, "ChangeTabs.currentTab", 0);
  return (
    <>
      {activeMainTabs === "Dashboard" && (
        <div className={classes.mainContainer}>
          <HorizontalTabs />
          {dashboardTabs === 0 && (
            <>
              <TabPanel value={0} index={0} content={<Profile />} />
            </>
          )}
          {dashboardTabs === 1 && (
            <>
              <TabPanel value={0} index={1} content={<Applications />} />
            </>
          )}
        </div>
      )}

      {activeMainTabs === "Vendor Registration" && (
        <div className={classes.mainContainer}>
          {activeTabs === 0 && (
            <TabPanel value={0} index={0} content={<Company />} />
          )}
          {activeTabs === 1 && (
            <TabPanel value={1} index={1} content={<Owners />} />
          )}
          {activeTabs === 2 && (
            <TabPanel value={2} index={2} content={<Tax />} />
          )}
          {activeTabs === 3 && (
            <TabPanel value={3} index={3} content={<BankAccount />} />
          )}
          {activeTabs === 4 && (
            <TabPanel value={4} index={4} content={<Certification />} />
          )}
          {activeTabs === 5 && (
            <TabPanel value={5} index={5} content={<Products />} />
          )}
          {activeTabs === 6 && (
            <TabPanel value={6} index={6} content={<Contact />} />
          )}
          {activeTabs === 7 && (
            <TabPanel value={7} index={7} content={<Other />} />
          )}
        </div>
      )}
    </>
  );
};
export default Dashboard;
