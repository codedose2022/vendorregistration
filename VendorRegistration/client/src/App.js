import _ from "lodash";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Main from "./components/MainDashboard/Main";
import { UserContext } from "./Context/UserContext";
import PrivateRoute from "./PrivateRoute";

function App() {
  const state = useSelector((state) => state);
  const loggedInStatus = _.get(state, "user.loggedInStatus", "");
  const user = _.get(state, "user.userInfo", "");
  const activeCompany = _.get(state, "activeCompany", "");
  const application = _.get(state, "user.applications", []);
  const token = _.get(state, "user.token", "");
  const vendorReg = _.get(state, "vendor", []);
  let vendor = "";
  if (vendorReg?.vendors) {
    vendor = vendorReg.vendors.filter(
      (res) => res.companyDetailId === activeCompany.activeCompany._id
    );
  }

  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Switch>
        <UserContext.Provider
          value={{ user, token, application, vendor, activeCompany }}
        >
          <PrivateRoute exact path="/home" loggedInStatus={loggedInStatus}>
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path="/main" loggedInStatus={loggedInStatus}>
            <Main />
          </PrivateRoute>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
