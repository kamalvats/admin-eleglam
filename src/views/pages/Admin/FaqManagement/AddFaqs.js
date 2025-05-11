import {
  Box,
  Grid,
  makeStyles,
  Typography,
  TextField,
  Button,
  Paper,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import JoditEditor from "jodit-react";
import Topheading from "src/component/TopHeading";
import * as yep from "yup";
import { Form, Formik } from "formik";
import { postAPIHandler, putAPIHandlerCall } from "src/ApiConfig/service";
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
      color: "#ffffff8c",
    },
  },
  imgsection: {
    height: "150px",
    width: "150px",
    borderRadius: "100px",
  },
  upload: {
    top: "-37px",
    right: "-50px",
    cursor: "pointer",
    position: "relative",
    borderRadius: "50px",
    "& .editicon": {
      "& svg": {
        color: "rgba(255, 255, 255, 0.6)",
        fontSize: "27px",
      },
    },
    "& .MuiAvatar-root": {
      background: "transparent",
      cursor: "pointer",
    },
  },
}));

export default function AddFaqs() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const editor = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSumbit, setIsSumbit] = useState(false);

  const initialSchema = {
    question: location?.state?.editFaq
      ? location?.state?.question
      : location?.state?.title || "",
    answer: location?.state?.editFaq
      ? location?.state?.answer
      : location?.state?.description || "",
  };

  const formValidationSchema = yep.object().shape({
    question: yep
      .string()
      .required("Question is required.")
      .min(3, "Should be 3 character long.")
      .max(256, "You can enter only 256 characters."),
    answer: yep
      .string()
      .required("Answer is required.")
      .min(3, "Should be 3 character long."),
  });

  const AddfaqHandler = async (values) => {
    try {
      setIsSumbit(true);
      setIsSumbit(false);
      setIsLoading(true);
      const editId = location?.state?.editFaq
        ? { faqId: location?.state?._id }
        : location?.state?.viewStatic
        ? { staticId: location?.state?._id }
        : {};

      const checkData = location?.state?.viewStatic
        ? {
            title: values.question ? values.question : undefined,
            description: values.answer,
          }
        : {
            question: values.question ? values.question : undefined,
            answer: values.answer,
          };

      const res = await putAPIHandlerCall({
        endPoint: location?.state?.editFaq
          ? "updateFaq"
          : location?.state?.viewStatic
          ? "addUpdateStaticContent"
          : "addFAQ",
        dataToSend: {
          ...editId,
          ...checkData,
        },
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
      console.log(error);
      setIsLoading(false);
    }
  };
  const buttonText = location?.state?.editFaq ? "Update" : "Add";

  return (
    <Box className={classes.viewcontentBox}>
      <Topheading
        heading={
          location?.state?.editFaq
            ? "Edit FAQ"
            : location?.state?.viewStatic
            ? `Edit ${location?.state?.title}`
            : "Add FAQ"
        }
      />
      <Paper elevation={2}>
        <Formik
          initialValues={initialSchema}
          validationSchema={formValidationSchema}
          initialStatus={{
            success: false,
            successMsg: "",
          }}
          onSubmit={(values) => AddfaqHandler(values)}
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box mt={1} mb={1}>
                    <Typography variant="body2">Title</Typography>
                  </Box>

                  <FormControl fullWidth className="formControl">
                    <TextField
                      variant="outlined"
                      placeholder="Enter title"
                      fullWidth
                      name="question"
                      value={values.question}
                      disabled={isLoading || location?.state?.viewStatic}
                      error={Boolean(touched.question && errors.question)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error className={classes.helperText}>
                      {touched.question && errors.question}
                    </FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Box mt={1} mb={1}>
                    <Typography variant="body2">Answer</Typography>
                  </Box>

                  <FormControl
                    fullWidth
                    className="formControl"
                    style={{ color: "#000" }}
                  >
                    <JoditEditor
                      // ref={editor}
                      value={values.answer}
                      name="answer"
                      // config={{ readonly: false }}
                      tabIndex={1}
                      onBlur={(e) => setFieldValue("answer", e)}
                      variant="outlined"
                      fullWidth
                      disabled={isLoading}
                      contentStyle={{ color: "black" }}
                    />
                    <FormHelperText error className={classes.helperText}>
                      {touched.answer && errors.answer}
                    </FormHelperText>
                  </FormControl>
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
                    >
                      {buttonText}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
      {isLoading && <LoadingComp />}
    </Box>
  );
}
