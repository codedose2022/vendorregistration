import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import _ from "lodash";
import { useSelector } from "react-redux";
import {UserContext} from './Context/UserContext';

function App() {
  const state = useSelector((state) => state);
  const loggedInStatus = _.get(state, "user.loggedInStatus", "");
  const user = _.get(state, "user.userInfo", "");
  const activeCompany = _.get(state, "activeCompany", "");
  const token = _.get(state, "user.token", "");
  const vendor = _.get(state, "vendor", "");

  return (
    <Router>
      <Route exact path="/">
        <Login />
      </Route>
      <Switch>
        <PrivateRoute exact path="/home" loggedInStatus={loggedInStatus}>
          <UserContext.Provider
            value={{user, activeCompany, token, vendor }}>
            <Home/>
          </UserContext.Provider>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
