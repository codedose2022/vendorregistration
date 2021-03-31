import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  tabPanel: {
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(5),
    },
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(1),
    },
  },
}));
