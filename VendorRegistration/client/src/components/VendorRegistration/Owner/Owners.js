import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  Tooltip,
  Paper,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../VendorRegistrationStyles";
import { FieldArray, Formik, Field, Form, ErrorMessage } from "formik";
import { Select } from "formik-material-ui";
import * as Yup from "yup";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import countries from "../../../Constants/Countries";

const Owners = () => {
  const classes = useStyles();

  return (
    <Container className={classes.mainContainer}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.vrTitle} variant="h5">
            Owner Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={2} square={true} className={classes.customPaper}>
            <Formik
              initialValues={{
                owners: [
                  {
                    name: "",
                    designation: "",
                    percentOfShare: "",
                    nationality: "",
                    tel: "",
                    mob: "",
                    email: "",
                  },
                ],
              }}
              validationSchema={Yup.object().shape({
                owners: Yup.array().of(
                  Yup.object().shape({
                    name: Yup.string()
                      .min(4, "Name is too short")
                      .required("Name is required"),
                    designation: Yup.string().required(
                      "Designation is required"
                    ),
                    percentOfShare: Yup.number().positive().integer(),
                    tel: Yup.number()
                      .positive()
                      .integer()
                      .min(10, "Invalid phone number"),
                    mob: Yup.number()
                      .required("Mobile nummber is required")
                      .positive()
                      .integer()
                      .min(10, "Invalid phone number"),
                    email: Yup.string()
                      .required("Email is required")
                      .email("Invalid email"),
                  })
                ),
              })}
            >
              {(formikProps) => (
                <Form
                  onSubmit={formikProps.handleSubmit}
                  className={classes.companyForm}
                >
                  <FieldArray name="owners">
                    {(fieldArrayProps) => (
                      <>
                        {formikProps.values.owners.map((owner, index) => (
                          <Paper
                            elevation={0}
                            square={true}
                            className={`${classes.customPaper} ${classes.borderedPaper}`}
                            key={index}
                          >
                            <Grid container className={classes.relative}>
                              <Grid item lg={12} className={classes.addMoreBtn}>
                                {index === 0 && (
                                  <Tooltip title="Add new owner">
                                    <Fab
                                      color="primary"
                                      size="small"
                                      component="label"
                                      onClick={() =>
                                        fieldArrayProps.push({
                                          name: "",
                                          designation: "",
                                          percentOfShare: "",
                                          nationality: "",
                                          tel: "",
                                          mob: "",
                                          email: "",
                                        })
                                      }
                                    >
                                      <AddIcon />
                                    </Fab>
                                  </Tooltip>
                                )}
                                {index > 0 && (
                                  <Tooltip title="Remove owner">
                                    <Fab
                                      color="primary"
                                      size="small"
                                      component="label"
                                      onClick={() =>
                                        fieldArrayProps.remove(index)
                                      }
                                    >
                                      <Close />
                                    </Fab>
                                  </Tooltip>
                                )}
                              </Grid>
                              <Grid item lg={6}>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Field
                                    name={`owners.${index}.name`}
                                    label="Owner name"
                                    as={TextField}
                                  />
                                  <ErrorMessage
                                    className={classes.error}
                                    component="div"
                                    name={`owners.${index}.name`}
                                  />
                                </FormControl>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Field
                                    name={`owners.${index}.designation`}
                                    as={TextField}
                                    label="Designation"
                                  />
                                  <ErrorMessage
                                    className={classes.error}
                                    component="div"
                                    name={`owners.${index}.designation`}
                                  />
                                </FormControl>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Field
                                    name={`owners.${index}.percentOfShare`}
                                    type="number"
                                    label="Percentage of share"
                                    as={TextField}
                                  />
                                  <ErrorMessage
                                    className={classes.error}
                                    component="div"
                                    name={`owners.${index}.percentOfShare`}
                                  />
                                </FormControl>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <InputLabel
                                    className={classes.formikSelectLabel}
                                  >
                                    Nationality
                                  </InputLabel>
                                  <Field
                                    name={`owners.${index}.nationality`}
                                    component={Select}
                                  >
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
                                    name="nationality"
                                  />
                                </FormControl>
                              </Grid>
                              <Grid item lg={6}>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Field
                                    name={`owners.${index}.tel`}
                                    type="number"
                                    label="Phone"
                                    as={TextField}
                                  />
                                  <ErrorMessage
                                    className={classes.error}
                                    component="div"
                                    name={`owners.${index}.tel`}
                                  />
                                </FormControl>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Field
                                    name={`owners.${index}.mob`}
                                    type="number"
                                    label="Mobile"
                                    as={TextField}
                                  />
                                  <ErrorMessage
                                    className={classes.error}
                                    component="div"
                                    name={`owners.${index}.mob`}
                                  />
                                </FormControl>
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <Field
                                    name={`owners.${index}.email`}
                                    label="Email"
                                    as={TextField}
                                  />
                                  <ErrorMessage
                                    className={classes.error}
                                    component="div"
                                    name={`owners.${index}.email`}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Paper>
                        ))}
                      </>
                    )}
                  </FieldArray>
                  <Grid item lg={12} className={classes.saveBtn}>
                    <Button variant="contained" color="primary" type="submit">
                      Save and Continue
                    </Button>
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
export default Owners;
