import {
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
  InputLabel,
} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CommentIcon from "@material-ui/icons/Comment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { initialSave } from "../../../Actions/vendorRegActions";
import { useHandleChange } from "../../../Context/TabsContext";
import { UserContext } from "../../../Context/UserContext";
import { uploadFileToServer } from "../../../Helpers/FileUpload";
import ModalPop from "../../Modal/ModalPop";
import useStyles from "../VendorRegistrationStyles";

const BankAccount = () => {
  const { user, activeCompany, token, vendor } = useContext(UserContext);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [addCommentModal, setAddCommentModal] = useState(false);
  const [isIban, setisIban] = useState("");
  const [IbanName, setIbanName] = useState("");
  const HandleChange = useHandleChange();
  const handleCommentModal = () => {
    setAddCommentModal(true);
  };

  const handleClose = () => {
    setAddCommentModal(false);
  };

  const handleIbanName = () => {
    setisIban(true);
  };
  const handleIbanUpload = (e) => {
    const filename = e.target.files[0].name;
    setIbanName(filename);
    uploadFileToServer(
      e,
      vendor,
      "ibanCopy",
      dispatch,
      token,
      "bankInfo"
    );
  };

  const initialValues = {
    // bankName: vendor.length ? vendor[0].bankInfo?.bankName : "",
    // branchName: vendor.length ? vendor[0].bankInfo?.branchName : "",
    // accNo: vendor.length ? vendor[0].bankInfo?.accNo : "",
    // ibanNo: vendor.length ? vendor[0].bankInfo?.ibanNo : "",
    // swiftCode: vendor.length ? vendor[0].bankInfo?.swiftCode : "",
    // tel: vendor.length ? vendor[0].bankInfo?.tel : "",
    // ibanCopy: vendor.length ? vendor[0].bankInfo?.ibanCopy : "",
    bankName: "",
    branchName: "",
    accNo: "",
    ibanNo:  "",
    swiftCode:  "",
    tel:  "",
    ibanCopy: "",
  };
  const validationSchema = Yup.object({
    bankName: Yup.string().required("Required"),
    branchName: Yup.string().required("Required"),
    accNo: Yup.string().required("Required"),
    ibanNo: Yup.string().required("Required"),
    swiftCode: Yup.string().required("Required"),
    tel: Yup.string().required("Required"),
    // ibanCopy: Yup.string().required("Required"),
  });
  const onSubmit = (values) => { 
    const reqData = {
      bankInfo: values,
      initRegId: user._id,
      vendorId: vendor.length > 0 ? vendor[0]._id : "",
      companyId: activeCompany.activeCompany._id,
    };

    dispatch(initialSave(reqData, token, HandleChange, "4"));
  };

  return (
    <Container className={classes.mainContainer}>
      <Grid container>
        <Grid item lg={12} xs={12}>
          <Typography className={classes.vrTitle} variant="h5">
            Bank Account Information
          </Typography>
        </Grid>
        <Grid item lg={12} xs={12}>
          <Paper elevation={2} square={true} className={classes.customPaper}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
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
                          name="bankName"
                          as={TextField}
                          label="Bank Name"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="bankName"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="branchName"
                          as={TextField}
                          label="Branch name"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="branchName"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="accNo"
                          as={TextField}
                          label="Account number"
                          type="number"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="accNo"
                        />
                      </FormControl>

                       <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="ibanNo"
                          as={TextField}
                          label="IBAN number"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="ibanNo"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={6}>
                      <FormControl className={classes.formControl} fullWidth>
                        <Field
                          name="swiftCode"
                          as={TextField}
                          label="Swift code"
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="swiftCode"
                        />
                      </FormControl>

                      <FormControl className={classes.formControl} fullWidth>
                        <Field name="tel" as={TextField} label="Phone number" type="number"/>
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="tel"
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
                          Upload IBAN confirmation letter
                        </InputLabel>
                        <Field
                          name="ibanCopy"
                          as={TextField}
                          type="file"
                          className={classes.inputNoBorder}
                        />
                        <ErrorMessage
                          className={classes.error}
                          component="div"
                          name="ibanCopy"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={12} xs={12} className={classes.saveBtn}>
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
export default BankAccount;
