import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  Button,
  InputAdornment,
  Tooltip,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../VendorRegistrationStyles";
import VendorType from "../../../Constants/VendorType";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import CommentIcon from "@material-ui/icons/Comment";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalPop from "../Modal/ModalPop";

const Company = () => {
  const classes = useStyles();
  const [vendorType, setVendorType] = useState("");
  const [isLicense, setIsLicense] = useState(false);
  const [isOrgChart, setOrgChart] = useState(false);
  const [licenseName, setLicenseName] = useState("");
  const [orgChartName, setOrgChartName] = useState("");
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [sisterCompanies, setSisterCompanies] = useState([
    {
      sisterCompany: "",
    },
  ]);

  const handleChange = (event) => {
    setVendorType(event.target.checked);
  };
  const handleLicenseName = () => {
    setIsLicense(true);
  };
  const handleOrgChartName = () => {
    setOrgChart(true);
  };

  const handleLicenseUpload = (e) => {
    const filename = e.target.files[0].name;
    setLicenseName(filename);
  };
  const handleOrgChartUpload = (e) => {
    const filename = e.target.files[0].name;
    setOrgChartName(filename);
  };

  const handleCommentModal = () => {
    setAddCommentModal(true);
  };

  const handleClose = () => {
    setAddCommentModal(false);
  };

  const handleAddSisCompany = (index) => {
    setSisterCompanies([...sisterCompanies, { sisterCompany: "" }]);
  };
  const handleRemoveSisCompany = (index) => {
    const values = [...sisterCompanies];
    values.splice(index, 1);
    setSisterCompanies(values);
  };

  const handleChangeInput = (index, e) => {
    const values = [...sisterCompanies];
    values[index][e.target.name] = e.target.value;
    console.log(e.target.value);
    setSisterCompanies(values);
  };

  const formik = useFormik({
    initialValues: {
      companyName: "",
      address1: "",
      address2: "",
      city: "",
      emirates: "",
      country: "",
      poBox: "",
      email: "",
      website: "",
      phoneNo: "",
      faxNo: "",
      noOfEmp: "",
      vendorType: "",
      yearOfEst: "",
      licenseNo: "",
      licenseExpDate: "",
      licenseCopy: "",
      orgStructure: "",
      sisCompanies: "",
    },
    validationSchema: Yup.object({
      companyName: Yup.string().required("Required"),
      address1: Yup.string().required("Required"),
      address2: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      emirates: Yup.string().required("Required"),
      country: Yup.string().required("Required"),
      poBox: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      website: Yup.string().required("Required"),
      phoneNo: Yup.string().required("Required"),
      faxNo: Yup.string().required("Required"),
      noOfEmp: Yup.string().required("Required"),
      vendorType: Yup.string().required("Required"),
      yearOfEst: Yup.string().required("Required"),
      licenseNo: Yup.string().required("Required"),
      licenseExpDate: Yup.string().required("Required"),
      licenseCopy: Yup.string().required("Required"),
      orgStructure: Yup.string().required("Required"),
      sisCompanies: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Container className={classes.mainContainer}>
      <Grid container>
        <Grid item lg={12}>
          <Typography className={classes.vrTitle} variant="h5">
            Company Information
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Paper elevation={2} square={true} className={classes.customPaper}>
            <form
              className={classes.companyForm}
              onSubmit={formik.handleSubmit}
            >
              <Grid container>
                <Grid item lg={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="companyName"
                      name="companyName"
                      label="Company name"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("companyName")}
                    />
                    {formik.touched.companyName && formik.errors.companyName ? (
                      <div className={classes.error}>
                        {formik.errors.companyName}
                      </div>
                    ) : null}
                    <div className={classes.comments}>
                      <Typography>This is a comment</Typography>
                    </div>
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="address1"
                      name="address1"
                      label="Address Line 1"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("address1")}
                    />
                    {formik.touched.address1 && formik.errors.address1 ? (
                      <div className={classes.error}>
                        {formik.errors.address1}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="address2"
                      name="address2"
                      label="Address Line 2"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("address2")}
                    />
                    {formik.touched.address2 && formik.errors.address2 ? (
                      <div className={classes.error}>
                        {formik.errors.address2}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="city"
                      name="city"
                      label="City"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("city")}
                    />
                    {formik.touched.city && formik.errors.city ? (
                      <div className={classes.error}>{formik.errors.city}</div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="emirates"
                      name="emirates"
                      label="State/Province/Emirates"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("emirates")}
                    />
                    {formik.touched.emirates && formik.errors.emirates ? (
                      <div className={classes.error}>
                        {formik.errors.emirates}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="country"
                      name="country"
                      label="Country"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("country")}
                    />
                    {formik.touched.country && formik.errors.country ? (
                      <div className={classes.error}>
                        {formik.errors.country}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="poBox"
                      name="poBox"
                      label="P.O Box"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("poBox")}
                    />
                    {formik.touched.poBox && formik.errors.poBox ? (
                      <div className={classes.error}>{formik.errors.poBox}</div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className={classes.error}>{formik.errors.email}</div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="website"
                      name="website"
                      label="Website"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("website")}
                    />
                    {formik.touched.website && formik.errors.website ? (
                      <div className={classes.error}>
                        {formik.errors.website}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="phoneNo"
                      name="phoneNo"
                      label="Phone Number"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("phoneNo")}
                    />
                    {formik.touched.phoneNo && formik.errors.phoneNo ? (
                      <div className={classes.error}>
                        {formik.errors.phoneNo}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="faxNo"
                      name="faxNo"
                      label="Fax Number"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("faxNofaxNo")}
                    />
                    {formik.touched.faxNo && formik.errors.faxNo ? (
                      <div className={classes.error}>{formik.errors.faxNo}</div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="mobileNo"
                      name="mobileNo"
                      label="Mobile"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("mobileNo")}
                    />
                    {formik.touched.mobileNo && formik.errors.mobileNo ? (
                      <div className={classes.error}>
                        {formik.errors.mobileNo}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="noOfEmp"
                      name="noOfEmp"
                      label="No. of employees"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("noOfEmp")}
                    />
                    {formik.touched.noOfEmp && formik.errors.noOfEmp ? (
                      <div className={classes.error}>
                        {formik.errors.noOfEmp}
                      </div>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item lg={6}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                    fullWidth
                    style={{marginTop: '.75rem'}}
                  >
                    <div className={classes.flex}>
                      <FormLabel component="legend">Vendor type</FormLabel>
                      <Tooltip title="Add comment">
                        <Button
                          onClick={handleCommentModal}
                          size="small"
                          component="label"
                          className={classes.btnOnInput}
                        >
                          <CommentIcon />
                        </Button>
                      </Tooltip>
                    </div>
                    <FormGroup>
                      {VendorType.map((type) => (
                        <FormControlLabel
                          key={type}
                          name="vendorType"
                          id="vendorType"
                          control={
                            <Checkbox
                              onClick={handleChange}
                              color="primary"
                              name={type}
                              value={vendorType}
                              className={classes.customCheck}
                            />
                          }
                          label={type}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="yearOfEst"
                      name="yearOfEst"
                      label="Year of establishment"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("yearOfEst")}
                    />
                    {formik.touched.yearOfEst && formik.errors.yearOfEst ? (
                      <div className={classes.error}>
                        {formik.errors.yearOfEst}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="licenseNo"
                      name="licenseNo"
                      label="License number"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("licenseNo")}
                    />
                    {formik.touched.licenseNo && formik.errors.licenseNo ? (
                      <div className={classes.error}>
                        {formik.errors.licenseNo}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="licenseExpDate"
                      name="licenseExpDate"
                      label="License expiry date"
                      type="text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Tooltip title="Add comment">
                              <Button
                                onClick={handleCommentModal}
                                size="small"
                                component="label"
                                className={classes.btnOnInput}
                              >
                                <CommentIcon />
                              </Button>
                            </Tooltip>
                          </InputAdornment>
                        ),
                      }}
                      {...formik.getFieldProps("licenseExpDate")}
                    />
                    {formik.touched.licenseExpDate &&
                    formik.errors.licenseExpDate ? (
                      <div className={classes.error}>
                        {formik.errors.licenseExpDate}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      label={!isLicense ? "License copy" : licenseName}
                      disabled
                      id="licenseCopy"
                      name="licenseCopy"
                      InputProps={{
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <Tooltip title="Add comment">
                                <Button
                                  onClick={handleCommentModal}
                                  size="small"
                                  component="label"
                                  className={classes.btnOnInput}
                                >
                                  <CommentIcon />
                                </Button>
                              </Tooltip>
                            </InputAdornment>
                            <InputAdornment position="end">
                              <Tooltip title="Upload License">
                                <Button
                                  onClick={handleLicenseName}
                                  id="license"
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
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

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      label={!isOrgChart ? "Organization chart" : orgChartName}
                      disabled
                      id="orgStructure"
                      name="orgStructure"
                      InputProps={{
                        endAdornment: (
                          <>
                            <InputAdornment position="end">
                              <Tooltip title="Add comment">
                                <Button
                                  onClick={handleCommentModal}
                                  size="small"
                                  component="label"
                                  className={classes.btnOnInput}
                                >
                                  <CommentIcon />
                                </Button>
                              </Tooltip>
                            </InputAdornment>
                            <InputAdornment position="end">
                              <Tooltip title="Upload organization chart">
                                <Button
                                  onClick={handleOrgChartName}
                                  id="orgChart"
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleOrgChartUpload(e)}
                                  />
                                </Button>
                              </Tooltip>
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />
                  </FormControl>
                  {sisterCompanies.map((siscompany, index) => {
                    console.log(siscompany.sisterCompany);
                    return (
                      <FormControl
                        className={classes.formControl}
                        fullWidth
                        key={index}
                      >
                        <TextField
                          id="sisterCompany"
                          name="sisterCompany"
                          label="Sister companies / Subsidiaries"
                          type="text"
                          value={siscompany.sisterCompany}
                          onChange={(e) => handleChangeInput(index, e)}
                          InputProps={{
                            endAdornment: (
                              <>
                                <InputAdornment position="end">
                                  <Tooltip title="Add comment">
                                    <Button
                                      onClick={handleCommentModal}
                                      size="small"
                                      component="label"
                                      className={classes.btnOnInput}
                                    >
                                      <CommentIcon />
                                    </Button>
                                  </Tooltip>
                                </InputAdornment>
                                <InputAdornment position="end">
                                  {index === 0 && (
                                    <Tooltip title="Add new subsidiary">
                                      <Button
                                        onClick={() =>
                                          handleAddSisCompany(index)
                                        }
                                        id="orgChart"
                                        size="small"
                                        component="label"
                                        className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                      >
                                        <AddIcon />
                                      </Button>
                                    </Tooltip>
                                  )}
                                  {index > 0 && (
                                    <Tooltip title="Remove subsidiary">
                                      <Button
                                        onClick={() =>
                                          handleRemoveSisCompany(index)
                                        }
                                        id="orgChart"
                                        size="small"
                                        component="label"
                                        className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                      >
                                        <Close />
                                      </Button>
                                    </Tooltip>
                                  )}
                                </InputAdornment>
                              </>
                            ),
                          }}
                        />
                      </FormControl>
                    );
                  })}
                </Grid>
                <Grid item lg={12} className={classes.saveBtn}>
                  <Button variant="contained" color="primary">
                    Save and Continue
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      <ModalPop
        title="Add Comment"
        isOpen={addCommentModal}
        handleClose={handleClose}
        content={
          <TextField
            multiline={true}
            fullWidth
            label="Comments here.."
          ></TextField>
        }
      />
    </Container>
  );
};
export default Company;
