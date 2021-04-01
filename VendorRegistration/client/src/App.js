import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function App() {
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
  });

  return (
    <>
      <Router>
        <Route exact path="/">
        <ThemeProvider theme={theme}>
          <Home />
          </ThemeProvider>
        </Route>
      </Router>
    </>
  );
}

export default App;
