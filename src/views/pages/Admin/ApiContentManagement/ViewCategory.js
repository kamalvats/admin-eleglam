import Topheading from "src/component/TopHeading";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import "react-phone-input-2/lib/style.css";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Form, Formik } from "formik";
import * as yup from "yup";
const useStyles = makeStyles(() => ({
  subAdminContatiner: {
    "& p": {
      color: "#000",
      "& span": {
        color: "#FF4700",
      },
    },
    "& .basicInfoBox": {
      padding: "40px 0px",
    },
    "& .MuiSvgIcon-fontSizeSmall": {
      color: "#FF0098",
    },
    "& h6": {
      color: "#000",
    },
    "& .MuiCheckbox-root": {
      color: "#008cf2 !important",
    },
  },
}));
const DataTable = [
  {
    responceData: "200",
    name: "Success",
  },
  {
    responceData: "200",
    name: "Error",
  },
  {
    responceData: "200",
    name: "Success",
  },
  {
    responceData: "200",
    name: "Error",
  },
  {
    responceData: "200",
    name: "Error",
  },
];
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
const initialFormValues = {};
const validationFormSchema = yup.object().shape({
  productTitle: yup.string().required("Product Name is required"),
  phoneNo: yup.string().required("Mobile Number is required"),
  endpoint: yup.string().required("Please select Gender"),
  testnetURL: yup.string().required("Testnet URL is required"),
  mainnetURL: yup.string().required("Mainnet URL is required"),
  endpoints: yup.string().required("Enter End Points"),
  description: yup.string().required("Enter Description"),
});
export default function ViewCategory() {
  const classes = useStyles();
  const history = useHistory();
  const loginSubmit = async (values) => {};
  return (
    <Box className={classes.subAdminContatiner}>
      <Topheading heading="Product  Management" />
      <Paper elevation={2}>
        <Formik
          initialValues={initialFormValues}
          validationSchema={validationFormSchema}
          onSubmit={loginSubmit}
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
                <Box pb={1} mb={2}>
                  <Typography variant="h6">Add New Product</Typography>
                </Box>

                <Grid container spacing={3}>
                  {/* <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="body1">
                      {" "}
                      Select Category <span>*</span>{" "}
                    </Typography>
                    <FormControl fullWidth className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="endpoint"
                        value={values?.endpoint}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        error={Boolean(touched.endpoint && errors.endpoint)}
                        onBlur={handleBlur}
                        MenuProps={menuProps}
                      >
                        <MenuItem value={10}>option 1</MenuItem>
                        <MenuItem value={20}>option 2</MenuItem>
                        <MenuItem value={30}>option 3</MenuItem>
                      </Select>
                      <FormHelperText error>
                        {touched.endpoint && errors.endpoint}
                      </FormHelperText>
                    </FormControl>
                  </Grid> */}




                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="body1">
                      Product Name <span>*</span>{" "}
                    </Typography>

                    <TextField
                      placeholder="Enter title"
                      variant="outlined"
                      name="title"
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
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="body1">
                      Base URL : (testnet) <span>*</span>{" "}
                    </Typography>

                    <TextField
                      placeholder="Enter Testnet Base URL"
                      variant="outlined"
                      fullWidth
                      name="testnetURL"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.testnetURL && errors.testnetURL)}
                      value={values.testnetURL}
                    />
                    <FormHelperText error>
                      {touched.testnetURL && errors.testnetURL}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="body1">
                      Base URL : (Mainnet)<span>*</span>{" "}
                    </Typography>
                    <TextField
                      placeholder="Enter Mainnet Base URL"
                      variant="outlined"
                      fullWidth
                      name="mainnetURL"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.mainnetURL && errors.mainnetURL)}
                      value={values.mainnetURL}
                    />
                    <FormHelperText error>
                      {touched.mainnetURL && errors.mainnetURL}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="body2">
                      Endpoint Details <span>*</span>{" "}
                    </Typography>
                    <TextField
                      placeholder=""
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={5}
                      name="endpoints"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.endpoints && errors.endpoints)}
                      value={values.endpoints}
                    />
                    <FormHelperText error>
                      {touched.endpoints && errors.endpoints}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h6">
                      Select Language <span>*</span>
                    </Typography>
                    <FormControl component="fieldset">
                      <FormGroup row>
                        <FormControlLabel
                          control={<Checkbox name="node" />}
                          label={<span style={{ color: "#000" }}>Node</span>}
                        />
                        <FormControlLabel
                          control={<Checkbox name="python" />}
                          label={<span style={{ color: "#000" }}>Python</span>}
                        />
                        <FormControlLabel
                          control={<Checkbox name="php" />}
                          label={<span style={{ color: "#000" }}>PHP</span>}
                        />
                        <FormControlLabel
                          control={<Checkbox name="java" />}
                          label={<span style={{ color: "#000" }}>Java</span>}
                        />
                        <FormControlLabel
                          control={<Checkbox name="go" />}
                          label={<span style={{ color: "#000" }}>Go</span>}
                        />
                      </FormGroup>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={3}>
                <Typography variant="h6">Meta Data Informaiton</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="body1">
                      Enter Metadata<span>*</span>{" "}
                    </Typography>

                    <TextField
                      placeholder="Enter Metadata"
                      variant="outlined"
                      name="title"
                      fullWidth
                      value={values.title}
                      error={Boolean(touched.title && errors.title)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <FormHelperText error>
                      {touched.title && errors.title}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="body1">
                      {" "}
                      Type <span>*</span>{" "}
                    </Typography>
                    <FormControl fullWidth className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="endpoint"
                        value={values?.endpoint}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        error={Boolean(touched.endpoint && errors.endpoint)}
                        onBlur={handleBlur}
                        MenuProps={menuProps}
                      >
                        <MenuItem value={10}>String</MenuItem>
                        <MenuItem value={20}>Integer</MenuItem>
                        <MenuItem value={30}>Numeric</MenuItem>
                      </Select>
                      <FormHelperText error>
                        {touched.endpoint && errors.endpoint}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="body2">
                      Description <span>*</span>{" "}
                    </Typography>
                    <TextField
                      placeholder=""
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={5}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(touched.description && errors.description)}
                      value={values.description}
                    />
                    <FormHelperText error>
                      {touched.description && errors.description}
                    </FormHelperText>
                  </Grid>
                </Grid>
              </Box>

              <Box mt={3}>
                <Box className="basicInfoBox">
                  <Typography variant="h6">Response Handling</Typography>
                </Box>
                <TableContainer>
                  <Table className={classes.tableBox}>
                    <TableHead>
                      <TableRow alignItems="center">
                        <TableCell>ID</TableCell>
                        <TableCell>Response Type</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {DataTable.map((value, i) => (
                        <TableRow>
                          {/* <TableCell> {i + 1}</TableCell> */}
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell> {value.responceData}</TableCell>
                          <TableCell> {value.name}</TableCell>
                          <TableCell>
                            <Box display="flex" justifyContent="flex-start">
                              <IconButton
                                onClick={() =>
                                  history.push("/add-product")
                                }
                                style={{
                                  padding: "8px",
                                  backgroundColor: "#008CF2",
                                  color: "#fff",
                                }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box py={3} align="center">
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
