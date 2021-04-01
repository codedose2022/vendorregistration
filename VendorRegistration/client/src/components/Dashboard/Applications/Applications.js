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

const Applications = () => {
  const classes = useStyles();
  const applications = [
    {
      slno: 1,
      description: "New vendor registration",
      date: "31/03/2021",
      status: "Incomplete",
    },
    {
      slno: 2,
      description: "Amendment",
      date: "20/03/2021",
      status: "Approved",
    },
    {
      slno: 3,
      description: "Amendment",
      date: "20/03/2021",
      status: "Rejected",
    },
  ];

  const handleStatusClick = () => {};
  return (
    <Container className={classes.applicationContainer}>
      <Grid container>
        <Grid item xs={12} lg={12}>
        <TableContainer component={Paper}>
            <Table className={classes.applicationTable}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Sl.No.</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Date &amp; Time</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((row) => (
                  <TableRow key={row.slno}>
                    <TableCell component="th" scope="row">
                      {row.slno}
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">
                      <Chip
                        className={
                          row.status.toLowerCase() === "approved"
                            ? classes.approvedChip
                            : row.status.toLowerCase() === "rejected"
                            ? classes.rejectedChip
                            : classes.incompleteChip
                        }
                        color={
                          row.status.toLowerCase() === "approved"
                            ? "primary"
                            : row.status.toLowerCase() === "rejected"
                            ? "error"
                            : "warning"
                        }
                        size="small"
                        label={row.status}
                        onClick={handleStatusClick}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Applications;
