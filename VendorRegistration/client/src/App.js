import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import _ from "lodash";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector((state) => state);
  const loggedInStatus = _.get(state, "user.loggedInStatus", "");
  const userInfo = _.get(state, "user.userInfo", "");
  const activeCompany = _.get(state, "activeCompany", "");
  const token = _.get(state, "user.token", "");

  return (
    <Router>
      <Route exact path='/'>
        <Login />
      </Route>
      <Switch>
        <PrivateRoute exact path='/home' loggedInStatus={loggedInStatus}>
          <Home user={userInfo} token ={token} activeCompany= {activeCompany} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
