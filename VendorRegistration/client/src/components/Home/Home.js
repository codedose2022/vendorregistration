import React, { useState, useEffect, useContext } from "react";
import SideBarDashboard from "../Sidebar/SideBar";
import MainNavBar from "../MainNav/MainNav";
import Dashboard from "../Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  getAllRegistrations,
  getUserInfo,
  getUserApplications
} from "../../Actions/vendorRegActions";
import { isTokenValid } from "../../Api/index";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import { TabsContext } from "../../Context/TabsContext";
import { UserContext } from "../../Context/UserContext";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00695c",
      light: "#439889",
      dark: "#003d33",
    },
    secondary: {
      main: "#9e9e9e",
      light: "#cfcfcf",
      dark: "#707070",
    },
    error: {
      main: "#e57373",
    },
    warning: {
      main: "#f57c00",
    },
    info: {
      main: "#64b5f6",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default function Home(props) {
  const dispatch = useDispatch();
  const { user, token } = useContext(UserContext);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [serviceErrors, setServiceErrors] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const tokenRes = await isTokenValid(token);
        if (!tokenRes.data) {
          localStorage.setItem("auth-token", "");
          localStorage.setItem("master_class", "");
          history.push("/");
        } else {
          dispatch(getAllRegistrations(user._id, token, setServiceErrors));
          dispatch(getUserInfo(user._id, token, setServiceErrors));
          dispatch(getUserApplications(user._id, token));
          
          setIsLoading(false);
        }
      } catch (error) {
        localStorage.setItem("auth-token", "");
        localStorage.setItem("master_class", "");
      }
    };
    loadDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      {serviceErrors && <Alert severity="error"> {serviceErrors} </Alert>}
      {!serviceErrors && isLoading ? (
        <CircularProgress
          style={{ position: "absolute", left: "50%", top: "50%" }}
        />
      ) : (
        <>
          <TabsContext>
            <MainNavBar />
            <SideBarDashboard />
            <Dashboard />
          </TabsContext>
        </>
      )}
    </ThemeProvider>
  );
}
