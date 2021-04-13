import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { Select } from "formik-material-ui";
import _ from "lodash";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { initialSave } from "../../../Actions/vendorRegActions";
import countries from "../../../Constants/Countries";
import VendorType from "../../../Constants/VendorType";
import { useHandleChange } from "../../../Context/TabsContext";
import { UserContext } from "../../../Context/UserContext";
import { uploadFileToServer } from "../../../Helpers/FileUpload";
import useStyles from "../VendorRegistrationStyles";
import moment from "moment";
import { addStatus } from "../../../Helpers/validationHelper";
import { addFileName } from "../../../Helpers/FileUpload";
const Company = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const change = useHandleChange();
  const { user, activeCompany, token, vendor } = useContext(UserContext);
  const initialValues = {
    companyName: vendor.length ? vendor[0].companyInfo?.companyName[0] : "",
    address1: vendor.length ? vendor[0].companyInfo?.address1[0] : "",
    address2: vendor.length ? vendor[0].companyInfo?.address2[0] : "",
    city: vendor.length ? vendor[0].companyInfo?.city[0] : "",
    emirates: vendor.length ? vendor[0].companyInfo?.emirates[0] : "",
    country: vendor.length ? vendor[0].companyInfo?.country[0] : "",
    poBox: vendor.length ? vendor[0].companyInfo?.poBox[0] : "",
    email: vendor.length ? vendor[0].companyInfo?.email[0] : "",
    website: vendor.length ? vendor[0].companyInfo?.website[0] : "",
    phoneNo: vendor.length ? vendor[0].companyInfo?.phoneNo[0] : "",
    faxNo: vendor.length ? vendor[0].companyInfo?.faxNo[0] : "",
    noOfEmp: vendor.length ? vendor[0].companyInfo?.noOfEmp[0] : "",
    vendorType: vendor.length ? vendor[0].companyInfo?.vendorType[0] : [],
    yearOfEst: vendor.length ? vendor[0].companyInfo?.yearOfEst[0] : "",
    licenseNo: vendor.length ? vendor[0].companyInfo?.licenseNo[0] : "",
    licenseExpDate: vendor.length
      ? moment(vendor[0].companyInfo?.licenseExpDate[0])
          .format("YYYY-MM-DD")
          .toString()
      : "",
    // licenseCopy: vendor.length ? vendor[0].companyInfo?.licenseCopy[0] : "",
    // orgStructure: vendor.length ? vendor[0].companyInfo?.orgStructure[0] : "",

    sisCompanies:
      vendor.length &&
      vendor[0].companyInfo &&
      _.get(vendor[0].companyInfo, "sisCompanies", false) &&
      vendor[0].companyInfo.sisCompanies.length
        ? vendor[0].companyInfo.sisCompanies[0]
        : [""],
  };

  const validationSchema = Yup.object({
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
    vendorType: Yup.array().min(1).required("Required"),
    yearOfEst: Yup.string().required("Required"),
    licenseNo: Yup.string().required("Required"),
    licenseExpDate: Yup.string().required("Required"),
    // licenseCopy: Yup.string().required("Required"),
    //orgStructure: Yup.string().required("Required"),
  });

  const handleFileChange = (e, formikProps) => {
    formikProps.handleChange(e);

    if (e.target.files.length) {
      uploadFileToServer(
        e,
        vendor,
        e.target.name,
        dispatch,
        token,
        "companyInfo"
      );
    }
  };

  const onSubmit = (values) => {
    let data = Object.assign({}, values);
    let pattern = /\.[0-9a-z]+$/i;
    if (data.orgStructure && data.orgStructure.includes("\\")) {
      // _.set(
      //   data,
      //   "orgStructure",
      //   "orgStructure" + data.orgStructure.match(pattern)[0]
      // );
      data = addFileName(data, "orgStructure");
      // _.set(
      //   data,
      //   "licenseCopy",
      //   "licenseCopy" + data.licenseCopy.match(pattern)[0]
      // );
      data = addFileName(data, "licenseCopy");
    }
    // let status =
    //   vendor.length && _.get(vendor[0].companyInfo, "status", false)
    //     ? _.get(vendor[0].companyInfo, "status", false)
    //     : "";
    // if (status === "incomplete") {
    //   data.status = "under review";
    // } else {
    //   data.status = "saved";
    // }
    data.status = addStatus(vendor, "companyInfo");
    const reqData = {
      companyInfo: data,
      initRegId: user._id,
      vendorId: vendor.length > 0 ? vendor[0]._id : "",
      companyId: activeCompany.activeCompany._id,
    };

    dispatch(initialSave(reqData, token, change, "1"));
  };
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
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formikProps) => (
                <Form
                  className={classes.companyForm}
                  onSubmit={formikProps.handleSubmit}
                >
                  <Grid container>
                    <Grid item lg={6}>
                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="companyName"
                          as={TextField}
                          label="Company name"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="companyName"
                        />
                        <div className={classes.comments}>
                          <Typography>This is a comment</Typography>
                        </div>
                      </FormControl>
                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="address1"
                          as={TextField}
                          label="Address line 1"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="address1"
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="address2"
                          as={TextField}
                          label="Address line 2"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="address2"
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel className={classes.formikSelectLabel}>
                          Country
                        </InputLabel>
                        <Field name="country" component={Select}>
                          {countries.map((country) => (
                            <MenuItem
                              value={country.countryName}
                              key={country.countryShortCode}
                            >
                              {country.countryName}
                            </MenuItem>
                          ))}
                        </Field>
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="country"
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} fullWidth>
                        <InputLabel className={classes.formikSelectLabel}>
                          State/Province/Emirates
                        </InputLabel>
                        <Field name="emirates" component={Select}>
                          {formikProps.values.country
                            ? countries
                                .find(
                                  ({ countryName }) =>
                                    countryName === formikProps.values.country
                                )
                                .regions.map((reg) => (
                                  <MenuItem
                                    value={reg.name}
                                    key={reg.shortCode}
                                  >
                                    {reg.name}
                                  </MenuItem>
                                ))
                            : []}
                        </Field>
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="emirates"
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} fullWidth>
                        <Field name="city" as={TextField} label="City" />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="city"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field name="poBox" as={TextField} label="P.O.Box" />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="poBox"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field name="email" as={TextField} label="Email" />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="email"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field name="website" as={TextField} label="Website" />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="website"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="phoneNo"
                          as={TextField}
                          label="Phone number"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="phoneNo"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field name="faxNo" as={TextField} label="Fax" />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="faxNo"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item lg={6}>
                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="noOfEmp"
                          as={TextField}
                          label="No. of employees"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="noOfEmp"
                        />
                      </FormControl>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        style={{ marginTop: ".75rem" }}
                      >
                        <FormLabel component="legend">Vendor type</FormLabel>
                        <FormGroup>
                          {VendorType.map((type) => (
                            <FormLabel key={type}>
                              <Field
                                name="vendorType"
                                value={type}
                                as={Checkbox}
                                label={type}
                                color="primary"
                                checked={
                                  formikProps.values.vendorType &&
                                  formikProps.values.vendorType.includes(type)
                                }
                              ></Field>
                              {type}
                            </FormLabel>
                          ))}
                        </FormGroup>
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="vendorType"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="yearOfEst"
                          as={TextField}
                          label="Year of establishment"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="yearOfEst"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="licenseNo"
                          as={TextField}
                          label="License number"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="licenseNo"
                        />
                      </FormControl>

                      <FormControl
                        className={`${classes.formControl} ${classes.shrinkLabel} ${classes.customFileUpload}`}
                        fullWidth
                      >
                        <InputLabel
                          component="legend"
                          shrink={true}
                          className={classes.formikShrinkLabel}
                        >
                          License expiry date
                        </InputLabel>
                        <Field
                          name="licenseExpDate"
                          as={TextField}
                          type="date"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="licenseExpDate"
                        />
                      </FormControl>

                      <FormControl
                        className={`${classes.formControl} ${classes.customFileUpload} ${classes.shrinkLabel}`}
                        fullWidth
                      >
                        <InputLabel
                          component="legend"
                          shrink={true}
                          className={classes.formikShrinkLabel}
                        >
                          Upload license copy
                        </InputLabel>
                        <Field
                          name="licenseCopy"
                          as={TextField}
                          type="file"
                          onChange={(e) => handleFileChange(e, formikProps)}
                          className={classes.inputNoBorder}
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="licenseCopy"
                        />
                      </FormControl>

                      <FormControl
                        className={`${classes.formControl} ${classes.customFileUpload} ${classes.shrinkLabel} ${classes.inputNoBorder}`}
                        fullWidth
                      >
                        <InputLabel
                          component="legend"
                          shrink={true}
                          className={classes.formikShrinkLabel}
                        >
                          Upload organization chart
                        </InputLabel>
                        <Field
                          name="orgStructure"
                          type="file"
                          as={TextField}
                          onChange={(e) => handleFileChange(e, formikProps)}
                          className={classes.inputNoBorder}
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="orgStructure"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <FieldArray
                          name="sisCompanies"
                          render={(arrayHelpers) => (
                            <div>
                              {formikProps.values.sisCompanies.map(
                                (sisCompany, index) => (
                                  <div key={index}>
                                    <Field
                                      name={`sisCompanies.${index}`}
                                      label="Sister company"
                                      as={TextField}
                                      fullWidth
                                      InputProps={{
                                        endAdornment: (
                                          <>
                                            <InputAdornment position="end">
                                              {index === 0 && (
                                                <Tooltip title="Add new subsidiary">
                                                  <Button
                                                    onClick={() =>
                                                      arrayHelpers.push("")
                                                    }
                                                    id="addsubsidary"
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
                                                      arrayHelpers.remove(index)
                                                    }
                                                    id="addsubsidary"
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
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        />

                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="sisterCompany"
                        />
                      </FormControl>
                      {/* );
                      })} */}
                    </Grid>

                    <Grid item lg={12} className={classes.saveBtn}>
                      <Button type="submit" variant="contained" color="primary">
                        Save and Continue
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Company;
