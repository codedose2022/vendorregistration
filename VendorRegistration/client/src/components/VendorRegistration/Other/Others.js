import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  InputAdornment,
  Tooltip,
  Paper,
  InputLabel,
} from "@material-ui/core";
import useStyles from "../VendorRegistrationStyles";
import VendorType from "../../../Constants/VendorType";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import CommentIcon from "@material-ui/icons/Comment";
import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import React, { useContext, useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { UserContext } from "../../../Context/UserContext";
import { uploadFileToServer } from "../../../Helpers/FileUpload";
import ModalPop from "../../Modal/ModalPop";
import { useHandleChange } from "../../../Context/TabsContext";
import { initialSave } from "../../../Actions/vendorRegActions";
import _ from "lodash";

const Company = () => {
  const classes = useStyles();
const dispatch = useDispatch();
  const HandleChange = useHandleChange();
  const { user,activeCompany, token, vendor } = useContext(UserContext);
/*const handleFileUpload = (e, setVal, val) => {
    const filename = e.target.files[0].name;
    setVal(filename);
    uploadFileToServer(
      e,
      vendor,
      val,
      dispatch,
      token,
      "otherInfo"
    );
  };*/

  return (
    <Container className={classes.mainContainer}>
      <Grid container>
        <Grid item lg={12}>
          <Typography className={classes.vrTitle} variant="h5">
            Other Information
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Paper elevation={2} square={true} className={classes.customPaper}>
            <Formik
              initialValues={{
                companyDesc: "",
                incorpCopy: "",
                pptCopy: "",
                logoCopy: "",
                coverCopy: "",
                associationName: [""],
              }}
              validationSchema={Yup.object({
                companyDesc: Yup.string().required("Required"),
                incorpCopy: Yup.string().required("Required"),
                pptCopy: Yup.string().required("Required"),
                logoCopy: Yup.string().required("Required"),
                coverCopy: Yup.string().required("Required"),
                associationName: Yup.string().required("Required"),
              })}
    //           onSubmit= (values) => {
    //   let result = associations.map(({ association }) => association);
    //   values.associationName = result;
    //   alert(JSON.stringify(values, null, 2));
  
    //   const reqData = {
    //     otherInfo: values,
    //     initRegId: user._id,
    //     vendorId: vendor.length > 0 ? vendor[0]._id : "",
    //     companyId: activeCompany.activeCompany._id,
    //   };

    //   dispatch(initialSave(reqData, token, HandleChange, "8"));
    // },
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
                          name="companyDesc"
                          label="Company description"
                          type="text"
                          as={TextField}
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="companyDesc"
                        />
                        <div className={classes.comments}>
                          <Typography>This is a comment</Typography>
                        </div>
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
                          Upload Company incorporation document
                        </InputLabel>
                        <Field
                          name="incorpCopy"
                          as={TextField}
                          type="file"
                          className={classes.inputNoBorder}
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="incorpCopy"
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
                          Upload Company presentation
                        </InputLabel>
                        <Field
                          name="pptCopy"
                          as={TextField}
                          type="file"
                          className={classes.inputNoBorder}
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="pptCopy"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={6}>
                      <FormControl
                        className={`${classes.formControl} ${classes.customFileUpload} ${classes.shrinkLabel}`}
                        fullWidth
                      >
                        <InputLabel
                          component="legend"
                          shrink={true}
                          className={classes.formikShrinkLabel}
                        >
                          Upload Company logo
                        </InputLabel>
                        <Field
                          name="logoCopy"
                          as={TextField}
                          type="file"
                          className={classes.inputNoBorder}
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="logoCopy"
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
                          Upload Company cover image
                        </InputLabel>
                        <Field
                          name="coverCopy"
                          as={TextField}
                          type="file"
                          className={classes.inputNoBorder}
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="coverCopy"
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} fullWidth>
                      <FieldArray
                        name="associationName"
                        render={(arrayHelpers) => (
                          <div>
                            {formikProps.values.associationName.map(
                              (sisCompany, index) => (
                                <div key={index}>
                                  <Field
                                    name={`associationName.${index}`}
                                    label="Association name"
                                    as={TextField}
                                    fullWidth
                                    InputProps={{
                                      endAdornment: (
                                        <>
                                          <InputAdornment position="end">
                                            {index === 0 && (
                                              <Tooltip title="Add association">
                                                <Button
                                                  onClick={() =>
                                                    arrayHelpers.push("")
                                                  }
                                                  id="addAssoc"
                                                  size="small"
                                                  component="label"
                                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                                >
                                                  <AddIcon />
                                                </Button>
                                              </Tooltip>
                                            )}
                                            {index > 0 && (
                                              <Tooltip title="Remove association">
                                                <Button
                                                  onClick={() =>
                                                    arrayHelpers.remove(index)
                                                  }
                                                  id="removeAssoc"
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
                      </FormControl>
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
