import Topheading from "src/component/TopHeading";
import {
  Box,
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
const useStyles = makeStyles(() => ({
  subAdminContatiner: {
    "& p": {
      "& span": {
        color: "#FF4700",
      },
    },
    "& .MuiOutlinedInput-inputMultiline": {
      height: "100px !important",
      overflow: "visible !important",
      borderRadius: "0px !important",
    },
  },
}));

const initialFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "",
  Gender: "",
};
const validationFormSchema = yup.object().shape({
  lastName: yup.string().required("Last Name is required"),
  firstName: yup.string().required("First Name is required"),
  phoneNo: yup.string().required("Mobile Number is required"),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
      "You have entered an invalid email address. Please try again"
    ),
  Gender: yup.string().required("Please select Gender"),
});
export default function AddFaq() {
  const classes = useStyles();
  const [age, setAge] = React.useState(10);
  const [phone, setPhone] = useState();
  const history = useHistory();
  const [countryCode, setCountryCode] = useState("");
  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };
  const loginSubmit = async (values) => {};
  return (
    <Box className={classes.subAdminContatiner}>
      <Topheading heading="Add FAQ" />
      <Paper elevation={2}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationFormSchema}
          onSubmit={loginSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue,
          }) => (
            <Form>
              <Box>
                <Grid container spacing={3}>
                  <Grid item sm={6} lg={6} md={6} xs={12}>
                    <Box>
                      <Typography variant="body2">Enter the question</Typography>

                      <TextField
                        placeholder="Enter the question"
                        variant="outlined"
                        name="firstName"
                        fullWidth
                        value={values.firstName}
                        error={Boolean(touched.firstName && errors.firstName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.firstName && errors.firstName}
                      </FormHelperText>
                    </Box>
                    <Box mt={3}>
                      <Typography variant="body2">Enter the answer</Typography>

                      <TextField
                        placeholder="Enter the answer"
                        variant="outlined"
                        multiline
                        maxRows={4}
                        fullWidth
                        value={values.lastName}
                        error={Boolean(touched.lastName && errors.lastName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <FormHelperText error>
                        {touched.lastName && errors.lastName}
                      </FormHelperText>
                    </Box>
                  </Grid>
               
                </Grid>
              </Box>

              <Box mt={2} align="left" className="displayStart">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.goBack()}
                >
                  Back
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button variant="contained" type="submit" color="secondary">
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
