import React, { useState, useEffect } from "react";
import {
  Box,
  makeStyles,
  Typography,
  Paper,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import SuccessfullModal from "src/component/SuccessfullModal";
import toast from "react-hot-toast";
import LoadingComp from "src/component/LoadingComp";
import { useLocation } from "react-router-dom";
import ApiConfig from "src/ApiConfig/ApiConfig";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  resetBox: {
    width: "100%",
    maxWidth: "620px",
    "& .subBox": {
      width: "100%",
      maxWidth: "441px",
      margin: "0 auto",
      paddingBottom: "24px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
    },
  },
}));

export default function Forgot() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConFiPassword, setShowConFiPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialFormValues = {
    password: "",
    confirmPassword: "",
  };

  const validationFormSchema = yup.object().shape({
    password: yup
      .string()
      .trim()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be at least 8 characters and include at least one letter, one number, and one special character."
      )
      .required("Please enter a new password.")
      .min(8, "The new password must be at least 8 characters long.")
      .max(20, "The new password cannot exceed 20 characters."),

    confirmPassword: yup
      .string()
      .required("Please enter the confirm password.")
      .oneOf([yup.ref("password"), null], "Passwords must match."),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await axios({
        url: ApiConfig.resetPassword,
        method: "POST",
        headers: {
          token: location?.state,
        },
        data: {
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.responseMessage);
        setOpenModal(true);
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

  useEffect(() => {
    const unblock = history.block((location, action) => {
      if (action === "POP" && location.pathname === "/verify-otp") {
        history.push("/");
        return false;
      }
      return true;
    });

    return () => unblock();
  }, [history]);

  return (
    <Box className={classes.resetBox}>
      <Container>
        <Paper elevation={2} style={{ padding: "20px 28px" }}>
          <Box className="displayCenter" mb={1}>
            <Typography variant="h2">Reset Password</Typography>
          </Box>
          <Box textAlign={"center"} className="subBox">
            <Typography variant="body2" color="secondary">
              Please enter a new password and confirm password below to reset
              your account password.
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
                  New password
                  <span style={{ color: "#FD3124" }}>*</span>
                </Typography>
                <TextField
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Please enter new password."
                  fullWidth
                  value={values.password}
                  error={Boolean(touched.password && errors.password)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        style={{ padding: "0px" }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <BsEyeFill
                            style={{
                              color: "rgba(38, 36, 36, 0.87)",
                              fontSize: "20px",
                            }}
                          />
                        ) : (
                          <BsFillEyeSlashFill
                            style={{
                              color: "rgba(38, 36, 36, 0.87)",
                              fontSize: "20px",
                            }}
                          />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                <FormHelperText error>
                  {touched.password && errors.password}
                </FormHelperText>
                <Box mt={3}>
                  <Typography variant="body2">
                    Confirm Password <span style={{ color: "#FD3124" }}>*</span>
                  </Typography>
                  <TextField
                    type={showConFiPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Please enter confirm password."
                    fullWidth
                    value={values.confirmPassword}
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isLoading}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          style={{ padding: "0px" }}
                          onClick={() =>
                            setShowConFiPassword(!showConFiPassword)
                          }
                        >
                          {showConFiPassword ? (
                            <BsEyeFill
                              style={{
                                color: "rgba(38, 36, 36, 0.87)",
                                fontSize: "20px",
                              }}
                            />
                          ) : (
                            <BsFillEyeSlashFill
                              style={{
                                color: "rgba(38, 36, 36, 0.87)",
                                fontSize: "20px",
                              }}
                            />
                          )}
                        </IconButton>
                      ),
                    }}
                  />
                  <FormHelperText error>
                    {touched.confirmPassword && errors.confirmPassword}
                  </FormHelperText>
                </Box>

                <Box mt={2} mb={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    className="transparentbutton"
                    disabled={isLoading}
                  >
                    Submit
                  </Button>
                </Box>
                <Box
                  align="center"
                  onClick={() => !isLoading && history.push("/")}
                >
                  <Typography variant="body2" style={{ cursor: "pointer" }}>
                    <span className="textblueShadow">Back to Login</span>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
      <SuccessfullModal openModal={openModal} setOpenModal={setOpenModal} />
      {isLoading && <LoadingComp />}
    </Box>
  );
}
