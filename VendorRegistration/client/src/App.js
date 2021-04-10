import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import _ from "lodash";
import { useSelector } from "react-redux";
import { UserContext } from "./Context/UserContext";
import Main from "./components/MainDashboard/Main";

function App() {
  const state = useSelector((state) => state);
  const loggedInStatus = _.get(state, "user.loggedInStatus", "");
  const user = _.get(state, "user.userInfo", "");
  const application = _.get(state, "user.applications", []);
  const activeCompany = _.get(state, "activeCompany", "");
  const token = _.get(state, "user.token", "");
  const vendor = _.get(state, "vendor", "");

  return (
    <Router>
      <Route exact path='/'>
        <Login />
      </Route>
      <Switch>
        <UserContext.Provider value={{ user, activeCompany, token, vendor,application }}>
          <PrivateRoute exact path='/home' loggedInStatus={loggedInStatus}>
            <Home />
          </PrivateRoute>
          <PrivateRoute exact path='/main' loggedInStatus={loggedInStatus}>
            <Main />
          </PrivateRoute>
        </UserContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
