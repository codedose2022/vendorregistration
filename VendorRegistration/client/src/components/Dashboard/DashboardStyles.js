import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
    mainContainer: {
        [theme.breakpoints.up('xs')]: {
            marginLeft: "240px", 
            marginTop: "64px"
          },
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0, 
            marginTop: "64px"
          },
  },
}));
