import React, { useState,useEffect } from "react";
import SideBarDashboard from "../Sidebar/SideBar";
import MainNavBar from "../MainNav/MainNav";
import Dashboard from "../Dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {getAllRegistrations} from '../../Actions/vendorRegActions';
import { isTokenValid } from "../../Api/index";

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
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export default function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [serviceErrors, setServiceErrors] = useState("");
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const tokenRes = await isTokenValid(props.user.token);
        if (!tokenRes.data) {
          localStorage.setItem("auth-token", "");
          localStorage.setItem("master_class", "");
          history.push("/home");
        } else {
          dispatch(
            getAllRegistrations(
              props.user.userInfo._id,
              props.user.token,
              setServiceErrors
            )
          );
         
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
      <MainNavBar />
      <SideBarDashboard />
      <Dashboard />
    </ThemeProvider>
  );
}
