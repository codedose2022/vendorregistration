import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  applicationContainer: {
    padding: theme.spacing(3),
  },
  applicationTable: {
    // "& th:first-child": {
    //   width: "30px",
    // },
    // "& th:nth-child(2)": {
    //   width: "500px",
    // },
    // "& th:nth-child(3)": {
    //   width: "200px",
    // },
    // "& th:last-child": {
    //   width: "200px",
    // },
    minWidth: 650,
  },
  approvedChip: {
      backgroundColor: theme.palette.primary.main,
  },
  rejectedChip: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
  },
  incompleteChip: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
}));
