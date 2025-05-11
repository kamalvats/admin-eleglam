import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
  Paper,
  FormHelperText,
  Container,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import { putAPIHandlerCall } from "src/ApiConfig/service";
import toast from "react-hot-toast";
import LoadingComp from "src/component/LoadingComp";
import Topheading from "src/component/TopHeading";
import * as yup from "yup";
const useStyles = makeStyles((theme) => ({}));

const EditApiHitrates = ({ location, history }) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const hitrateId = location.state._id;
  const defaultData = location.state.data;

  const initialSchema = {
    perSecond: defaultData ? defaultData?.perSecond : "",
    perMinute: defaultData ? defaultData?.perMinute : "",
    perDay: defaultData ? defaultData?.perDay : "",
  };
  const validationSchema = yup.object().shape({
    perSecond: yup
      .string()
      .required("Per second is required.")
      .min(1, "Per second cannot be empty."),
    perMinute: yup
      .string()
      .required("Per minute is required.")
      .min(1, "Per minute cannot be empty."),
    perDay: yup
      .string()
      .required("Per day is required.")
      .min(1, "Per day cannot be empty."),
  });
  const EditData = async (values) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("hitrateId", location?.state?.data._id);
      formData.append("perSecond", values?.perSecond);
      formData.append("perMinute", values?.perMinute);
      formData.append("perDay", values?.perDay);
      const res = await putAPIHandlerCall({
        endPoint: `editHitrates`,
        dataToSend: formData,
      });
      if (res.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(res.data.responseMessage);
        history.goBack();
      } else {
        toast.error(res.data.responseMessage);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating ApiHitrates:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box className="tophead">
        <Topheading heading="API Hitrates" searchname="Search here..." />
      </Box>
      <Container maxWidth="sm">
        <Paper elevation={2}>
          <Formik
            initialValues={initialSchema}
            validationSchema={validationSchema}
            onSubmit={(values) => EditData(values)}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} align="left">
                    <Box align="left" className="formBox">
                      <Grid container spacing={1}>
                        <Grid item xs={12} sm={12}>
                          <Box mt={2} mb={1}>
                            <Typography variant="h5">Per Second</Typography>
                          </Box>

                          <TextField
                            variant="outlined"
                            placeholder="Enter perSecond"
                            fullWidth
                            name="perSecond"
                            value={values.perSecond}
                            error={Boolean(
                              touched.perSecond && errors.perSecond
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error className={classes.helperText}>
                            {touched.perSecond && errors.perSecond}
                          </FormHelperText>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <Box mt={2} mb={1}>
                            <Typography variant="h5">Per Minute</Typography>
                          </Box>

                          <TextField
                            maxWidth
                            variant="outlined"
                            placeholder="Enter perMinute"
                            fullWidth
                            name="perMinute"
                            value={values.perMinute}
                            error={Boolean(
                              touched.perMinute && errors.perMinute
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error className={classes.helperText}>
                            {touched.perMinute && errors.perMinute}
                          </FormHelperText>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <Box mt={2} mb={1}>
                            <Typography variant="h5">Per Day</Typography>
                          </Box>
                          <TextField
                            variant="outlined"
                            placeholder="Enter perDay"
                            fullWidth
                            name="perDay"
                            value={values.perDay}
                            error={Boolean(touched.perDay && errors.perDay)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <FormHelperText error className={classes.helperText}>
                            {touched.perDay && errors.perDay}
                          </FormHelperText>
                        </Grid>

                        <Grid item xs={12}>
                          <Box className="displayCenter" mt={4}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                history.goBack();
                              }}
                            >
                              Cancel
                            </Button>
                            &nbsp; &nbsp;
                            <Button
                              variant="contained"
                              color="secondary"
                              type="submit"
                              disabled={isLoading}
                              onClick={() => {
                                EditData(values);
                              }}
                            >
                              Update
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}></Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
      {isLoading && <LoadingComp />}
    </Box>
  );
};

export default EditApiHitrates;
