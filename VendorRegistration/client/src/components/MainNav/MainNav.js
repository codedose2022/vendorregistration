import React, { useState,useContext } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  Button,
  TextField,
  Grid,
  FormControl,
  InputAdornment,
  Tooltip,
} from "@material-ui/core";
import logo from "../../images/logo.png";
import { withStyles } from "@material-ui/core/styles";
import useStyles from "./MainNavStyles";
import MenuIcon from "@material-ui/icons/Menu";
import SideBarDashboard from "../Sidebar/SideBar";
import ModalPop from "../Modal/ModalPop";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { getStyleForMenu } from "../../Helpers/DashboardHelper";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { validateField } from "../../Helpers/validationHelper";
import { addNewCompany } from "../../Actions/vendorRegActions";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { UserContext } from "../../Context/UserContext";

const StyledMenu = withStyles({
  paper: {
    width: "250px",
    top: "56px !important",
  },
})((props) => (
  <Menu
    elevation={5}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const MainNavBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const dispatch = useDispatch();
  const {user,activeCompany,token} = useContext(UserContext);
  const company = user.companyDetail.filter(
    (company) => company.status === "approved"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newCompanyModal, setNewCompanyModal] = useState(false);
  const [isLicense, setIsLicense] = useState(false);
  const [licenseName, setLicenseName] = useState("");
  const [touched, setTouched] = useState(false);
  const [serviceErrors, setServiceErrors] = useState("");
  const [snackbar, setSnackbar] = useState(false);

  const [newCompany, setNewCompany] = useState({
    companyName: "",
    licenseNo: "",
    licenseExpDt: "",
    file: "",
  });

  const handleLicenseName = (e) => {
    setIsLicense(true);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleAddCompanyModal = () => {
    setNewCompanyModal(true);
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setNewCompanyModal(false);
    setNewCompany({
      companyName: "",
      licenseNo: "",
      licenseExpDt: "",
      file: "",
    });
    setTouched(false);
    setLicenseName("")
  };

  const handleLicenseUpload = (e) => {
    e.preventDefault();
    let filename = e.target.files[0] ? e.target.files[0].name : "";
    setIsLicense(true);
    setLicenseName(filename);
    let file = e.target.files[0] ? e.target.files[0] : "";
    setNewCompany({
      ...newCompany,
      file: file,
    });
  };

  const successCallback = () => {
    handleModalClose();
    setSnackbar(true);
  };

  const handleCompanyChange = (e, company) => {
    dispatch({ type: "CHANGE_COMPANY", payload: company });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    setServiceErrors("");
    if (
      validateField("field", newCompany.companyName) === "" &&
      validateField("field", newCompany.licenseNo) === "" &&
      validateField("field", newCompany.licenseExpDt) === "" &&
      validateField("field", licenseName) === ""
    ) {
      let coFormData = new FormData();
      for (let key in newCompany) {
        coFormData.append(key, newCompany[key]);
      }
      coFormData.append("_id",user._id);
      dispatch(
        addNewCompany(
          coFormData,
          setServiceErrors,
          token,
          user._id,
          successCallback
        )
      );
    }
  };
  const handleLogOut = () => {
    localStorage.setItem("auth-token", "");
    dispatch({ type: "RESET_STORE" });
    localStorage.setItem("master_class", "");
    history.push("/");
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  return (
    <>
      <AppBar position='fixed' elevation={2} className={classes.customAppBar}>
        <Toolbar className={classes.flexBar}>
          <IconButton
            color='primary'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.branding}>
            <img src={logo} alt='company logo' />
          </div>
          <div className={classes.mainNavIcon}>
            <IconButton
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='secondary'
              edge='end'
            >
              <Avatar color='primary'>
                <Typography>MC</Typography>
              </Avatar>
            </IconButton>
            <StyledMenu
              id='menu-appbar'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <div className={classes.popverAvatar}>
                <Avatar className={classes.large}>
                  <Typography>MC</Typography>
                </Avatar>
              </div>

              <Divider />
              <div className={classes.popoverTitle}>
                <Typography>Companies</Typography>
              </div>
              {company.map((cmpny, index) => {
                return (
                  <MenuItem
                    key={index}
                    className={classes.menuItem}
                    onClick={(e) => handleCompanyChange(e, cmpny)}
                    color='secondary'
                    style={getStyleForMenu(
                      cmpny.companyName[0],
                      activeCompany
                    )}
                  >
                    {cmpny.companyName[0]}
                  </MenuItem>
                );
              })}

              <Divider />

              <div className={classes.popoverTitle}>
                <Typography>Settings</Typography>
              </div>
              <MenuItem className={classes.menuItem}>Change password</MenuItem>
              <Divider />
              <div className={classes.popoverBtnPanel}>
                <Button
                  color='primary'
                  variant='contained'
                  onClick={handleAddCompanyModal}
                  className={`${classes.capsuleBtn} ${classes.tiny}`}
                >
                  Add new Company
                </Button>
                <Button
                  color='primary'
                  variant='contained'
                  className={`${classes.capsuleBtn} ${classes.tiny}`}
                  onClick={handleLogOut}
                >
                  Logout
                </Button>
              </div>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>

      <SideBarDashboard mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {snackbar && (
        <Snackbar
          open={true}
          onClose={handleCloseSnackbar}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert severity='success'>
            Request has been submitted successfully for adding new company.
          </Alert>
        </Snackbar>
      )}
      <ModalPop
        title='Add New Company'
        isOpen={newCompanyModal}
        handleClose={handleModalClose}
        onSubmit={handleSubmit}
        content={
          <form>
            {serviceErrors && <Alert severity='error'> {serviceErrors} </Alert>}

            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField
                    id='companyName'
                    name='companyName'
                    label='Company name'
                    type='text'
                    value={newCompany.companyName}
                    FormHelperTextProps={{
                      className: classes.helperTextError,
                    }}
                    onChange={(e) =>
                      setNewCompany({
                        ...newCompany,
                        [e.target.name]: e.target.value,
                      })
                    }
                    helperText={
                      touched &&
                      validateField(
                        "field",
                        newCompany.companyName,
                        "Company name"
                      )
                    }
                    required
                  />
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField
                    id='licenseNo'
                    name='licenseNo'
                    label='License number'
                    type='text'
                    value={newCompany.licenseNo}
                    required
                    FormHelperTextProps={{
                      className: classes.helperTextError,
                    }}
                    onChange={(e) =>
                      setNewCompany({
                        ...newCompany,
                        [e.target.name]: e.target.value,
                      })
                    }
                    helperText={
                      touched &&
                      validateField(
                        "field",
                        newCompany.licenseNo,
                        "License number"
                      )
                    }
                  />
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id='licenseExpDt'
                    name='licenseExpDt'
                    type='date'
                    FormHelperTextProps={{
                      className: classes.helperTextError,
                    }}
                    value={newCompany.licenseExpDt}
                    label='License expiry date'
                    required
                    helperText={
                      touched &&
                      validateField(
                        "field",
                        newCompany.licenseExpDt,
                        "License expiry date"
                      )
                    }
                    onChange={(e) =>
                      setNewCompany({
                        ...newCompany,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    label={!isLicense ? "License copy" : licenseName}
                    id='licenseCopy'
                    name='file'
                    required
                    FormHelperTextProps={{
                      className: classes.helperTextError,
                    }}
                    helperText={
                      touched &&
                      validateField("attachment", licenseName, "License copy")
                    }
                    InputProps={{
                      endAdornment: (
                        <>
                          <InputAdornment position='end'>
                            <Tooltip title='Upload License'>
                              <Button
                                onClick={(e) => handleLicenseName(e)}
                                id='license'
                                size='small'
                                component='label'
                                className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                              >
                                <AttachFileIcon />
                                <input
                                  type='file'
                                  hidden
                                  onChange={(e) => handleLicenseUpload(e)}
                                />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        </>
                      ),
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </form>
        }
      />
    </>
  );
};
export default MainNavBar;
