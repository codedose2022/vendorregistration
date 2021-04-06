import { Container, Grid, Link, Paper, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./profileStyles";
import BusinessIcon from "@material-ui/icons/Business";

const Profile = (props) => {
  const classes = useStyles();
  return (
    <Container className={classes.profileContainer}>
      <Grid container>
        <Grid item lg={8} xs={12} className={classes.mobMargin}>
          <Paper className={classes.gridMargin}>
            <Grid container>
              <Grid item lg={4} xs={12} className={classes.profileIcon}>
                <BusinessIcon />
              </Grid>
              <Grid item lg={8} xs={12} className={classes.profileContent}>
                <Typography variant='h6' className={classes.upperCase}>
                  {props.content.activeCompany.activeCompany.companyName[0]}
                </Typography>
                <Typography>Address Line 1</Typography>
                <Typography>Address Line 2</Typography>
                <Typography>City</Typography>
                <Typography>State/Province/Emirate</Typography>
                <Typography>Country</Typography>
                <hr />
                <div className={classes.profileLicenseInfo}>
                  <Typography>{props.content.activeCompany.activeCompany.licenseNo[0]}</Typography>
                  <Typography>
                    <Link to='/'>License copy</Link>
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item lg={4} xs={12} className={classes.mobMargin}>
          <Paper className={classes.gridMargin}>
            <Grid container>
              <Grid item lg={12}>
                <div className={classes.personalName}>
                  <Typography variant='h6' className={`${classes.upperCase}`}>
                    {props.content.user.fName[0] + " " + props.content.user.lName[0]}
                  </Typography>
                </div>
                <div className={classes.personalInfo}>
                  <Typography>{props.content.user.designation[0]}</Typography>
                  <Typography>{props.content.user.email[0]}</Typography>
                  <Typography>{props.content.user.mobNo[0]}</Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Profile;
