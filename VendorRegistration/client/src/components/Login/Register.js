import React from "react";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useStyles from "./Formstyle";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import green from "@material-ui/core/colors/green";
import { Grid } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[700],
    },
    secondary: {
      main: green[500],
    },
  },
});
export default function Form() {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.menuButton}>
        <AppBar
          position="static"
          style={{ backgroundColor: "white", width: "100%" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              News
            </Typography>
            <Button style={{ backgroundColor: "green", color: "white" }}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <div>
        <CssBaseline />
        <Container maxWidth="100%" className={classes.container}>
          <form className={classes.root} noValidate autoComplete="off">
            <Typography
              gutterBottom
              variant="h2"
              component="h4"
              className={classes.pcenter}
            >
              Registration
            </Typography>
            <div className={classes.subtext}>
              <Typography
                gutterBottom
                variant="h6"
                style={{ paddingTop: "40px", justifySelf: "left" }}
              >
                Personal Info
              </Typography>
            </div>

            <Grid container spacing="3">
              <Grid item lg={6} xs={5}>
                <TextField
                  id="firstname"
                  label="First Name"
                  className={classes.inputT}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="lastname"
                  label="Last Name"
                  className={classes.inputT}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="designation"
                  label="Designation"
                  className={classes.inputT}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="phonenumber"
                  label="Phone Number"
                  className={classes.inputT}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.inputT}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Typography
              gutterBottom
              variant="h6"
              style={{ paddingTop: "40px", justifySelf: "left" }}
            >
              Company Info
            </Typography>
            <Grid container spacing="3">
              <Grid item lg={6} xs={12}>
                <TextField
                  id="companyname"
                  label="Company Name"
                  className={classes.inputT}
                  fullWidth
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="licenseno"
                  label="License No"
                  className={classes.inputT}
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item lg={6} xs={12}>
                <TextField
                  id="expdate"
                  label="License Exp Date"
                  type="date"
                  defaultValue="Number"
                  className={classes.inputT}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>

              <Grid item lg={6} xs={12}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />

                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    style={{ marginTop: "20px" }}
                  >
                    Upload License copy
                  </Button>
                </label>
              </Grid>
              <Grid item lg={12} xs={12} className={classes.grides}>
                <div className={classes.submit}>
                  <Button variant="contained" color="primary">
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    </ThemeProvider>
  );
}
