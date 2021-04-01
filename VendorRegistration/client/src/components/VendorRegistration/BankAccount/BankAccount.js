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
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../VendorRegistrationStyles";
import CommentIcon from "@material-ui/icons/Comment";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalPop from "../../Modal/ModalPop";
import AttachFileIcon from "@material-ui/icons/AttachFile";

const BankAccount = () => {
  const classes = useStyles();

  const [addCommentModal, setAddCommentModal] = useState(false);
  const [isIban, setisIban] = useState("");
  const [IbanName, setIbanName] = useState("");

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
  };

  const formik = useFormik({
    initialValues: {
        bankName: "",
        branchName: "",
        accNo: "",
        ibanNo: "",
        swiftCode: "",
        tel: "",
        ibanCopy: "",
    },
    validationSchema: Yup.object({
        bankName: Yup.string().required("Required"),
        branchName: Yup.string().required("Required"),
        accNo: Yup.string().required("Required"),
        ibanNo: Yup.string().required("Required"),
        swiftCode: Yup.string().required("Required"),
        tel: Yup.string().required("Required"),
        ibanCopy: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
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
          <form className={classes.companyForm} onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item lg={6}>
                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    id="bankName"
                    name="bankName"
                    label="Bank Name"
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
                    {...formik.getFieldProps("bankName")}
                  />
                  {formik.touched.bankName && formik.errors.bankName ? (
                    <div className={classes.error}>{formik.errors.bankName}</div>
                  ) : null}
                  <div className={classes.comments}>
                    <Typography>This is a comment</Typography>
                  </div>
                </FormControl>

                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    id="branchName"
                    name="branchName"
                    label="Branch name"
                    type="text"
                    // onChange={(e) => handleChangeInput(index, e)}
                    // value={owner.designation}
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
                    {...formik.getFieldProps("branchName")}
                  />
                  {formik.touched.branchName && formik.errors.branchName ? (
                    <div className={classes.error}>{formik.errors.branchName}</div>
                  ) : null}
                </FormControl>

                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    id="accNo"
                    name="accNo"
                    label="Account number"
                    type="text"
                    // onChange={(e) => handleChangeInput(index, e)}
                    // value={owner.designation}
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
                    {...formik.getFieldProps("accNo")}
                  />
                  {formik.touched.accNo && formik.errors.accNo ? (
                    <div className={classes.error}>{formik.errors.accNo}</div>
                  ) : null}
                </FormControl>

                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    id="ibanNo"
                    name="ibanNo"
                    label="IBAN number"
                    type="text"
                    // onChange={(e) => handleChangeInput(index, e)}
                    // value={owner.designation}
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
                    {...formik.getFieldProps("ibanNo")}
                  />
                  {formik.touched.ibanNo && formik.errors.ibanNo ? (
                    <div className={classes.error}>{formik.errors.ibanNo}</div>
                  ) : null}
                </FormControl>

              </Grid>
              <Grid item lg={6}>
                  
                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    id="swiftCode"
                    name="swiftCode"
                    label="Swift code"
                    type="text"
                    // onChange={(e) => handleChangeInput(index, e)}
                    // value={owner.designation}
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
                    {...formik.getFieldProps("swiftCode")}
                  />
                  {formik.touched.swiftCode && formik.errors.swiftCode ? (
                    <div className={classes.error}>{formik.errors.swiftCode}</div>
                  ) : null}
                </FormControl>
                  
                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    id="tel"
                    name="tel"
                    label="Phone number"
                    type="text"
                    // onChange={(e) => handleChangeInput(index, e)}
                    // value={owner.designation}
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
                    {...formik.getFieldProps("tel")}
                  />
                  {formik.touched.tel && formik.errors.tel ? (
                    <div className={classes.error}>{formik.errors.tel}</div>
                  ) : null}
                </FormControl>

                <FormControl className={classes.formControl} fullWidth>
                  <TextField
                    label={!isIban ? "IBAN confirmation letter" : IbanName}
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
                            <Tooltip title="Upload IBAN confirmation letter">
                              <Button
                                onClick={handleIbanName}
                                id="iban"
                                size="small"
                                component="label"
                                className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                              >
                                <AttachFileIcon />
                                <input
                                  type="file"
                                  hidden
                                  onChange={(e) => handleIbanUpload(e)}
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
              <Grid item lg={12} xs={12} className={classes.saveBtn}>
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
export default BankAccount;
