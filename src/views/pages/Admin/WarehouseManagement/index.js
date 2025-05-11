import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import "react-quill/dist/quill.snow.css";
import { getAPIHandler, postAPIHandler } from "src/ApiConfig/service";
import Topheading from "src/component/TopHeading";
import toast from "react-hot-toast";

export default function ProductForm() {

  const [disabledFields, setDisabledFields] = useState({});

  const [initialFormValues, setInitialFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pin: "",
  });

  const [isEditMode, setEditMode] = useState(false);

  const fetchProductData = async () => {
    try {
      const res = await getAPIHandler({ endPoint: "getWareHouse" });
      if (res.status === 200 && res.data.result) {
        const product = res.data.result;
        setInitialFormValues({
          name: product.name || "",
          email: product.email || "",
          phone: product.phone || "",
          address: product.address || "",
          city: product.city || "",
          state: product.state || "",
          country: product.country || "",
          pin: product.pin || "",
        });
        const disabled = {};
      ["name", "email"].forEach((key) => {
        if (product[key]) disabled[key] = true;
      });
      setDisabledFields(disabled);
        setEditMode(true);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const endpoint = "addUpdateWareHouse";
      const formData = {
        name: values.name,  // Always send original name
        email: values.email, // Always send original email
        phone: values.phone,
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        pin: values.pin,
      };

      const response = await postAPIHandler({ endPoint: endpoint, dataToSend: formData });

      if (response.status === 200) {
        toast.success(isEditMode ? "Warehouse details updated successfully!" : "Warehouse details added successfully!");
        resetForm();
        fetchProductData();
      } else {
        toast.error("Failed to process the request.");
      }
    } catch (error) {
      console.error("Error processing form:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Topheading heading="Warehouse Details Management" />
     
      <Paper elevation={2}>
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit} enableReinitialize>
          {({ errors, handleBlur, handleChange, touched, values, isSubmitting }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {isEditMode ? "Edit Warehouse Details" : "Add Warehouse Details"}
                  </Typography>
                </Grid>

                {[
                  { label: "Facility Name", name: "name" },
                  { label: "Email", name: "email" },
                  { label: "Phone", name: "phone" },
                  { label: "Address", name: "address" },
                  { label: "City", name: "city" },
                  { label: "State", name: "state" },
                  { label: "Country", name: "country" },
                  { label: "PIN", name: "pin" },
                ].map((field, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <TextField
                      label={field.label}
                      variant="outlined"
                      name={field.name}
                      fullWidth
                      value={values[field.name]}
                      error={Boolean(touched[field.name] && errors[field.name])}
                      onBlur={handleBlur}
                      disabled={!!disabledFields[field.name]}
                      onChange={handleChange}
                      // disabled={field.name === "name" || field.name === "email" ? !!initialFormValues[field.name] : false}
                    />
                    <FormHelperText error>{touched[field.name] && errors[field.name]}</FormHelperText>
                  </Grid>
                ))}
              </Grid>

              <Box py={3} align="center">
                
                <Button variant="contained" type="submit" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : isEditMode ? "Update Warehouse Details" : "Add Warehouse Details"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
