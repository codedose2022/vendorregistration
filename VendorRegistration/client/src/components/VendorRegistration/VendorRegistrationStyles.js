import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    [theme.breakpoints.up("sm")]: {
      marginBottom: "2.5rem",
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiInputLabel-root": {
        fontSize: ".75rem",
      },
      "& .MuiFormLabel-root": {
        fontSize: ".75rem",
      },
      marginBottom: "5rem",
    },
  },
  halfWidth: {
    width: "50%",
  },
  profileContainer: {
    padding: theme.spacing(5),
  },
  vrTitle: {
    marginBottom: "1rem",
  },
  customCheck: {
    padding: ".25rem",
  },
  formControl: {
    [theme.breakpoints.up("md")]: {
      padding: ".25rem 1rem",
    },
    [theme.breakpoints.down("md")]: {
      padding: ".25rem",
    },
    "& .MuiTypography-body1": {
      fontSize: ".875rem",
    },
  },
  fileUploadBtn: {
    minWidth: "2rem",
    width: "2rem",
    borderRadius: "100%",
  },
  btnOnInput: {
    minWidth: "1rem",
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "100%",
    color: theme.palette.secondary.main,
    "& svg": {
      width: "1rem",
      height: "1rem",
    },
  },
  companyForm: {
    margin: theme.spacing(1),
  },
  error: {
    fontSize: "10px",
    color: "#ea1000",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  saveBtn: {
    display: "flex",
    marginTop: "2rem",
    justifyContent: "flex-end",
    zIndex: 9,
    padding: "1rem 1rem 0rem 1rem",
    borderTop: "1px solid #ddd",
    width: "100%",
  },
  addMoreBtn: {
    marginTop: "-1rem",
    top: "-1rem",
    right: "0.5rem",
    position: "absolute",
    "& label": {
      minHeight: "20px",
      height: "30px",
      width: "30px",
    },
  },
  relative: {
    position: "relative",
  },
  comments: {
    "& p": {
      fontSize: "12px !important",
      color: "#c50000",
    },
  },
  flexRadio: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  fixedWidth200: {
    width: "200px",
  },
  searchBar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: "1rem",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },

  searchResult: {
    margin: ".5rem 0",
    width: '100%',
    "& .MuiCardContent-root:last-child": {
      paddingBottom: "8px",
    },
  },
  searchResultContent: {
    padding: "8px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultError: {
    padding: "1rem",
    color: "#c50000",
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      width: "2em",
    },
    "& p": {
      fontSize: "12px",
    },
  },
  customPaper: {
    padding: "1rem 0",
    margin: "2rem 0",
    "&:first-child": {
      margin: "1rem 0",
    },
  },
  borderedPaper: {
    border: "1px solid #ddd",
  },
  addBtn: {
    "& :hover": {
      color: theme.palette.primary.main,
    },
  },
  removeBtn: {
    "& :hover": {
      color: "#c50000",
    },
  },
  certificateGrid: {
    padding: ".5rem",
    margin: ".25rem 0",
  },
  table: {
    "& td:first-child": {
      width: "600px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },

    "& td:nth-child(2)": {
      width: "300px",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    "& td:last-child": {
      width: "300px",

      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
  },
  certSelect: {
    [theme.breakpoints.up("md")]: {
      margin: '4px',
    },
    minWidth: 120,
  },
  certQuestions: {
    padding: ".5rem 0",
  },
  qustionsContainer:{
    borderBottom: '1px solid rgb(221, 221, 221)',
    paddingBottom: '1rem',
    padding: '1rem',
    alignItems: 'flex-end',
  },
  mobPadding:{
    [theme.breakpoints.down("md")]: {
      padding: '1rem 0',
    },
  },
  padAdded:{
    padding: '1rem',
  }
}));
