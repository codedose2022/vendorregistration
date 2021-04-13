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
import React, { useContext, useState } from "react";
import useStyles from "../VendorRegistrationStyles";
import { FieldArray, Formik, Field, Form, ErrorMessage } from "formik";
import { Select } from "formik-material-ui";
import * as Yup from "yup";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import countries from "../../../Constants/Countries";
import { initialSave } from "../../../Actions/vendorRegActions";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useHandleChange } from "../../../Context/TabsContext";
import { UserContext } from "../../../Context/UserContext";
import { addStatus } from "../../../Helpers/validationHelper";

const Owners = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const change = useHandleChange();
  const { user, activeCompany, token, vendor } = useContext(UserContext);
  let owners = [];
  vendor.length &&
    vendor[0].ownerInfo.owners.map((owner) => {
      owners.push({
        name: owner.name.length ? owner.name[0] : "",
        designation: owner.designation.length ? owner.designation[0] : "",
        percentOfShare: owner.percentOfShare.length
          ? owner.percentOfShare[0]
          : "",
        nationality: owner.nationality.length ? owner.nationality[0] : "",
        tel: owner.tel.length ? owner.tel[0] : "",
        mob: owner.mob.length ? owner.mob[0] : "",
        email: owner.email.length ? owner.email[0] : "",
      });
    });

  const initValues = {
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
  };
  let initialValues =
    vendor.length && vendor[0].ownerInfo.owners.length
      ? { owners }
      : initValues;

  const validationSchema = Yup.object().shape({
    owners: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .min(4, "Name is too short")
          .required("Name is required"),
        designation: Yup.string().required("Designation is required"),
        percentOfShare: Yup.number().positive().integer(),
        tel: Yup.number().positive().integer().min(10, "Invalid phone number"),
        mob: Yup.number()
          .required("Mobile number is required")
          .positive()
          .integer()
          .min(10, "Invalid phone number"),
        email: Yup.string()
          .required("Email is required")
          .email("Invalid email"),
      })
    ),
  });

  const onSubmit = (values) => {
    let data = Object.assign({}, values);
    data.status = addStatus(vendor, "ownerInfo");
    const reqData = {
      ownerInfo: data,
      initRegId: user._id,
      vendorId: vendor.length > 0 ? vendor[0]._id : "",
      companyId: activeCompany.activeCompany._id,
    };

    dispatch(initialSave(reqData, token, change, "2"));
  };

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
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formikProps) => (
                <Form className={classes.companyForm}>
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
