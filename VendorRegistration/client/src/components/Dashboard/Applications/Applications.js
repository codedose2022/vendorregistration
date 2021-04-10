import {
  Container,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  TableContainer,
} from "@material-ui/core";
import React from "react";
import useStyles from "./ApplicationStyles";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";
import VendorRegistrationStyles from "../../VendorRegistration/VendorRegistrationStyles";
import {
  getDescOfApplication,
  getStatusOfApplication,
} from "../../../Helpers/DashboardHelper";
import moment from "moment";

const Applications = () => {
  const classes = useStyles();
  const { application, activeCompany, vendor } = useContext(UserContext);
  let vendorDetail = vendor.vendors.filter(
    (ven) => ven.companyDetailId === activeCompany.activeCompany._id
  );
  let applications = [];
  if (vendorDetail.length) {
    applications = application.filter(
      (app) => app.typeId === vendorDetail[0]._id
    );
  }

  console.log(application);
  // const applications = [
  //   {
  //     slno: 1,
  //     description: "New vendor registration",
  //     date: "31/03/2021",
  //     status: "Incomplete",
  //   },
  //   {
  //     slno: 2,
  //     description: "Amendment",
  //     date: "20/03/2021",
  //     status: "Approved",
  //   },
  //   {
  //     slno: 3,
  //     description: "Amendment",
  //     date: "20/03/2021",
  //     status: "Rejected",
  //   },
  // ];

  return (
    <Container className={classes.applicationContainer}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <TableContainer component={Paper}>
            {applications.length ? (
              <Table className={classes.applicationTable}>
                <TableHead>
                  <TableRow>
                    <TableCell align='left'>Sl.No.</TableCell>
                    <TableCell align='left'>Description</TableCell>
                    <TableCell align='left'>Date &amp; Time</TableCell>
                    <TableCell align='left'>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {applications.map((row, index) => (
                    <TableRow key={`${index}_applications`}>
                      <TableCell component='th' scope='row'>
                        {index + 1}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {getDescOfApplication(row.applicationType)}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {`${moment(row.createdAt).format(
                          "Do MMMM YYYY"
                        )}, ${moment(row.createdAt).format("h:mm a")}`}
                      </TableCell>
                      <TableCell align='left'>
                        <Chip
                          className={
                            getStatusOfApplication(
                              row.typeId,
                              vendor.vendors
                            ).toLowerCase() === "approved"
                              ? classes.approvedChip
                              : getStatusOfApplication(
                                  row.typeId,
                                  vendor.vendors
                                ).toLowerCase() === "rejected"
                              ? classes.rejectedChip
                              : classes.incompleteChip
                          }
                          color={
                            getStatusOfApplication(
                              row.typeId,
                              vendor.vendors
                            ).toLowerCase() === "approved"
                              ? "primary"
                              : getStatusOfApplication(
                                  row.typeId,
                                  vendor.vendors
                                ).toLowerCase() === "rejected"
                              ? "error"
                              : "warning"
                          }
                          size='small'
                          label={getStatusOfApplication(
                            row.typeId,
                            vendor.vendors
                          )}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div style={{ margin: "15px" }}>No applications.</div>
            )}
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Applications;
