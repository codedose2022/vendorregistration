import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  Button,
  InputAdornment,
  Tooltip,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../VendorRegistrationStyles";
import VendorType from "../../../Constants/VendorType";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import AddIcon from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import CommentIcon from "@material-ui/icons/Comment";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalPop from "../../Modal/ModalPop";

const Company = () => {
  const classes = useStyles();
  const [isIncorp, setIsIncorp] = useState(false);
  const [isPpt, setIsPpt] = useState(false);
  const [incorpName, setIncorpName] = useState("");
  const [pptName, setPptName] = useState("");
  const [logo, setLogo] = useState(false);
  const [logoName, setLogoName] = useState("");
  const [cover, setCover] = useState(false);
  const [coverName, setCoverName] = useState("");
  const [addCommentModal, setAddCommentModal] = useState(false);
  const [associations, setAssociations] = useState([
    {
      association: "",
    },
  ]);

  const handleIncorpName = (e) => {
    const filename = e.target.files[0].name;
    setIncorpName(filename);
  };
  const handleIncorpUpload = () => {
    setIsIncorp(true);
  };
  const handlePptName = (e) => {
    const filename = e.target.files[0].name;
    setPptName(filename);
  };
  const handlePptUpload = () => {
    setIsPpt(true);
  };
  const handleLogo = (e) => {
    const filename = e.target.files[0].name;
    setLogoName(filename);
  };
  const handleLogoUpload = () => {
    setLogo(true);
  };

  const handleCover = (e) => {
    const filename = e.target.files[0].name;
    setCoverName(filename);
  };
  const handleCoverUpload = () => {
    setCover(true);
  };

  const handleCommentModal = () => {
    setAddCommentModal(true);
  };

  const handleClose = () => {
    setAddCommentModal(false);
  };

  const handleAddAssociation = (index) => {
    setAssociations([...associations, { association: "" }]);
  };
  const handleRemoveAssociation = (index) => {
    const values = [...associations];
    values.splice(index, 1);
    setAssociations(values);
  };

  const handleChangeInput = (index, e) => {
    const values = [...associations];
    values[index][e.target.name] = e.target.value;
    setAssociations(values);
  };

  const formik = useFormik({
    initialValues: {
      companyDesc: "",
      incorpCopy: "",
      pptCopy: "",
      logoCopy: "",
      coverCopy: "",
      associationName: "",
    },
    validationSchema: Yup.object({
      companyDesc: Yup.string().required("Required"),
      incorpCopy: Yup.string().required("Required"),
      pptCopy: Yup.string().required("Required"),
      logoCopy: Yup.string().required("Required"),
      coverCopy: Yup.string().required("Required"),
      associationName: Yup.string().required("Required"),
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
            Other Information
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Paper elevation={2} square={true} className={classes.customPaper}>
            <form
              className={classes.companyForm}
              onSubmit={formik.handleSubmit}
            >
              <Grid container>
                <Grid item lg={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      id="companyDesc"
                      name="companyDesc"
                      label="Company description"
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
                      {...formik.getFieldProps("companyDesc")}
                    />
                    {formik.touched.companyDesc && formik.errors.companyDesc ? (
                      <div className={classes.error}>
                        {formik.errors.companyDesc}
                      </div>
                    ) : null}
                    <div className={classes.comments}>
                      <Typography>This is a comment</Typography>
                    </div>
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      label={
                        !isIncorp
                          ? "Company incorporation document"
                          : incorpName
                      }
                      disabled
                      id="incorpCopy"
                      name="incorpCopy"
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
                              <Tooltip title="Upload company incorporation document">
                                <Button
                                  onClick={handleIncorpUpload}
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleIncorpName(e)}
                                  />
                                </Button>
                              </Tooltip>
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      label={!isPpt ? "Company presentation" : pptName}
                      disabled
                      id="pptCopy"
                      name="pptCopy"
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
                              <Tooltip title="Upload company presentation">
                                <Button
                                  onClick={handlePptUpload}
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handlePptName(e)}
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
                <Grid item lg={6}>
                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      label={!logo ? "Company logo" : logoName}
                      disabled
                      id="logoCopy"
                      name="logoCopy"
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
                              <Tooltip title="Upload company logo">
                                <Button
                                  onClick={handleLogoUpload}
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleLogo(e)}
                                  />
                                </Button>
                              </Tooltip>
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />
                  </FormControl>

                  <FormControl className={classes.formControl} fullWidth>
                    <TextField
                      label={!cover ? "Company cover image" : coverName}
                      disabled
                      id="coverCopy"
                      name="coverCopy"
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
                              <Tooltip title="Upload company cover image">
                                <Button
                                  onClick={handleCoverUpload}
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleCover(e)}
                                  />
                                </Button>
                              </Tooltip>
                            </InputAdornment>
                          </>
                        ),
                      }}
                    />
                  </FormControl>

                  {associations.map((association, index) => {
                    console.log(association.association);
                    return (
                      <FormControl
                        className={classes.formControl}
                        fullWidth
                        key={index}
                      >
                        <TextField
                          id="associationName"
                          name="associationName"
                          label="Associations in which you are a member"
                          type="text"
                          value={association.association}
                          onChange={(e) => handleChangeInput(index, e)}
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
                                  {index === 0 && (
                                    <Tooltip title="Add association">
                                      <Button
                                        onClick={() =>
                                          handleAddAssociation(index)
                                        }
                                        id="orgChart"
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
                                          handleRemoveAssociation(index)
                                        }
                                        id="orgChart"
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
                      </FormControl>
                    );
                  })}
                </Grid>
                <Grid item lg={12} className={classes.saveBtn}>
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
export default Company;
