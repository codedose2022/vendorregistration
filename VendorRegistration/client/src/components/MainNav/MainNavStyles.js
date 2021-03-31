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
    padding: "1rem 1rem",
    display: "flex",
    alignItems: "center",
    color: theme.palette.secondary.dark,
    fontSize: "12px",
    "& span": {
      marginRight: ".25rem",
      color: theme.palette.secondary,
    },
  },
  popoverBtnPanel: {
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
  },
  tiny: {
    padding: "2px 6px !important",
    fontSize: "12px !important",
  },
  capsuleBtn: {
    borderRadius: "25px !important",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    zIndex: theme.zIndex.drawer + 2,
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
    },
  },
}));
