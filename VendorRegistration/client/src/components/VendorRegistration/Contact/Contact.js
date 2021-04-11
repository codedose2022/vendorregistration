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
import React, { useState, useContext } from "react";
import useStyles from "../VendorRegistrationStyles";
import * as Yup from "yup";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import {
  FieldArray,
  Formik,
  useFormik,
  Field,
  Form,
  getIn,
  ErrorMessage,
} from "formik";
import { Select } from "formik-material-ui";
import { useDispatch } from "react-redux";
import { useHandleChange } from "../../../Context/TabsContext";
import { UserContext } from "../../../Context/UserContext";
const Contact = () => {
  const classes = useStyles();
const dispatch = useDispatch();
  const HandleChange = useHandleChange();
  const { user, activeCompany, token, vendor } = useContext(UserContext);

  return (
    <Container className={classes.mainContainer}>
      <Grid container>
        <Grid item lg={12}>
          <Typography className={classes.vrTitle} variant="h5">
            Contact Information
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Paper elevation={2} square={true} className={classes.customPaper}>
            <Formik
              initialValues={{
                contacts: [
                  {
                    inChargeFor: "",
                    title: "",
                    fname: "",
                    lname: "",
                    position: "",
                    mob: "",
                    tel: "",
                    email: "",
                    altEmail: "",
                  },
                ],
              }}
              validationSchema={Yup.object().shape({
                contacts: Yup.array().of(
                  Yup.object().shape({
                    inChargeFor: Yup.string().required("Required"),
                    title: Yup.string().required("Required"),
                    fname: Yup.string().required("Required"),
                    lname: Yup.string().required("Required"),
                    position: Yup.string().required("Required"),
                    mob: Yup.number()
                      .required("Required")
                      .min(10, "Invalid phone number"),
                    tel: Yup.number()
                      .required("Required")
                      .positive()
                      .integer()
                      .min(10, "Invalid phone number"),
                    email: Yup.string()
                      .required("Required")
                      .email("Invalid email"),
                    altEmail: Yup.string()
                      .required("Required")
                      .email("Invalid email"),
                  })
                ),
              })}
              onSubmit={(values) => {
                alert(JSON.stringify(values));
              }}
            >
              {(formikProps) => (
                <Form
                  onSubmit={formikProps.handleSubmit}
                  className={classes.companyForm}
                >
                  <FieldArray name="contacts">
                    {(fieldArrayProps) => (
                      <>
                        {formikProps.values.contacts.map((contact, index) => {
                          return (
                            <Paper
                              elevation={0}
                              square={true}
                              className={`${classes.customPaper} ${classes.borderedPaper}`}
                              key={index}
                            >
                              <Grid container className={classes.relative}>
                                <Grid
                                  item
                                  lg={12}
                                  className={classes.addMoreBtn}
                                >
                                  {index === 0 && (
                                    <Tooltip title="Add new contact">
                                      <Fab
                                        color="primary"
                                        size="small"
                                        component="label"
                                        onClick={() =>
                                          fieldArrayProps.push({
                                            inChargeFor: "",
                                            title: "",
                                            fname: "",
                                            lname: "",
                                            position: "",
                                            mob: "",
                                            tel: "",
                                            email: "",
                                            altEmail: "",
                                          })
                                        }
                                      >
                                        <AddIcon />
                                      </Fab>
                                    </Tooltip>
                                  )}
                                  {index > 0 && (
                                    <Tooltip title="Remove contact">
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
                                      name={`contacts.[${index}].inChargeFor`}
                                      label="Incharge for"
                                      as={TextField}
                                    />

                                    <ErrorMessage
                                      className={classes.error}
                                      component="div"
                                      name={`contacts[${index}].inChargeFor`}
                                    />
                                  </FormControl>
                                  <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                  >
                                    <InputLabel
                                      className={classes.formikSelectLabel}
                                    >
                                      Title
                                    </InputLabel>
                                    <Field
                                      name={`contacts.${index}.title`}
                                      component={Select}
                                      className={classes.selectEmpty}
                                    >
                                      <MenuItem value={"Mr"}>Mr.</MenuItem>
                                      <MenuItem value={"Mrs"}>Mrs.</MenuItem>
                                    </Field>
                                    <ErrorMessage
                                      className={classes.error}
                                      component="div"
                                      name={`contacts.${index}.title`}
                                    />
                                  </FormControl>
                                  <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                  >
                                    <Field
                                      name={`contacts.${index}.fname`}
                                      label="First name"
                                      as={TextField}
                                    />
                                    <ErrorMessage
                                      className={classes.error}
                                      component="div"
                                      name={`contacts.${index}.fname`}
                                    />
                                  </FormControl>
                                  <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                  >
                                    <Field
                                      name={`contacts.${index}.lname`}
                                      label="Last name"
                                      as={TextField}
                                    />
                                    <ErrorMessage
                                      className={classes.error}
                                      component="div"
                                      name={`contacts.${index}.lname`}
                                    />
                                  </FormControl>
                                  <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                  >
                                    <Field
                                      name={`contacts.${index}.position`}
                                      label="Position"
                                      as={TextField}
                                    />
                                    <ErrorMessage
                                      className={classes.error}
                                      component="div"
                                      name={`contacts.${index}.position`}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid item lg={6}>
                                  <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                  >
                                    <Field
                                      name={`contacts.${index}.mob`}
                                      type="number"
                                      label="Mobile number"
                                      as={TextField}
                                    />
                                    <ErrorMessage
                                      className={classes.error}
                                      component="div"
                                      name={`contacts[${index}].mob`}
                                    />
                                  </FormControl>
                                  <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                  >
                                    <Field
                                      name={`contacts.${index}.tel`}
                                      label="Phone number"
                                      type="number"
                                      as={TextField}
                                    />
                                    <ErrorMessage
                                      className={classes.error}
                                      component="div"
                                      name={`contacts.${index}.tel`}
                                    />
                                  </FormControl>
                                  <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                  >
                                    <Field
                                      name={`contacts.${index}.email`}
                                      label="Email"
                                      as={TextField}
                                    />
                                    <ErrorMessage
                                      className={classes.error}
                                      component="div"
                                      name={`contacts.${index}.email`}
                                    />
                                  </FormControl>
                                  <FormControl
                                    className={classes.formControl}
                                    fullWidth
                                  >
                                    <Field name={`contacts.${index}.altEmail`} 
                                            label="Alternate email"
                                            as={TextField} />
                                    <ErrorMessage
                                      className={classes.error}
                                      component="div"
                                      name={`contacts.${index}.altEmail`}
                                    />
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Paper>
                          );
                        })}
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
export default Contact;
