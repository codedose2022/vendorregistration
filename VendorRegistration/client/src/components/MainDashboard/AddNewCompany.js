import React, { useState, useContext } from "react";
import useStyles from "./MainStyles";
import useStyle from "../MainNav/MainNavStyles";
import {
  Typography,
  Link,
  Grid,
  FormControl,
  InputAdornment,
  TextField,
  Tooltip,
  Button,
} from "@material-ui/core";
import ModalPop from "../Modal/ModalPop";
import { useDispatch } from "react-redux";
import { validateField } from "../../Helpers/validationHelper";
import { addNewCompany } from "../../Actions/vendorRegActions";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { UserContext } from "../../Context/UserContext";
import AttachFileIcon from "@material-ui/icons/AttachFile";

export default function AddNewCompany() {
  const classes = useStyles();
  const classes1 = useStyle();
  const dispatch = useDispatch();
  const { user, activeCompany, token } = useContext(UserContext);
  const [isLicense, setIsLicense] = useState(false);
  const [licenseName, setLicenseName] = useState("");
  const [touched, setTouched] = useState(false);
  const [serviceErrors, setServiceErrors] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [newCompanyModal, setNewCompanyModal] = useState(false);

  const [newCompany, setNewCompany] = useState({
    companyName: "",
    licenseNo: "",
    licenseExpDt: "",
    file: "",
  });

  const handleLicenseName = (e) => {
    setIsLicense(true);
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
    setLicenseName("");
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

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
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
      coFormData.append("_id", user._id);
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

  return (
    <>
      <Link className={classes.link} onClick={(e) => setNewCompanyModal(true)}>
        <Typography>Click here to add new company profile</Typography>
      </Link>
      {snackbar && (
        <Snackbar
          open={true}
          onClose={handleCloseSnackbar}
          autoHideDuration={4000}
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
                      className: classes1.helperTextError,
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
                      className: classes1.helperTextError,
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
                      className: classes1.helperTextError,
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
                      className: classes1.helperTextError,
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
                                className={`${classes1.fileUploadBtn} ${classes1.btnOnInput}`}
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
}
