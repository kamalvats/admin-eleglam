import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import LoadingComp from "./LoadingComp";
import { Form, Formik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles(() => ({
  IconBox: {
    "& .MuiOutlinedInput-root": {
      textAlign: "start",
    },
    "& .MuiSelect-outlined": {
      textAlign: "start",
    },
    "& .MuiPopover-paper": {
      boxShadow:
        "0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)",
      filter: "drop-shadow(0px 10px 40px rgba(142, 182, 210, 0.40))",
    },
  },
  IconBox: {
    position: "absolute",
    right: "0",
  },
  buttnBox: {
    "& button": {},
  },
  gridBox: {
    gap: "10px",
  },
}));
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
export default function AddNftAdinfluencer({
  openModal,
  handleClose,
  heading,
  type,
  isLoading,
  handleUpdateProfile,
  editCategory,
}) {
  const classes = useStyles();

  const initialValues = {
    categoryName: editCategory?.editData
      ? editCategory?.editData?.categoryTitle ||
        editCategory?.editData?.influencerCategoryTitle
      : "",
    profileImage: editCategory?.editData?.categoryIcon
      ? editCategory?.editData?.categoryIcon
      : "",
    description: editCategory?.editData?.influencerCategoryDescription
      ? editCategory?.editData?.influencerCategoryDescription
      : "",
    profileImage1: "",
  };

  const validationSchema = yup.object().shape({
    categoryName: yup
      .string()
      .required("Category name is required.")
      .min(3, "Please enter atleast 3 characters.")
      .max(32, "You can enter only 32 characters."),
    description:
      type !== "NFT" &&
      yup
        .string()
        .required("Description is required.")
        .min(3, "Please enter atleast 3 characters.")
        .max(256, "You can enter only 256 characters."),
    profileImage: type === "NFT" && yup.string().required("Image is required."),
  });

  return (
    <Box>
      <Dialog
        maxWidth="xs"
        fullWidth
        className={classes.dailogOpen}
        open={openModal}
        keepMounted
        onClose={() => !isLoading && handleClose()}
      >
        <Box className={classes.IconBox}>
          <IconButton disabled={isLoading} onClick={() => handleClose()}>
            <RxCross2 />
          </IconButton>
        </Box>
        <Box className="newModalBorder1">
          <DialogContent>
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
                  <Box className={classes.dialougTitle}>
                    <Typography variant="h4">{heading}</Typography>
                    {type == "NFT" && (
                      <Box>
                        <Grid container spacing={4}>
                          <Grid item xs={4}>
                            <Box
                              style={{
                                borderRadius: "50%",
                                border: "1px solid #000",
                                width: "100px",
                                height: "100px",
                                backgroundImage: `url(${
                                  values.profileImage1
                                    ? URL.createObjectURL(values.profileImage1)
                                    : values.profileImage ||
                                      "images/profile.png"
                                })`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            ></Box>
                          </Grid>
                          <Grid item xs={8}>
                            <Box className={classes.gridBox}>
                              <Typography variant="body2">
                                We recommend an image of at least 400x400.
                              </Typography>
                              <Typography variant="body2">
                                Select Category Image
                              </Typography>

                              <div>
                                <input
                                  style={{ display: "none" }}
                                  id="raised-button-file"
                                  type="file"
                                  accept="image/*"
                                  name="profileImage"
                                  onChange={(e) => {
                                    setFieldValue(
                                      "profileImage",
                                      e.target.files[0]
                                    );
                                    setFieldValue(
                                      "profileImage1",
                                      e.target.files[0]
                                    );
                                  }}
                                />
                                <Button
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                >
                                  <label htmlFor="raised-button-file">
                                    Choose File
                                  </label>
                                </Button>
                              </div>
                              <FormHelperText error>
                                {touched.profileImage && errors.profileImage}
                              </FormHelperText>
                            </Box>
                          </Grid>
                          <GridField
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                          />
                        </Grid>
                      </Box>
                    )}
                    {type == "Influencer" && (
                      <Box>
                        <Grid container spacing={4}>
                          <GridField
                            values={values}
                            touched={touched}
                            errors={errors}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                          />
                          <Grid item xs={12}>
                            <Typography variant="h6">Description</Typography>
                            <TextField
                              placeholder="Enter description ...."
                              variant="outlined"
                              name="description"
                              fullWidth
                              multiline
                              rows={5}
                              aria-label="maximum height"
                              value={values.description}
                              error={Boolean(
                                touched.description && errors.description
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <Box className="displaySpacebetween">
                              <FormHelperText error>
                                {touched.description && errors.description}
                              </FormHelperText>
                              <Typography>{`${values.description.length}/256`}</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    )}
                  </Box>
                  <DialogActions>
                    <Box mt={0} mb={2} className={classes.buttnBox}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        type="submit"
                        disabled={isLoading}
                      >
                        Submit
                      </Button>
                    </Box>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Box>
      </Dialog>
      {isLoading && <LoadingComp />}
    </Box>
  );
}

const GridField = ({ values, touched, errors, handleBlur, handleChange }) => (
  <Grid item xs={12}>
    <Typography variant="h6">Category name *</Typography>
    <TextField
      placeholder="Enter category name"
      variant="outlined"
      name="categoryName"
      fullWidth
      value={values.categoryName}
      error={Boolean(touched.categoryName && errors.categoryName)}
      onBlur={handleBlur}
      onChange={handleChange}
    />
    <FormHelperText error>
      {touched.categoryName && errors.categoryName}
    </FormHelperText>
  </Grid>
);
