import { Container, Grid } from "@material-ui/core";
import React from "react";
import useStyles from './profileStyles';

const Profile = () => {
    const classes = useStyles()
  return (
    <Container className={classes.profileContainer}>
      <Grid container>
        <Grid item lg={8}>
            Company Info
        </Grid>
        <Grid item lg={4}>
            Personal Info
        </Grid>
      </Grid>
    </Container>
  );
};
export default Profile;