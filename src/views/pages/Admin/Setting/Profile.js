import {
  Avatar,
  Box,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
  Paper,
  FormHelperText,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import Topheading from "src/component/TopHeading";
import { AuthContext } from "src/context/Auth";
import { FiEdit } from "react-icons/fi";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { putAPIHandlerCall } from "src/ApiConfig/service";
import toast from "react-hot-toast";
import LoadingComp from "src/component/LoadingComp";

const useStyles = makeStyles((theme) => ({
  editprofileBox: {
    position: "relative",
    zIndex: "999",
    "& .displaySpacebetween": {
      paddingBottom: "20px",
    },
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
  imgsection: {
    width: "120px",
    height: "120px",
    borderRadius: "100px",
    background: "#188df2",
    padding: "4px",
  },
  upload: {
    top: "-56px",
    right: "-50px",
    cursor: "pointer",
    position: "relative",
    borderRadius: "50px",
    "& .editicon": {
      "& svg": {
        color: "#fff",
        fontSize: "25px",
        background: "rgb(24 141 242)",
        borderRadius: "100px",
        padding: "10px",
      },
    },
    "& .MuiAvatar-root": {
      background: "transparent",
      cursor: "pointer",
    },
  },
}));

export default function Profile(userData) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [isLoader, setIsLoader] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  const initialValues = {
    name: auth?.userData?.name ? auth?.userData?.name : "",
    profileImage: auth?.userData?.profilePic ? auth?.userData?.profilePic : "",
    profileImage1: "",
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Full name is required.")
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z])?[a-zA-Z]*)*$/g,
        "Please enter a valid name."
      )
      .min(3, "Please enter atleast 3 characters.")
      .max(32, "You can enter only 32 characters."),
  });

  const handleUpdateProfile = async (values) => {
    try {
      setIsLoader(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append(
        "profilePic",
        values.profileImage ? values.profileImage : undefined
      );
      const response = await putAPIHandlerCall({
        endPoint: "editProfile",
        dataToSend: formData,
      });
      if (response?.data?.responseCode === 200) {
        setIsLoader(false);
        toast.success(response?.data?.responseMessage);
        auth.viewUserProfile(localStorage.getItem("token"));
        setEditProfile(false);
      } else {
        setIsLoader(false);
        toast.error(response?.data?.responseMessage);
      }
    } catch (error) {
      toast.error(error?.response?.data?.responseMessage);
      setIsLoader(false);
    }
  };

  return (
    <Box className={classes.profileBox}>
      <Box className="tophead">
        <Topheading heading="My Profile" />
      </Box>
      <Paper elevation={2}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleUpdateProfile(values)}
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
            <Form className="noHeight">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={8} align="left">
                  <Box align="left" className="formBox">
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12}>
                        <Box mt={2} mb={1}>
                          <Typography variant="body2">Name</Typography>
                        </Box>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Please enter name."
                          type="name"
                          name="name"
                          value={values.name}
                          error={Boolean(touched.name && errors.name)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          disabled={isLoader || !editProfile}
                        />
                        <FormHelperText error>
                          {touched.name && errors.name}
                        </FormHelperText>
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Box>
                          <Box mt={2} mb={1}>
                            <Typography variant="body2">Email</Typography>
                          </Box>
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Please enter email."
                            disabled
                            value={auth?.userData?.email}
                          />
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <Box className="displayStart" my={2}>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setEditProfile(!editProfile)}
                          >
                            {!editProfile ? "Edit Profile" : "Cancel"}
                          </Button>
                          &nbsp;&nbsp;
                          {editProfile && (
                            <Button
                              variant="contained"
                              color="secondary"
                              type="submit"
                            >
                              Update Profile
                            </Button>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box className="displayCenter">
                    <Box>
                      <Box className={classes.profile}>
                        <figure className="figure">
                          <Avatar
                            className={classes.imgsection}
                            src={
                              values.profileImage1
                                ? URL.createObjectURL(values.profileImage1)
                                : values.profileImage || "images/profile.png"
                            }
                          />
                        </figure>
                      </Box>
                      {editProfile && (
                        <>
                          <input
                            style={{ display: "none" }}
                            id="raised-button-file"
                            type="file"
                            accept="image/*"
                            name="profileImage"
                            onChange={(e) => {
                              setFieldValue("profileImage", e.target.files[0]);
                              setFieldValue("profileImage1", e.target.files[0]);
                            }}
                          />
                          <Box display="flex" justifyContent="center">
                            <Box className={classes.upload}>
                              <Box className="iconimg">
                                <label htmlFor="raised-button-file">
                                  <Avatar className="editicon">
                                    <FiEdit />
                                  </Avatar>
                                </label>
                              </Box>
                            </Box>
                          </Box>
                        </>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      {isLoader && <LoadingComp />}
    </Box>
  );
}
