import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  customAppBar: {
    backgroundColor: "#fff !important",
    zIndex: `${theme.zIndex.drawer + 1} !important`,
  },
  branding: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    "& img": {
      width: "25%",
    },
  },
  popoverAvatar: {
    display: "flex",
    padding: "1rem",
    "& div": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  flexBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  popverAvatar: {
    display: "flex",
    justifyContent: "center",
    padding: "1rem",
  },
  popoverTitle: {
    padding: ".5rem 1rem",
    display: "flex",
    alignItems: "center",
    color: theme.palette.secondary.dark,
    fontSize: "12px",
    "& span": {
      marginRight: ".25rem",
      color: theme.palette.secondary,
    },
    "& p": {
      textTransform: 'uppercase', fontSize: '.875rem'
    },
  },
  popoverBtnPanel: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
  tiny: {
    padding: "4px 8px !important",
    fontSize: "12px !important",
  },
  capsuleBtn: {
    borderRadius: "5px !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 2,
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
    },
  },
  menuItem:{
    fontSize: '.875rem',
    padding: '.5rem 1.5rem',
  },
  fileUploadBtn: {
    minWidth: "2rem",
    width: "2rem",
    borderRadius: "100%",
  },
  btnOnInput: {
    minWidth: "1rem",
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "100%",
    color: theme.palette.secondary.main,
    "& svg": {
      width: "1.5rem",
      height: "1.5rem",
    },
  },
  formControl: {
    [theme.breakpoints.up("md")]: {
      padding: ".75rem 1rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: ".25rem",
    },
    "& .MuiTypography-body1": {
      fontSize: ".875rem",
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  helperTextError: {
    color: "#d50000",
  },
}));
