import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
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
import * as yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getAPIHandler,
  postAPIHandler,
  putAPIHandlerCall,
} from "src/ApiConfig/service";
import ApiConfig from "src/ApiConfig/ApiConfig";
import Topheading from "src/component/TopHeading";
import toast from "react-hot-toast";

const validationFormSchema = yup.object().shape({
  productTitle: yup.string().required("Product Name is required"),
  productDetails: yup.string().required("Enter Product Details"),
  images: yup
    .array()
    .min(1, "Please add at least one image")
    .max(4, "You can upload up to 4 images"),
  price: yup.number().required("Product Price is required").positive("Price must be positive"),
  discountPrice: yup.number()
    .required("Discount price is required")
    .positive("Discount price must be positive")
    .test("is-less-than-price", "Discount price should be less than the actual price", function (value) {
      return value < this.parent.price; // Ensure discountPrice < price
    }),
  freeDelivery: yup.boolean().required("Please Chooose one"),
  productDescription: yup.string().required("Enter Description"),
  otherDescription: yup.string().required("Enter Why user will love it"),
  styleTip: yup.string().required("Enter Style Tips"),
});

export default function ProductForm() {
  const history = useHistory();
  const location = useLocation();
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageUpload = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedImages.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }
    setSelectedImages((prev) => [...prev, ...files]);
    setFieldValue("images", [...selectedImages, ...files]);
  };

  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [initialFormValues, setInitialFormValues] = useState({
    productTitle: "",
    productDetails: "",
    images: [],
    price: "",
    discountPrice: "",
    freeDelivery: null,
    productDescription: "",
    otherDescription: "",
    styleTip: "",
  });

  const isEditMode = location.hash.includes("#edit");
  const productId = location.search.split("?")[1]; // Extract product ID from URL

  useEffect(() => {
    if (isEditMode && productId) {
      fetchProductData(productId);
    }
  }, [isEditMode, productId]);

  const fetchProductData = async (id) => {
    try {
      const res = await getAPIHandler({
        endPoint: "viewproduct",
        paramsData: { _id: id },
      });

      if (res.status === 200 && res.data.result) {
        const product = res.data.result;

        const imageUrls = product.images?.map((img) => img.secure_url) || [];

        setInitialFormValues({
          productTitle: product.productTitle || "",
          productDetails: product.productDetails || "",
          images: imageUrls,
          price: product.price || "",
          discountPrice: product.discountPrice || "",
          freeDelivery: product.freeDelivery || "",
          productDescription: product.productDescription || "",
          otherDescription: product.otherDescription || "",
          styleTip: product.styleTip || "",
        });
        setUploadedImageUrls(product.images || []);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const uploadImages = async (images) => {
    if (!Array.isArray(images) || images.length === 0) {
      console.warn("⚠️ No images provided for upload.");
      return [];
    }
  
    const uploadedImageUrls = [];
  
    try {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        console.log(`🔄 Uploading file ${i + 1}: ${file?.name}`);
  
        const formData = new FormData();
        formData.append("file", file); // Ensure backend expects "file"
  
        const res = await postAPIHandler({
          endPoint: "uploadFile",
          dataToSend: formData,
        });
  
        if (!res || !res.data) {
          console.error(`❌ API response is undefined for file ${i + 1}`);
          continue;
        }
  
        console.log("📥 API Response:", res.data);
  
        if (res.data.responseCode === 200 && res.data.result) {
          // Extract secure URL if available
          const imageUrl = res.data.result.secure_url || res.data.result;
          uploadedImageUrls.push(imageUrl);
        } else {
          console.error(`❌ Failed to upload file ${i + 1}: ${res.data.responseMessage}`);
        }
      }
  
      console.log("🎯 Uploaded Image URLs:", uploadedImageUrls);
      return uploadedImageUrls;
    } catch (error) {
      console.error("🚨 Image Upload Error:", error);
      return [];
    }
  };
  

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {


      let uploadedUrls = [...uploadedImageUrls]; // Existing uploaded images

    // Upload only new images
    if (values.images.length > 0 && values.images.some((img) => img instanceof File)) {
      const newUploadedUrls = await uploadImages(values.images.filter((img) => img instanceof File));

      if (newUploadedUrls.length !== values.images.filter((img) => img instanceof File).length) {
        alert("Some images failed to upload.");
        return;
      }

      uploadedUrls = [...uploadedUrls, ...newUploadedUrls]; // Combine old and new images
    }



      const endpoint = isEditMode ? "editProduct" : "addProduct";

      const formData = {
        productTitle: values.productTitle,
        productDetails: values.productDetails,
        discountPrice: values.discountPrice,
        price: values.price,
        freeDelivery: values.freeDelivery,
        images: uploadedUrls,
        productDescription: values.productDescription,
        otherDescription: values.otherDescription,
        styleTip: values.styleTip,
        ...(isEditMode && { _id: productId }), // Attach ID in edit mode
      };

      const response = await (isEditMode
        ? putAPIHandlerCall({ endPoint: endpoint, dataToSend: formData })
        : postAPIHandler({ endPoint: endpoint, dataToSend: formData }));

      if (response.status === 200) {
        toast.success(
          isEditMode
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        resetForm();
        setSelectedImages([]);
        setUploadedImageUrls([]);
        history.push("/product-management"); // Redirect to product list or other page
      } else {
        toast.error("Failed to process the request.");
      }
    } catch (error) {
      console.log("Error processing form:", error);
      // alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageRemove = (index, setFieldValue, isUploaded = false) => {
    if (isUploaded) {
      // Remove existing image from API response
      const updatedUrls = uploadedImageUrls.filter((_, i) => i !== index);
      setUploadedImageUrls(updatedUrls);
      setFieldValue("images", [...updatedUrls, ...selectedImages]);
    } else {
      // Remove newly uploaded image
      const updatedImages = selectedImages.filter((_, i) => i !== index);
      setSelectedImages(updatedImages);
      setFieldValue("images", [...uploadedImageUrls, ...updatedImages]);
    }
  };

  return (
    <Box>
      <Topheading heading="Product Management" />
      <Paper elevation={2}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationFormSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {isEditMode ? "Edit Product" : "Add Product"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Product Name"
                    variant="outlined"
                    name="productTitle"
                    fullWidth
                    value={values.productTitle}
                    error={Boolean(touched.productTitle && errors.productTitle)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.productTitle && errors.productTitle}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Product Details</Typography>
                  <ReactQuill
                    theme="snow"
                    value={values.productDetails}
                    onChange={(content) =>
                      setFieldValue("productDetails", content)
                    }
                  />
                  <FormHelperText error>
                    {touched.productDetails && errors.productDetails}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6">
                    Upload Images <span>*</span>
                  </Typography>
                  <input
                    style={{ display: "none" }}
                    id="upload-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, setFieldValue)}
                  />
                  <label htmlFor="upload-images">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                    >
                      Choose Images
                    </Button>
                  </label>
                  <FormHelperText error>
                    {touched.images && errors.images}
                  </FormHelperText>

                  {/* Image Preview */}
                  {/* Show previously uploaded images */}
                  <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                    {console.log("imgegeege", uploadedImageUrls)}
                    {uploadedImageUrls.map((url, index) => (
                      <Box key={`uploaded-${index}`} position="relative">
                        <img
                          src={url} // Use extracted URL directly
                          alt={`Uploaded-${index}`}
                          width="100"
                          height="100"
                          style={{
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginRight: "8px",
                          }}
                        />
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() =>
                            handleImageRemove(index, setFieldValue, true)
                          }
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>

                  {/* Show newly selected images */}
                  <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                    {selectedImages.map((image, index) => (
                      <Box key={`new-${index}`} position="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          width="100"
                          height="100"
                          style={{
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginRight: "8px",
                          }}
                        />
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() =>
                            handleImageRemove(index, setFieldValue, false)
                          }
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Price"
                    variant="outlined"
                    name="price"
                    type="number"
                    fullWidth
                    value={values.price}
                    error={Boolean(touched.price && errors.price)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.price && errors.price}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Discount Price"
                    variant="outlined"
                    name="discountPrice"
                    type="number"
                    fullWidth
                    value={values.discountPrice}
                    error={Boolean(
                      touched.discountPrice && errors.discountPrice
                    )}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <FormHelperText error>
                    {touched.discountPrice && errors.discountPrice}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Free Delivery</Typography>
                  <Box display="flex" gap={2}>
                    <Button
                      variant={values.freeDelivery ? "contained" : "outlined"}
                      color={values.freeDelivery ? "primary" : "default"}
                      onClick={() => setFieldValue("freeDelivery", true)}
                    >
                      Yes
                    </Button>
                    <Button
                      variant={
                        values.freeDelivery === false ? "contained" : "outlined"
                      }
                      color={
                        values.freeDelivery === false ? "secondary" : "default"
                      }
                      onClick={() => setFieldValue("freeDelivery", false)}
                    >
                      No
                    </Button>
                  </Box>
                  <FormHelperText error>
                    {touched.freeDelivery && errors.freeDelivery}
                  </FormHelperText>
                </Grid>

               

                <Grid item xs={12}>
                  <Typography>Why User Will Love It</Typography>
                  <ReactQuill
                    theme="snow"
                    value={values.otherDescription}
                    onChange={(content) =>
                      setFieldValue("otherDescription", content)
                    }
                  />
                  <FormHelperText error>
                    {touched.otherDescription && errors.otherDescription}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Style Tips</Typography>
                  <ReactQuill
                    theme="snow"
                    value={values.styleTip}
                    onChange={(content) => setFieldValue("styleTip", content)}
                  />
                  <FormHelperText error>
                    {touched.styleTip && errors.styleTip}
                  </FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Product Description</Typography>
                  <ReactQuill
                    theme="snow"
                    value={values.productDescription}
                    onChange={(content) =>
                      setFieldValue("productDescription", content)
                    }
                  />
                  <FormHelperText error>
                    {touched.productDescription && errors.productDescription}
                  </FormHelperText>
                </Grid>
              </Grid>

              <Box py={3} align="center">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => history.goBack()}
                >
                  Back
                </Button>
                &nbsp;
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : isEditMode
                    ? "Update Product"
                    : "Add Product"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
