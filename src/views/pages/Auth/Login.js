import React, { useState, useContext, useEffect } from "react";
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
  Checkbox,
  FormHelperText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { BsEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { postAPIHandler } from "src/ApiConfig/service";
import toast from "react-hot-toast";
import { AuthContext } from "src/context/Auth";
import LoadingComp from "src/component/LoadingComp";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  loginmainBox: {
    width: "100%",
    maxWidth: "620px",
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#35a5f6",
      padding: "0px",
      marginRight: "8px",
    },
    "& .MuiCheckbox-root": {
      padding: "0px",
      marginRight: "8px",
    },
    "& .MuiTypography-h2": {
      fontSize: "40px",
    },
  },
  modalText: {
    "& .MuiDialogTitle-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 17px",
    },
    "& .MuiDialogActions-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      marginTop: "30px",
    },
    "& h6": {
      width: "100%",
      maxWidth: "427px",
      margin: "0 auto",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const loginDataParse = window.localStorage.getItem("loginData");
  const [showPassword, setShowPassword] = useState(false);
  const [isRemember, setIsRemember] = useState(loginDataParse ? true : false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const initialFormValues = {
    email: loginDataParse ? JSON.parse(loginDataParse).email : "",
    password: loginDataParse ? JSON.parse(loginDataParse).password : "",
  };

  const validationFormSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .max(256, "Email should not exceed 256 characters.")
      .required("Email is required."),

    password: yup
      .string()
      .trim()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must be 8-16 characters long with at least one lowercase letter, one uppercase letter, one digit, and one special character."
      )
      .required("Password is required.")
      .max(16, "Password should not exceed 16 characters.")
      .min(8, "Password must be a minimum of 8 characters."),
  });

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await postAPIHandler({
        endPoint: "adminLogin",
        dataToSend: {
          email: values.email,
          password: values.password,
        },
      });
      if (response.status === 200) {
        const rememberValue = JSON.stringify(values);
        isRemember && window.localStorage.setItem("loginData", rememberValue);
        !isRemember && window.localStorage.removeItem("loginData");
        localStorage.setItem("token", response.data.result.token);
        auth.userLogIn(true, response.data.result.token);
        toast.success(response.data.responseMessage);
        history.push("/dashboard");
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
    if (auth?.userLoggedIn) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <Box className={classes.loginmainBox}>
      <Container>
        <Paper elevation={2} style={{ padding: "20px 28px" }}>
          <Box className="displayCenter" mb={1}>
            <Typography variant="h2">Admin Login</Typography>
          </Box>
          <Box textAlign={"center"} mb={3}>
            <Typography variant="body2" color="secondary">
              Please enter your registered email and password to login.
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
              <Form autoComplete="off">
                <Typography variant="body2">
                  Email <span style={{ color: "#FD3124" }}>*</span>
                </Typography>
                <TextField
                  id="standard-basic13"
                  type="email"
                  name="email"
                  placeholder="Enter your email address."
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={isLoading}
                  fullWidth
                  autoComplete="nope"
                  inputProps={{
                    autoComplete: "off",
                  }}
                />
                <FormHelperText error>
                  {touched.email && errors.email}
                </FormHelperText>
                <Box mt={3}>
                  <Typography variant="body2">
                    Password <span style={{ color: "#FD3124" }}>*</span>
                  </Typography>

                  <TextField
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password."
                    fullWidth
                    value={values.password}
                    error={Boolean(touched.password && errors.password)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    disabled={isLoading}
                    autoComplete="nope"
                    InputProps={{
                      autoComplete: "off",
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
                </Box>

                <Box className="displaySpacebetween" mt={2}>
                  <Box
                    className="displayCenter"
                    onClick={() => !isLoading && setIsRemember(!isRemember)}
                  >
                    <Box>
                      <Checkbox checked={isRemember} />
                    </Box>
                    <Box>
                      <Typography variant="body2">Remember me</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      style={{ cursor: "pointer" }}
                      onClick={() => !isLoading && history.push("/forget")}
                    >
                      <span className="textblueShadow">Forgot Password ?</span>
                    </Typography>
                  </Box>
                </Box>
                <Box mt={3} align="center" mb={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="transparentbutton"
                    type="submit"
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
      {isLoading && <LoadingComp />}
      <div>
        {auth?.userLoggedIn && (
          <>
            <Dialog
              maxWidth="xs"
              fullWidth
              open={auth?.userLoggedIn}
              keepMounted
              className={classes.modalText}
            >
              <DialogTitle>
                <Typography variant="h4">Log Out</Typography>
                <Box
                  handleClose={() => setIsLogout(false)}
                  color="primary"
                  style={{
                    height: "0px",
                    position: "absolute",
                    right: "10px",
                    top: "4px",
                    cursor: "pointer",
                  }}
                >
                  <ClearIcon style={{ color: "rgba(8, 5, 21, 0.6)" }} />
                </Box>
              </DialogTitle>
              <Box>
                <Divider />
              </Box>
              <DialogContent>
                <Typography variant="h6" color="secondary" align="center">
                  Are you sure you want to logout? This action will end your
                  current session.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="secondary"
                  handleClose={() => setIsLogout(false)}

                  onClick={() => history.push("/dashboard")}
                >
                  Cancel
                </Button>
                &nbsp; &nbsp;
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    toast.success("You have been logout successfully!");
                    window.localStorage.removeItem("token");
                    history.push("/");
                    auth.userLogIn(false, null);
                    setIsLogout(false);
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            {isLoading1 && <LoadingComp />}
          </>
        )}
      </div>
    </Box>
  );
}
