import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  FormLabel,
  FormControlLabel,
  Radio,
  Paper,
  InputLabel,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import useStyles from "../VendorRegistrationStyles";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { RadioGroup } from "formik-material-ui";
import { uploadFile } from "../../../Actions/vendorRegActions";
import { useDispatch } from "react-redux";
import { initialSave } from "../../../Actions/vendorRegActions";
import { useHandleChange } from "../../../Context/TabsContext";
import { UserContext } from "../../../Context/UserContext";
import { addFileName,uploadFileToServer } from "../../../Helpers/FileUpload";

const Tax = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, activeCompany, token, vendor } = useContext(UserContext);
  const [isTax, setisTax] = useState("");
  const HandleChange = useHandleChange();
  const handleChange = (event) => {
    setisTax(event.target.value);
  };

  const handleFileChange = (e, formikProps) => {
    formikProps.handleChange(e);

    if (e.target.files.length) {
      uploadFileToServer(
        e,
        vendor,
        e.target.name,
        dispatch,
        token,
        "taxInfo"
      );
    }
  };

  const initialValues = {
    taxRegistered: "",
    vatNo: "",
    vatCopy: "",
    tinNo: "",
  };

  const validationSchema = Yup.object({
    // taxRegistered: Yup.string().required("Please select your answer"),
    // vatNo: Yup.string().when("isTax", {
    //   is: (value) => isTax === "yes",
    //   then: Yup.string().required("Required"),
    // }),
    // vatCopy: Yup.string().when("isTax", {
    //   is: (value) => isTax === "yes",
    //   then: Yup.string().required("Required"),
    // }),
    // tinNo: Yup.string().when("isTax", {
    //   is: (value) => isTax === "yes",
    //   then: Yup.string().required("Required"),
    // }),
  });
  const onSubmit = (values) => {
    let data = Object.assign({}, values);
    // let pattern = /\.[0-9a-z]+$/i;
    // if (data.vatCopy && data.vatCopy.includes("\\")) {
    //   _.set(
    //     data,
    //     "vatCopy",
    //     "vatCopy" + data.vatCopy.match(pattern)[0]
    //   );
    // }
    if (data.vatCopy && data.vatCopy.includes("\\")) {
      data = addFileName(data, "vatCopy");
    }
    const reqData = {};

    //  data.status = addStatus(vendor,'companyInfo' );
    if (isTax === "yes") {
      reqData = {
        taxInfo: data,
        initRegId: user._id,
        vendorId: vendor.length > 0 ? vendor[0]._id : "",
        companyId: activeCompany.activeCompany._id,
      };
    } else {
      reqData = {
        taxInfo: { taxRegistered: "no" },
        initRegId: user._id,
        vendorId: vendor.length > 0 ? vendor[0]._id : "",
        companyId: activeCompany.activeCompany._id,
      };
    }
    dispatch(initialSave(reqData, token, HandleChange, "3"));
  };

  return (
    <Container className={classes.mainContainer}>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Typography className={classes.vrTitle} variant="h5">
            Tax Information
          </Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Paper elevation={2} square={true} className={classes.customPaper}>
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formikProps) => (
                <Form className={classes.companyForm}>
                  <Grid container>
                    <Grid item lg={12} xs={12}>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        fullWidth
                      >
                        <FormLabel component="legend">
                          Is your company registered for VAT in UAE?
                        </FormLabel>
                        <Field
                          component={RadioGroup}
                          name="taxRegistered"
                          className={classes.flexRadio}
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                            onChange={handleChange}
                            className={classes.fixedWidth200}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                            onChange={handleChange}
                            className={classes.fixedWidth200}
                          />
                        </Field>
                      </FormControl>
                    </Grid>
                    {isTax === "yes" && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <Field
                              name="vatNo"
                              as={TextField}
                              label="VAT number"
                            />
                            <ErrorMessage
                              className={classes.error}
                              component="div"
                              name="vatNo"
                            />
                            <div className={classes.comments}>
                              <Typography>This is a comment</Typography>
                            </div>
                          </FormControl>

                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <Field
                              name="tinNo"
                              as={TextField}
                              label="TIN number"
                            />
                            <ErrorMessage
                              className={classes.error}
                              component="div"
                              name="tinNo"
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <FormControl
                            className={`${classes.formControl} ${classes.customFileUpload} ${classes.shrinkLabel}`}
                            fullWidth
                          >
                            <InputLabel
                              component="legend"
                              shrink={true}
                              className={classes.formikShrinkLabel}
                            >
                              Upload VAT certificate
                            </InputLabel>
                            <Field
                              name="vatCopy"
                              as={TextField}
                              type="file"
                              onChange={(e) => handleFileChange(e, formikProps)}
                              className={classes.inputNoBorder}
                            />
                            <ErrorMessage
                              className={classes.error}
                              component="div"
                              name="vatCopy"
                            />
                          </FormControl>
                        </Grid>
                      </>
                    )}
                  </Grid>
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
export default Tax;
