import React, { useState } from "react";
import { Button, createMuiTheme, ThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, IconButton, InputAdornment } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import head from "../../images/logo.png";
import { useDispatch } from "react-redux";
import { login } from "../../Actions/AuthenticationActions";
import { validateField } from "../../Helpers/validationHelper";
import Alert from "@material-ui/lab/Alert";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& img": {
      width: "20%",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  helperTextError: {
    color: "#d50000",
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#169B71",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [serviceErrors, setServiceErrors] = useState("");
  const [touched, setTouched] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setServiceErrors("");
    if (
      validateField("password", loginData.password) === "" &&
      validateField("username", loginData.username) === ""
    ) {
      dispatch(login(loginData, setServiceErrors, history));
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Container component='main' maxWidth='xs'>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.paper}>
            <img src={head} />
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>

            <form className={classes.form} noValidate onSubmit={handleSubmit}>
              {serviceErrors && (
                <Alert severity='error'> {serviceErrors} </Alert>
              )}
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='username'
                label='Email Address'
                name='username'
                autoComplete='email'
                value={loginData.username}
                FormHelperTextProps={{
                  className: classes.helperTextError,
                }}
                helperText={
                  touched && validateField("username", loginData.username)
                }
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    [e.target.name]: e.target.value,
                  })
                }
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={showPassword ? "text" : "password"}
                id='password'
                FormHelperTextProps={{
                  className: classes.helperTextError,
                }}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    [e.target.name]: e.target.value,
                  })
                }
                autoComplete='current-password'
                helperText={
                  touched && validateField("password", loginData.password)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleShowPassword}
                        size='small'
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              /> */}
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                type='submit'
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2' style={{ color: "black" }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href=''
                    variant='body2'
                    //  onClick={showSignUp}
                    style={{ color: "black" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}></Box>
        </ThemeProvider>
      </Container>
    </>
  );
}
