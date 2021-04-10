import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  InputAdornment,
  Tooltip,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import useStyles from "../VendorRegistrationStyles";
import CommentIcon from "@material-ui/icons/Comment";
import { useFormik, Formik } from "formik";
import * as Yup from "yup";
import ModalPop from "../../Modal/ModalPop";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { uploadFile } from "../../../Actions/vendorRegActions";
import { useDispatch } from "react-redux";
import { initialSave } from "../../../Actions/vendorRegActions";
import { useHandleChange } from "../../../Context/TabsContext";
import { UserContext } from "../../../Context/UserContext";
import { uploadFileToServer } from "../../../Helpers/FileUpload";

const Tax = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, activeCompany, token, vendor } = useContext(UserContext);
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [isTax, setisTax] = useState("");
  const [isVat, setIsVat] = useState(false);
  const [vatName, setVatName] = useState("");
  const HandleChange = useHandleChange();
  console.log(vendor);
  const handleChange = (event) => {
    setisTax(event.target.value);
  };

  const handleCommentModal = () => {
    setAddCommentModal(true);
  };

  const handleClose = () => {
    setAddCommentModal(false);
  };

  const handleVatName = () => {
    setIsVat(true);
  };
  const handleVatUpload = (e) => {
    const filename = e.target.files[0].name;
    setVatName(filename);
    uploadFileToServer(
      e,
      vendor,
      "vatCopy",
      dispatch,
      token,
      "taxInfo"
    );
  };

  const initialValues = {
    vatNo: vendor.length ? vendor[0].taxInfo?.vatNo : "",
    tinNo: vendor.length ? vendor[0].taxInfo?.tinNo : "",
    vatCopy: vendor.length ? vendor[0].taxInfo?.vatCopy : "",
  };
  const validationSchema = Yup.object({
    // vatNo: Yup.string().required("Required"),
    // tinNo: Yup.string().required("Required"),
  });
  const onSubmit = (values) => {
    if (isTax === "yes") {
      const reqData = {
        taxInfo: values,
        initRegId: user._id,
        vendorId: vendor.length > 0 ? vendor[0]._id : "",
        companyId: activeCompany.activeCompany._id,
      };
      dispatch(initialSave(reqData, token, HandleChange, "3"));
    }
    HandleChange(null, 3);
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
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize
            >
              {(formik) => (
                <form
                  className={classes.companyForm}
                  onSubmit={formik.handleSubmit}
                >
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
                        <RadioGroup
                          aria-label="tax registered"
                          name="taxRegistered"
                          className={classes.flexRadio}
                          value={isTax}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            className={classes.fixedWidth200}
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            className={classes.fixedWidth200}
                            value="no"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {isTax === "yes" && (
                      <>
                        <Grid item xs={12} lg={6}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <TextField
                              id="vatNo"
                              name="vatNo"
                              label="VAT nummber"
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
                              {...formik.getFieldProps("vatNo")}
                            />
                            {formik.touched.vatNo && formik.errors.vatNo ? (
                              <div className={classes.error}>
                                {formik.errors.vatNo}
                              </div>
                            ) : null}
                            <div className={classes.comments}>
                              <Typography>This is a comment</Typography>
                            </div>
                          </FormControl>

                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <TextField
                              id="tinNo"
                              name="tinNo"
                              label="TIN number"
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
                              {...formik.getFieldProps("tinNo")}
                            />
                            {formik.touched.tinNo && formik.errors.tinNo ? (
                              <div className={classes.error}>
                                {formik.errors.tinNo}
                              </div>
                            ) : null}
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                          <FormControl
                            className={classes.formControl}
                            fullWidth
                          >
                            <TextField
                              label={!isVat ? "VAT certificate" : vatName}
                              disabled
                              id="vatCopy"
                              name="vatCopy"
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
                                      <Tooltip title="Upload VAT certificate">
                                        <Button
                                          onClick={handleVatName}
                                          id="license"
                                          size="small"
                                          component="label"
                                          className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                        >
                                          <AttachFileIcon />
                                          <input
                                            type="file"
                                            hidden
                                            onChange={(e) => handleVatUpload(e)}
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
                      </>
                    )}
                  </Grid>
                  <Grid item lg={12} className={classes.saveBtn}>
                    <Button type="submit" variant="contained" color="primary">
                      Save and Continue
                    </Button>
                  </Grid>
                </form>
              )}
            </Formik>
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
export default Tax;
