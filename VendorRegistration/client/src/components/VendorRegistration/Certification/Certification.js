import {
  Container,
  Grid,
  TextField,
  Typography,
  FormControl,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  InputAdornment,
  Radio,
  Tooltip,
  Paper,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "../VendorRegistrationStyles";
import CommentIcon from "@material-ui/icons/Comment";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalPop from "../Modal/ModalPop";
import Certifications from "../../../Constants/Certifications";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import _ from "lodash";

const Certification = () => {
  const classes = useStyles();

  const [addCommentModal, setAddCommentModal] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [fileName, setFileName] = useState([]);
  const [open, setOpen] = useState({});
  const [certType, setCertType] = useState([
    { qualityPolicyStatement: "" },
    { qualityPolicyStatementEvid: "" },
    { qualityCertificateIso: "" },
    { qmsManual: "" },
    { orgChart: "" },
    { isoMandatoryProcedure: "" },
    { legalComplianceReg: "" },
    { calibCert: "" },
    { corruptPolicy: "" },
    { codeOfConduct: "" },
    { cyberSecPolicy: "" },
    { hsePolicy: "" },
    { hseManual: "" },
    { hseOrgChart: "" },
    { hseLawsReg: "" },
    { hseCert: "" },
    { emergencyEvac: "" },
    { hseStatitics: "" },
    { riskRegister: "" },
    { safeOprtnProcedure: "" },
  ]);
  const handleMenuOpen = (e, certificate, index) => {
    setOpen((prev) => ({ ...prev, [index]: e.target.value }));

    if (!e.target.value) {
      let key = Object.keys(certType[index])[0];
      let newArr = [...certType]; // copying the old datas array

      newArr[index][key] = "";
      setCertType(newArr);
    }
  };

  const handleCommentModal = () => {
    setAddCommentModal(true);
  };

  const handleClose = () => {
    setAddCommentModal(false);
  };
  const handleVatName = () => {
    setIsFile(true);
  };

  const handleFileUpload = (e, index) => {
    const filename = e.target.files[0].name;
    let key = Object.keys(certType[index])[0];
    let newArr = [...certType]; // copying the old datas array
    newArr[index][key] = filename;
    setCertType(newArr);
    console.log(certType[index][Object.keys(certType[index])[0]])
  }
  
  const formik = useFormik({
    initialValues: {
      vatNo: "",
      vatCopy: "",
      tinNo: "",
    },
    validationSchema: Yup.object({
      vatNo: Yup.string().required("Required"),
      vatCopy: Yup.string().required("Required"),
      tinNo: Yup.string().required("Required"),
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
            Certification Information
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Paper elevation={2} square={true} className={classes.customPaper}>
            <form
              className={classes.companyForm}
              onSubmit={formik.handleSubmit}
            >
              <Grid container>
                <Grid item lg={12}>
                  <Table className={classes.table}>
                    <TableBody>
                      {Certifications.map((certificate, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell
                              key={`certificate${index}`}
                              id={`certificate${index}`}
                              align="left"
                            >
                              {certificate}
                            </TableCell>
                            <TableCell width="100px" align="left">
                              <FormControl
                                className={classes.certSelect}
                                fullWidth
                              >
                                <InputLabel id={`select${index}`}>
                                  Select
                                </InputLabel>

                                <Select
                                  defaultValue=""
                                  key={`select${index}`}
                                  id={`select${index}`}
                                  onChange={(e) =>
                                    handleMenuOpen(e, certificate, index)
                                  }
                                >
                                  <MenuItem value={1}>yes</MenuItem>
                                  <MenuItem value={0}>no</MenuItem>
                                </Select>
                              </FormControl>
                            </TableCell>
                            <TableCell align="left">
                              {_.get(open, `${index}`, false) ? (
                                <FormControl
                                  className={classes.formControl}
                                  fullWidth
                                >
                                  <TextField
                                    // label={!isFile ? "" : "d"}
                                    value={certType[index][Object.keys(certType[index])[0]]}
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
                                                  onChange={(e) =>
                                                    handleFileUpload(e, index)
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
                              ) : (
                                <div></div>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
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
export default Certification;