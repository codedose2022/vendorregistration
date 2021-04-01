import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  profileContainer: {
    padding: theme.spacing(3),
  },
  profileIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#d4d4d4",
    padding: "1rem",
    position: "relative",
    "& .MuiSvgIcon-root": {
      fontSize: "10rem",
    },
    [theme.breakpoints.up("md")]: {
      "&:after": {
        content: '""',
        width: "1px",
        height: "80%",
        position: "absolute",
        right: 0,
        top: "25px",
        background: "#d4d4d4",
      },
    },
    
  },
  profileContent: {
    padding: "2rem",
    "& h6": {
      marginBottom: ".5rem",
    },
  },
  upperCase: {
    textTransform: "uppercase",
  },
  profileLicenseInfo: {
    display: "flex",
    justifyContent: "space-between",
  },
  gridMargin: {
    margin: "0 .5rem",
  },
  personalName: {
    padding: "1rem 1rem 0 1rem",
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  personalInfo:{
    padding: '0 1rem 1rem 1rem',
    '& p':{
        lineHeight: '2rem',
    }
  },
  mobMargin:{
    margin: '1rem 0'
  }
}));
