import React, { useContext } from "react";
import { Typography, Link } from "@material-ui/core";
import useStyles from "./MainStyles";
import { Divider } from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import { UserContext } from "../../Context/UserContext";
import ViewListIcon from "@material-ui/icons/ViewList";
import { useDispatch } from "react-redux";
import AddNewCompany from "./AddNewCompany";
import { useHistory } from "react-router-dom";
import { getLinkStyle } from "../../Helpers/DashboardHelper";

export default function MainVendorProfile() {
  const classes = useStyles();
  const { user, activeCompany } = useContext(UserContext);
  const dispatch = useDispatch();
  const history = useHistory();
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#00800059",
      color: theme.palette.common.black,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  const handleCompanyChange = (e, company) => {
    if (company.status === "approved") {
      dispatch({ type: "CHANGE_COMPANY", payload: company });
      history.push("/home");
    }
  };
  return (
    <div className={classes.title}>
      <Typography variant='h6' color='primary' component='h2'>
        Vendor Profile(s) (ID : 254851)
      </Typography>

      <Divider light />
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Profile No</StyledTableCell>

              <StyledTableCell align='center'>Company Name</StyledTableCell>
              <StyledTableCell align='center'>
                Comapany License No.
              </StyledTableCell>
              <StyledTableCell align='center'>Status</StyledTableCell>
              <StyledTableCell align='center'>
                Percentage of completion
              </StyledTableCell>
              <StyledTableCell align='center'>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.companyDetail.map((company, index) => {
              return (
                <TableRow key={company._id}>
                  <TableCell component='th' scope='row'>
                    {index + 1}
                  </TableCell>

                  <TableCell align='center' component='th' scope='row'>
                    <Link
                      style={getLinkStyle(company)}
                      onClick={(e) => handleCompanyChange(e, company)}
                    >
                      {company.companyName[0]}
                    </Link>
                  </TableCell>
                  <TableCell
                    align='center'
                    component='th'
                    scope='row'
                    style={getLinkStyle(company)}
                  >
                    {company.licenseNo[0]}
                  </TableCell>
                  <TableCell
                    align='center'
                    component='th'
                    scope='row'
                    style={getLinkStyle(company)}
                  >
                    {company.status}
                  </TableCell>
                  <TableCell
                    align='center'
                    component='th'
                    scope='row'
                    style={getLinkStyle(company)}
                  >
                    {company.status !== "approved" ? "--" : "10%"}
                  </TableCell>

                  <TableCell
                    align='center'
                    component='th'
                    scope='row'
                    style={getLinkStyle(company)}
                  >
                    <Link
                      style={getLinkStyle(company)}
                      onClick={(e) => handleCompanyChange(e, company)}
                    >
                      <ViewListIcon size='small' color='primary' />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <AddNewCompany />
      <Typography variant='h6' color='primary' component='h2'>
        Tender(s)
      </Typography>

      <Divider light />
      <br />
      <Typography color='secondary'>You have no available Tenders.</Typography>
    </div>
  );
}
