import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  link: {
    //textDecoration: "underline",
    cursor: "pointer",
    display: "flex",
    justifyContent: "flex-end",
    margin: "30px",
    [theme.breakpoints.down("sm")]: {
      margin: "20px",
      fontSize: "0.8rem",
    },
  },

  title: {
    [theme.breakpoints.up("sm")]: {
      padding: "50px",
      paddingBottom: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
      paddingBottom: "7px",
    },
  },
  formControl: {
    padding: ".75rem 0",
  },
}));
