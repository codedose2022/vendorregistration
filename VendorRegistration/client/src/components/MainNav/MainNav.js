import React, { useState } from "react";
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

const MainNavBar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const dispatch = useDispatch();
  const company = props.user.companyDetail;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [newCompanyModal, setNewCompanyModal] = useState(false);
  const [isLicense, setIsLicense] = useState(false);
  const [licenseName, setLicenseName] = useState("");

  const handleLicenseName = () => {
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
  };

  const handleLicenseUpload = (e) => {
    let filename = e.target.files[0].name;
    setIsLicense(true);
    setLicenseName(filename);
  };

  const handleCompanyChange = (e,company) => {
    dispatch({ type: "CHANGE_COMPANY", payload:company  });
  };

  const handleLogOut = () => {
    localStorage.setItem("auth-token", "");
    dispatch({ type: "RESET_STORE" });
    localStorage.setItem("master_class", "");
    history.push("/");
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
                    onClick={(e) => handleCompanyChange(e,cmpny)}
                    color='secondary'
                    style={getStyleForMenu(
                      cmpny.companyName[0],
                      props.activeCompany
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
                  onClick = {handleLogOut}
                >
                  Logout
                </Button>
              </div>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>

      <SideBarDashboard mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <ModalPop
        title='Add New Company'
        isOpen={newCompanyModal}
        handleClose={handleModalClose}
        content={
          <form>
            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField
                    id='companyName'
                    name='companyName'
                    label='Company name'
                    type='text'
                  />
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField
                    id='licenseNo'
                    name='licenseNo'
                    label='License number'
                    type='text'
                  />
                </FormControl>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    id='licenseExpDt'
                    name='licenseExpDt'
                    type='date'
                    label='License expiry date'
                  />
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    label={!isLicense ? "License copy" : licenseName}
                    disabled
                    id='licenseCopy'
                    name='licenseCopy'
                    InputProps={{
                      endAdornment: (
                        <>
                          <InputAdornment position='end'>
                            <Tooltip title='Upload License'>
                              <Button
                                onClick={handleLicenseName}
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
