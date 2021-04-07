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
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import Fab from "@material-ui/core/Fab";
import { useDispatch } from "react-redux";
import { useHandleChange } from "../../../Context/TabsContext";

const Owner = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const HandleChange = useHandleChange();
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [owners, setOwners] = useState([
    {
      name: "",
      designation: "",
      percentOfShare: "",
      nationality: "",
      tel: "",
      mob: "",
      email: "",
    },
  ]);

  const handleCommentModal = () => {
    setAddCommentModal(true);
  };

  const handleChangeInput = (index, e) => {
    const values = [...owners];
    values[index][e.target.name] = e.target.value;
    setOwners(values);
  };

  const addOwnerInfo = (index) => {
    setOwners([...owners, { sisterCompany: "" }]);
  };
  const removeOwnerInfo = (index) => {
    const values = [...owners];
    values.splice(index, 1);
    setOwners(values);
  };

  const handleClose = () => {
    setAddCommentModal(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      designation: "",
      percentOfShare: "",
      nationality: "",
      tel: "",
      mob: "",
      email: "",
    },
    validationSchema: Yup.object({
      // name: Yup.string().required("Required"),
      // designation: Yup.string().required("Required"),
      // percentOfShare: Yup.string().required("Required"),
      // nationality: Yup.string().required("Required"),
      // tel: Yup.string().required("Required"),
      // mob: Yup.string().required("Required"),
      // email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      HandleChange(null, 2);
    },
  });
  return (
    <Container className={classes.mainContainer}>
      <Grid container>
        <Grid item lg={12}>
          <Typography className={classes.vrTitle} variant="h5">
            Owner Information
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Paper elevation={2} square={true} className={classes.customPaper}>
            <form
              className={classes.companyForm}
              onSubmit={formik.handleSubmit}
            >
              {owners.map((owner, index) => {
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
                            id="name"
                            name="name"
                            label="Owner name"
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
                            {...formik.getFieldProps("name")}
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div className={classes.error}>
                              {formik.errors.name}
                            </div>
                          ) : null}
                          <div className={classes.comments}>
                            <Typography>This is a comment</Typography>
                          </div>
                        </FormControl>

                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="designation"
                            name="designation"
                            label="Designation"
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
                            {...formik.getFieldProps("designation")}
                          />
                          {formik.touched.designation &&
                          formik.errors.designation ? (
                            <div className={classes.error}>
                              {formik.errors.designation}
                            </div>
                          ) : null}
                        </FormControl>

                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="percentOfShare"
                            name="percentOfShare"
                            label="Percentage of share"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.percentOfShare}
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
                            {...formik.getFieldProps("percentOfShare")}
                          />
                          {formik.touched.percentOfShare &&
                          formik.errors.percentOfShare ? (
                            <div className={classes.error}>
                              {formik.errors.percentOfShare}
                            </div>
                          ) : null}
                        </FormControl>

                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="nationality"
                            name="nationality"
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
                            {...formik.getFieldProps("nationality")}
                          />
                          {formik.touched.nationality &&
                          formik.errors.nationality ? (
                            <div className={classes.error}>
                              {formik.errors.nationality}
                            </div>
                          ) : null}
                        </FormControl>
                      </Grid>
                      <Grid item lg={6}>
                        <FormControl className={classes.formControl} fullWidth>
                          <TextField
                            id="tel"
                            name="tel"
                            label="Phone number"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.tel}
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
                            id="mob"
                            name="mob"
                            label="Mobile number"
                            type="text"
                            onChange={(e) => handleChangeInput(index, e)}
                            value={owner.mob}
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
                            {...formik.getFieldProps("email")}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <div className={classes.error}>
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
              <Grid item lg={12} className={classes.saveBtn}>
                <Button type="submit" variant="contained" color="primary">
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
export default Owner;
