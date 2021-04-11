import {
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Select } from "formik-material-ui";
import * as Yup from "yup";
import React from "react";
import Certifications from "../../../Constants/Certifications";
const Cert = () => {
  return (
    <Paper>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Formik
          initialValues={{
            flag: "",
          }}
          validationSchema={Yup.object().shape({
            flag: Yup.string(),
          })}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 4))
          }}
        >
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              {Certifications.map((certificate, index) => (
                <Grid container fullWidth key={index}>
                  <Grid item lg={6}>
                    <Typography>{certificate}</Typography>
                  </Grid>

                  <Grid item lg={2}>
                    <Field component={Select} name={`flag${index}`}>
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item lg={4}>
                    dd
                  </Grid>
                </Grid>
              ))}
              <pre>{JSON.stringify(formikProps.values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </Container>

      <Grid container>
        <Grid item xs={12}>
          <Button type="submit">submit</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Cert;
