import {
  Box,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  FormHelperText,
  Container,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Topheading from "src/component/TopHeading";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { patchAPIHandler } from "src/ApiConfig/service";
import toast from "react-hot-toast";
import { AuthContext } from "src/context/Auth";
import { Formik, Form } from "formik";
import * as yup from "yup";
import LoadingComp from "src/component/LoadingComp";

const useStyles = makeStyles((theme) => ({
  changeprofileBox: {
    position: "relative",
    zIndex: "999",
    "& .formBox": {
      maxWidth: "650px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
    },
    "& p": {
      textAlign: "left",
      color: "rgba(38, 36, 36, 0.87)",
    },
  },
}));

export default function ChangeProfile(userData) {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    password: false,
    confirmPass: false,
  });

  const initialValues = {
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .trim()
      .required("Please enter old password.")
      .min(6, "Please enter at least 6 characters.")
      .max(18, "You can enter up to 18 characters."),
    password: yup
      .string()
      .trim()
      .notOneOf(
        [yup.ref("oldPassword"), null],
        "Password cannot be the same as old password."
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?])[a-zA-Z\d!@#$%^&*()\-_=+{}[\]|;:'",.<>/?]{8,}$/,
        "Password must contain 8 characters, one uppercase, one lowercase, one number, and one special character."
      )
      .required("Please enter password.")
      .min(6, "Please enter at least 6 characters.")
      .max(18, "You can enter up to 18 characters."),
    confirmPassword: yup
      .string()
      .required("Please enter confirm password.")
      .oneOf([yup.ref("password"), null], "Passwords must match."),
  });

  const handleUpdatePassword = async (values) => {
    try {
      setIsLoading(true);
      const response = await patchAPIHandler({
        endPoint: "changePassword",
        paramsData: {
          oldPassword: values.oldPassword,
          newPassword: values.confirmPassword,
        },
      });
      if (response?.status === 200) {
        toast.success(response?.data?.responseMessage);
        auth.userLogIn(false, null);
        window.localStorage.removeItem("token");
        history.push("/");
      } else {
        toast.error(response?.data?.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.responseMessage);
    }
  };

  return (
    <Box className={classes.changeprofileBox}>
      <Box className="tophead">
        <Topheading heading=" Change Password" />
      </Box>
      <Container maxWidth="sm">
        <Paper elevation={2}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleUpdatePassword(values)}
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
                <Box align="left" className="formBox">
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12}>
                      <Box mt={2} mb={1}>
                        <Typography variant="body2" color="primary">
                          Old Password
                        </Typography>
                      </Box>
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter old password"
                        type={showPassword.oldPassword ? "text" : "password"}
                        name="oldPassword"
                        value={values.oldPassword}
                        error={Boolean(
                          touched.oldPassword && errors.oldPassword
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={isLoading}
                        InputProps={{
                          endAdornment: (
                            <IconButton
                              style={{ padding: "0px" }}
                              onClick={() =>
                                setShowPassword({
                                  ...showPassword,
                                  oldPassword: !showPassword.oldPassword,
                                })
                              }
                            >
                              {showPassword.oldPassword ? (
                                <BsEyeFill style={{ color: "9e9d9d" }} />
                              ) : (
                                <BsFillEyeSlashFill
                                  style={{ color: "9e9d9d" }}
                                />
                              )}
                            </IconButton>
                          ),
                        }}
                      />
                      <FormHelperText error>
                        {touched.oldPassword && errors.oldPassword}
                      </FormHelperText>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Box>
                        <Box mt={2} mb={1}>
                          <Typography variant="body2" color="primary">
                            New Password
                          </Typography>
                        </Box>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Enter new password"
                          type={showPassword.password ? "text" : "password"}
                          name="password"
                          value={values.password}
                          error={Boolean(touched.password && errors.password)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isLoading}
                          InputProps={{
                            endAdornment: (
                              <IconButton
                                style={{ padding: "0px" }}
                                onClick={() =>
                                  setShowPassword({
                                    ...showPassword,
                                    password: !showPassword.password,
                                  })
                                }
                              >
                                {showPassword.password ? (
                                  <BsEyeFill style={{ color: "9e9d9d" }} />
                                ) : (
                                  <BsFillEyeSlashFill
                                    style={{ color: "9e9d9d" }}
                                  />
                                )}
                              </IconButton>
                            ),
                          }}
                        />
                        <FormHelperText error>
                          {touched.password && errors.password}
                        </FormHelperText>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Box>
                        <Box mt={2} mb={1}>
                          <Typography variant="body2" color="primary">
                            Confirm Password
                          </Typography>
                        </Box>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Enter confirm password"
                          type={showPassword.confirmPass ? "text" : "password"}
                          name="confirmPassword"
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
                                  setShowPassword({
                                    ...showPassword,
                                    confirmPass: !showPassword.confirmPass,
                                  })
                                }
                              >
                                {showPassword.confirmPass ? (
                                  <BsEyeFill style={{ color: "9e9d9d" }} />
                                ) : (
                                  <BsFillEyeSlashFill
                                    style={{ color: "9e9d9d" }}
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
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <Box className="displayCenter" mt={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => history.goBack()}
                          disabled={isLoading}
                        >
                          Cancel
                        </Button>
                        &nbsp; &nbsp;
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          disabled={isLoading}
                        >
                          Update Password
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
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
