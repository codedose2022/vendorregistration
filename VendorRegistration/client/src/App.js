import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import _ from "lodash";
import { useSelector } from "react-redux";

function App() {
  const state = useSelector((state) => state);
  const loggedInStatus = _.get(state, "user.loggedInStatus", "");
  const user = _.get(state, "user.user", "");

  return (
    <Router>
      <Route exact path='/'>
        <Login />
      </Route>
      <Switch>
        <PrivateRoute exact path='/home' loggedInStatus={loggedInStatus}>
          <Home user={user} />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
