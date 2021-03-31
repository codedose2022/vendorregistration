import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  menuButton: {
    marginRight: theme.spacing(1),
    color: "black !important"
  },
  title: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [theme.breakpoints.up('md')]: {      
    width: "48%",
    height: "81%",
    boxShadow:"1px 1px 8px .9px #75757563",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#eeeeee8c",
    },
  },
  reg: {
    fontVariant: "h5",
  },
  footer:{
paddingTop:"820px"
  },
  submit:{
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent:"left"
  },
  inputT: {
    
   
  },
  grides:{
    display: "flex",
    justifyContent: "flex-end",
  },
  input: {
    display: "none",
  },
  pcenter:{
    paddingTop: "0px",
    justifySelf: "flex-start",
    fontSize: "1.9rem",
    left: "35%",
    width: "48%",
    height: "81%",
    position: "absolute",
  }
}));
