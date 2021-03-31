import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  horizontalTabs: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  verticalTabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    width: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: "100%",
    "& .MuiTab-wrapper": {
      alignItems: "flex-start",
      marginLeft: "2rem",
      fontSize: "12px",
    },
  },
}));
