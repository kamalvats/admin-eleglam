import React, { useContext, useState } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Paper,
  Button,
  FormControl,
  Grid,
  TextField,
  FormHelperText,
  Container,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { postAPIHandler } from "src/ApiConfig/service";
import LoadingComp from "src/component/LoadingComp";
import { AuthContext } from "src/context/Auth";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  flexBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerBox: {
    width: "100%",
    maxWidth: "620px",
  },

  mintedBox: {
    padding: "20px",
    "& h6": {
      fontWeight: "300",
      fontSize: "35px",
      lineHeight: "130%",
    },
    "& p": {
      color: "#262424",
      marginTop: "8px",
      marginBottom: "8px",
      fontWeight: 300,
    },
    "& .formControl": {
      marginTop: "8px",
      marginBottom: "8px",
    },
  },
  typoBox: {
    "& p": {
      color: "#262424",
      marginTop: "8px",
      marginBottom: "8px",
    },
  },
}));

export default function Forgot() {
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const initialFormValues = {
    email: "",
  };

  const validationFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .max(256, "Email should not exceed 256 characters.")
      .required("Email is required."),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await postAPIHandler({
        endPoint: "forgotPassword",
        dataToSend: {
          email: values.email,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.responseMessage);
        localStorage.removeItem("otpTimer");
        auth.setEndtime(moment().add(3, "m").unix());
        history.push({
          pathname: "/verify-otp",
          state: values.email,
        });
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error");
      toast.error(error.response.data.responseMessage);
    }
  };

  return (
    <Box className={classes.bannerBox}>
      <Container>
        <Paper elevation={2} style={{ padding: "28px 28px" }}>
          <Box className="displayCenter" mb={1}>
            <Typography variant="h2">Forgot Password </Typography>
          </Box>
          <Box textAlign={"center"} mb={3}>
            <Typography variant="body2" color="secondary">
              Please enter your registered email here and we will send OTP to
              reset your password.
            </Typography>
          </Box>
          <Formik
            initialValues={initialFormValues}
            validationSchema={validationFormSchema}
            onSubmit={(values) => handleFormSubmit(values)}
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
                <Typography variant="body2">
                  Email <span style={{ color: "#FD3124" }}>*</span>
                </Typography>
                <FormControl fullWidth className="formControl">
                  <TextField
                    placeholder="Please enter email."
                    fullWidth
                    id="standard-basic4139"
                    type="email"
                    name="email"
                    value={values.email}
                    error={Boolean(touched.email && errors.email)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="off"
                  />

                  <FormHelperText error>
                    {touched.email && errors.email}
                  </FormHelperText>
                </FormControl>

                <Box mb={2} style={{ marginTop: "21px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="transparentbutton"
                    type="submit"
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </Box>

                <Box align="center">
                  <Typography
                    variant="body2"
                    style={{ cursor: "pointer" }}
                    onClick={() => !isLoading && history.push("/")}
                  >
                    <span className="textblueShadow">Back to Login</span>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
      {isLoading && <LoadingComp />}
    </Box>
  );
}
