import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  Checkbox,
  FormLabel,
  FormGroup,
  Button,
  InputAdornment,
  Tooltip,
  Paper,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import useStyles from "../VendorRegistrationStyles";
import VendorType from "../../../Constants/VendorType";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import { Select } from "formik-material-ui";
import * as Yup from "yup";

import countries from "../../../Constants/Countries";
import { useDispatch } from "react-redux";
import { useHandleChange } from "../../../Context/TabsContext";
import { uploadFile } from "../../../Actions/vendorRegActions";
import { initialSave } from "../../../Actions/vendorRegActions";
import { UserContext } from "../../../Context/UserContext";
import { uploadFileToServer } from "../../../Helpers/FileUpload";

const Company = () => {
  const classes = useStyles();
const dispatch = useDispatch();
  const HandleChange = useHandleChange();
  const { user, activeCompany, token, vendor } = useContext(UserContext);
  
 //const handleFileUpload = (e, setVal, val) => {
   // const filename = e.target.files[0].name;
   // setVal(filename);
   // uploadFileToServer(e, vendor, val, dispatch, token, "companyInfo");
  //};
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
              initialValues={{
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
                sisCompanies: [""],
              }}
              validationSchema={Yup.object({
                companyName: Yup.string().required("Required"),
                address1: Yup.string().required("Required"),
                address2: Yup.string().required("Required"),
                city: Yup.string().required("Required"),
                emirates: Yup.string().required("Required"),
                country: Yup.string().required("Required"),
                poBox: Yup.string().required("Required"),
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Required"),
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
            })}
  //             onSubmit= (values) => {
  //     values.sisCompanies = sisterCompanies;
  //     const reqData = {
  //       companyInfo: values,
  //       initRegId: user._id,
  //       vendorId: vendor.length > 0 ? vendor[0]._id : "",
  //       companyId: activeCompany.activeCompany._id,
  //     };

  //     dispatch(initialSave(reqData, token, HandleChange, "1"));
  //   },
  // });
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
                                as={Checkbox}
                                label={type}
                                color="primary"
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
                      <Button variant="contained" color="primary">
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
