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
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Close from "@material-ui/icons/Close";
import CommentIcon from "@material-ui/icons/Comment";
import { useFormik } from "formik";
import React, { useContext, useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { UserContext } from "../../../Context/UserContext";
import { uploadFileToServer } from "../../../Helpers/FileUpload";
import ModalPop from "../../Modal/ModalPop";
import useStyles from "../VendorRegistrationStyles";
import { useHandleChange } from "../../../Context/TabsContext";
import { initialSave } from "../../../Actions/vendorRegActions";
import _ from "lodash";

const Company = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const HandleChange = useHandleChange();
  const { user,activeCompany, token, vendor } = useContext(UserContext);
  const [isIncorp, setIsIncorp] = useState(false);
  const [isPpt, setIsPpt] = useState(false);
  const [incorpName, setIncorpName] = useState("");
  const [pptName, setPptName] = useState("");
  const [logo, setLogo] = useState(false);
  const [logoName, setLogoName] = useState("");
  const [cover, setCover] = useState(false);
  const [coverName, setCoverName] = useState("");
  const [addCommentModal, setAddCommentModal] = useState(false);
  const assoc = _.get(vendor[0], "otherInfo.associationName", []);
  console.log(assoc);
  const [associations, setAssociations] = useState(assoc?assoc:[
    {
      association: "",
    },
  ]);

  useEffect(() => {
    setAssociations(assoc)
  }, [vendor]);

  const handleFileUpload = (e, setVal, val) => {
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
  };

  const handleFileState = (setFile) => {
    setFile(true);
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
console.log(vendor)
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      companyDesc: vendor.length ? vendor[0].otherInfo?.companyDesc : "",
      // incorpCopy: "",
      // pptCopy: "",
      // logoCopy: "",
      // coverCopy: "",
      associationName: vendor.length ? vendor[0].otherInfo?.associationName : "",
    },
    validationSchema: Yup.object({
      // companyDesc: Yup.string().required("Required"),
      // incorpCopy: Yup.string().required("Required"),
      // pptCopy: Yup.string().required("Required"),
      // logoCopy: Yup.string().required("Required"),
      // coverCopy: Yup.string().required("Required"),
      // associationName: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      let result = associations.map(({ association }) => association);
      values.associationName = result;
      alert(JSON.stringify(values, null, 2));
  
      const reqData = {
        otherInfo: values,
        initRegId: user._id,
        vendorId: vendor.length > 0 ? vendor[0]._id : "",
        companyId: activeCompany.activeCompany._id,
      };

      dispatch(initialSave(reqData, token, HandleChange, "8"));
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
                                  onClick={(e) => handleFileState(setIsIncorp)}
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                      handleFileUpload(
                                        e,
                                        setIncorpName,
                                        "incorpCopy"
                                      )
                                    }
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
                                  onClick={(e) => handleFileState(setIsPpt)}
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                      handleFileUpload(e, setPptName, "pptCopy")
                                    }
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
                                  onClick={(e) => handleFileState(setLogo)}
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                      handleFileUpload(
                                        e,
                                        setLogoName,
                                        "logoCopy"
                                      )
                                    }
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
                                  onClick={(e) => handleFileState(setCover)}
                                  size="small"
                                  component="label"
                                  className={`${classes.fileUploadBtn} ${classes.btnOnInput}`}
                                >
                                  <AttachFileIcon />
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) =>
                                      handleFileUpload(
                                        e,
                                        setCoverName,
                                        "coverCopy"
                                      )
                                    }
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
                    return (
                      <FormControl
                        className={classes.formControl}
                        fullWidth
                        key={index}
                      >
                        <TextField
                          id="association"
                          name="association"
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
                  <Button type="submit" variant="contained" color="primary">
                    Submit
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
