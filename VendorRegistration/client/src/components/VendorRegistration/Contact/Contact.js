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
import ModalPop from "../Modal/ModalPop";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";

const Contact = () => {
  const classes = useStyles();

  const [addCommentModal, setAddCommentModal] = useState(false);
  const [contacts, setContacts] = useState([
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
  ]);

  const handleCommentModal = () => {
    setAddCommentModal(true);
  };

  const handleChangeInput = (index, e) => {
    const values = [...contacts];
    values[index][e.target.name] = e.target.value;
    setContacts(values);
  };

  const addOwnerInfo = (index) => {
    setContacts([...contacts, { sisterCompany: "" }]);
  };
  const removeOwnerInfo = (index) => {
    const values = [...contacts];
    values.splice(index, 1);
    setContacts(values);
  };

  const handleClose = () => {
    setAddCommentModal(false);
  };

  const formik = useFormik({
    initialValues: {
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
    validationSchema: Yup.object({
      inChargeFor: Yup.string().required("Required"),
      title: Yup.string().required("Required"),
      fname: Yup.string().required("Required"),
      lname: Yup.string().required("Required"),
      position: Yup.string().required("Required"),
      mob: Yup.string().required("Required"),
      tel: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      altEmail: Yup.string()
        .email("Invalid email address")
        .required("Required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
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
            <form
              className={classes.companyForm}
              onSubmit={formik.handleSubmit}
            >
              {contacts.map((owner, index) => {
                return (
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
                              onClick={() => addOwnerInfo(index)}
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
                              onClick={() => removeOwnerInfo(index)}
                            >
                              <Close />
                            </Fab>
                          </Tooltip>
                        )}
                      </Grid>
                      <Grid item lg={6}>
                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="inChargeFor"
                            name="inChargeFor"
                            label="Incharge for"
                            type="text"
                            value={owner.name}
                            onChange={(e) => handleChangeInput(index, e)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip title="Add comment">
                                    <Button
                                      onClick={handleCommentModal}
                                      id="orgChart"
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
                            {...formik.getFieldProps("inChargeFor")}
                          />
                          {formik.touched.inChargeFor &&
                          formik.errors.inChargeFor ? (
                            <div className={classes.error}>
                              {formik.errors.inChargeFor}
                            </div>
                          ) : null}
                          <div className={classes.comments}>
                            <Typography>This is a comment</Typography>
                          </div>
                        </FormControl>

                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="title"
                            name="title"
                            label="Title"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.designation}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Tooltip title="Add comment">
                                    <Button
                                      onClick={handleCommentModal}
                                      id="orgChart"
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
                            {...formik.getFieldProps("title")}
                          />
                          {formik.touched.title && formik.errors.title ? (
                            <div className={classes.error}>
                              {formik.errors.title}
                            </div>
                          ) : null}
                        </FormControl>

                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="fname"
                            name="fname"
                            label="First name"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.percentOfShare}
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
                            {...formik.getFieldProps("fname")}
                          />
                          {formik.touched.fname && formik.errors.fname ? (
                            <div className={classes.error}>
                              {formik.errors.fname}
                            </div>
                          ) : null}
                        </FormControl>

                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="lname"
                            name="lname"
                            label="Nationality"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.nationality}
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
                            {...formik.getFieldProps("lname")}
                          />
                          {formik.touched.lname && formik.errors.lname ? (
                            <div className={classes.error}>
                              {formik.errors.lname}
                            </div>
                          ) : null}
                        </FormControl>
                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="position"
                            name="position"
                            label="Position"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.tel}
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
                            {...formik.getFieldProps("position")}
                          />
                          {formik.touched.position && formik.errors.position ? (
                            <div className={classes.error}>
                              {formik.errors.position}
                            </div>
                          ) : null}
                        </FormControl>
                      </Grid>
                      <Grid item lg={6}>
                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="mob"
                            name="mob"
                            label="Mobile Number"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.mob}
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
                            {...formik.getFieldProps("mob")}
                          />
                          {formik.touched.mob && formik.errors.mob ? (
                            <div className={classes.error}>
                              {formik.errors.mob}
                            </div>
                          ) : null}
                        </FormControl>

                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="tel"
                            name="tel"
                            label="Phone number"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.email}
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
                            <div className={classes.error}>
                              {formik.errors.tel}
                            </div>
                          ) : null}
                        </FormControl>

                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="email"
                            name="email"
                            label="Email"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.email}
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
                            {...formik.getFieldProps("email")}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div className={classes.error}>
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </FormControl>

                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="altEmail"
                            name="altEmail"
                            label="Alternate email"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.email}
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
                            {...formik.getFieldProps("altEmail")}
                          />
                          {formik.touched.altEmail && formik.errors.altEmail ? (
                            <div className={classes.error}>
                              {formik.errors.altEmail}
                            </div>
                          ) : null}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
              <Grid item lg={12} className={classes.saveBtn}>
                <Button variant="contained" color="primary">
                  Save and Continue
                </Button>
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
export default Contact;
