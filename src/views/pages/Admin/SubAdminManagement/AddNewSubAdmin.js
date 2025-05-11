import Topheading from "src/component/TopHeading";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { postAPIHandler } from "src/ApiConfig/service";
import toast from "react-hot-toast";
import LoadingComp from "src/component/LoadingComp";

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

export default function AddNewSubAdmin() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const menuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    elevation: 0,
    PaperProps: {
      style: {
        top: "0px !important",
        maxHeight: 250,
      },
    },
  };

  const initialValues = {
    ipAddress: "",
    description: "",
  };

  const validationSchema = yup.object().shape({
    ipAddress: yup
      .string()
      .required("IP address is required.")
      .matches(
        /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
        "Please enter valid IP address."
      ),
    description: yup
      .string()
      .required("Description is required.")
      .min(3, "Please enter at least 3 characters.")
      .max(600, "You can enter only 600 characters."),
  });

  const handleSubmitContact = async (values) => {
    try {
      setIsLoading(true);
      const response = await postAPIHandler({
        endPoint: "addWhitelist",
        dataToSend: {
          ipAdress: values.ipAddress,
          description: values.description,
        },
      });
      if (response?.data?.responseCode === 200) {
        toast.success(response?.data?.responseMessage);
        history.push("/order-mangement");
      } else {
        toast.error(response?.data?.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.responseMessage);
    }
  };

  return (
    <Box className={classes.subAdminContatiner}>
      <Topheading heading="Add Whitelist" />
      <Paper elevation={2}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmitContact(values)}
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
                  <Grid item sm={12} lg={12} md={12} xs={12}>
                    <Box>
                      <Typography variant="body2">IP Address : </Typography>

                      <TextField
                     placeholder="E.g., 192.168.0.1"
                        variant="outlined"
                        id="standard-basic153"
                        name="ipAddress"
                        fullWidth
                        value={values.ipAddress}
                        error={Boolean(touched.ipAddress && errors.ipAddress)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={isLoading}
                        autoComplete="nope"
                        inputProps={{
                          autoComplete: "off",
                        }}
                      />
                      <FormHelperText error>
                        {touched.ipAddress && errors.ipAddress}
                      </FormHelperText>
                    </Box>
                  </Grid>
                  <Grid item sm={12} lg={12} md={12} xs={12}>
                    <Typography variant="body2">Description :</Typography>
                    <TextField
                      placeholder="Type Something....."
                      variant="outlined"
                      multiline
                      maxRows={4}
                      fullWidth
                      name="description"
                      value={values.description}
                      error={Boolean(touched.description && errors.description)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    <Box className="displaySpacebetween">
                      <FormHelperText error>
                        {touched.description && errors.description}
                      </FormHelperText>
                      <Typography variant="subtitle1">
                        {values.description.length}/600
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={2} align="center" className="displayCenter">
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
      {isLoading && <LoadingComp />}
    </Box>
  );
}
