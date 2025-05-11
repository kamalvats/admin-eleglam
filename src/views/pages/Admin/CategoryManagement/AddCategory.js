import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Switch,
  TextField,
  Typography,
  Divider,
} from "@material-ui/core";
import Topheading from "src/component/TopHeading";
import { useHistory, useLocation } from "react-router-dom";
import {
  getAPIHandler,
  postAPIHandler,
  putAPIHandlerCall,
} from "src/ApiConfig/service";
import JoditEditor from "jodit-react";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  subAdminContatiner: {
    "& .MuiPopover-paper": {
      boxShadow:
        "0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)",
      filter: "drop-shadow(0px 10px 40px rgba(142, 182, 210, 0.40))",
    },
    "& .MuiPaper-elevation0": {
      boxShadow:
        "0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25) !important",
      filter: "drop-shadow(0px 10px 40px rgba(142, 182, 210, 0.40)) !important",
    },
    "& p": {
      color: "rgba(38, 36, 36, 0.87)",
      "& span": {
        color: "#FF4700",
      },
    },
    "& .basicInfoBox": {
      padding: "40px 0px",
    },
    "& .MuiSvgIcon-fontSizeSmall": {
      color: "#0DCCFD",
    },
    "& h6": {
      color: "#262424",
    },
    "& .MuiCheckbox-root": {
      color: "#008CF2",
    },
    "& .mainContent": {
      overflow: "hidden",
      fontWeight: "400 !important",
      "& figure": {
        marginLeft: "0",
      },
      "& a": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },
      "& code": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },
      "& td": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },
      "& span, section": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },

      "& iframe": {
        width: "100%",
        // overflow: "hidden",
        display: "inherit",
      },
      "& img": {
        maxWidth: "100%",
        height: "auto",
      },

      "& >*": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        wordBreak: "break-word",
        overflow: "auto",
        color: `${theme.palette.text.primary} !important`,
      },
      "& h4": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& h5": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& h1": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& h2": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& h3": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& span": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& em": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },
      "& p": {
        fontWeight: "400 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontSize: "14px !important",
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
        fontWeight: "400 !important",
        lineHeight: "1.5",
        letterSpacing: "0.00938em",
      },
      "& strong": {
        fontWeight: "400 !important",
        color: `${theme.palette.text.primary} !important`,
      },
    },
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
export default function ApiContentManagement() {
  const classes = useStyles();
  const history = useHistory();
  let Iddd = window.location.search;
  let Types = window.location.hash;
  // let Types = window.location.hash;
  console.log(Iddd.split("?")[1], Types && Types.split("#")[1] == "view");
  const location = useLocation();

  const [appData, setapiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setisSubmit] = useState(false);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  let placeholder = "Enter description";

  const [values, setformValue] = useState({
    title: "",
    categoryId: "Choose",
    description: "",
    endpointType: false,
  });

  const handleChange = (e) => {
    const temp = { ...values, [e.target.name]: e.target.value };
    setformValue(temp);
  };

  const handleViewAPI = async () => {
    try {
      const response = await getAPIHandler({
        endPoint: "viewapiReferenceSubcategory",
        paramsData: { subCategoryId: Iddd.split("?")[1] },
      });
      if (response.data.responseCode === 200) {
        let viewData = response.data.endpointsubCategoryFound[0];
        setContent(viewData?.description);
        setformValue({
          title: viewData?.title,
          categoryId: viewData?.categoryId,
          description: viewData?.description,
          endpointType: viewData?.endpointType,
        });
      } else {
      }
    } catch (error) {
      console.log(" ---- error ", error);
    }
  };
  useEffect(() => {
    if (Types && Types.split("#")[1]) handleViewAPI();
  }, [Types && Types.split("#")[1]]);

  const handleAPI = async () => {
    try {
      const response = await getAPIHandler({
        endPoint: "getcategoryforEndpoint",
      });
      if (response.data.responseCode === 200) {
        setapiData(response.data.categories.docs);
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleAPI();
  }, []);

  const HandleAddSubCategory = async () => {
    try {
      setisSubmit(true);
      if (
        values.categoryId == "Choose" ||
        values.title == "" ||
        // values.endpointType == "" ||
        content == ""
      ) {
        return;
      }
      setIsLoading(true);
      setisSubmit(false);
      let dataToSend = {
        categoryId: values.categoryId,
        title: values.title,
        endpointType: values.endpointType.toString(),
        description: content,
      };
      const response = await postAPIHandler({
        endPoint: "addapiReferenceSubcategory",
        dataToSend,
      });
      if (response.data.responseCode === 200) {
        setIsLoading(false);
        history.goBack();
        toast.success(response.data.responseMessage);
      } else {
      }
      setIsLoading(false);
    } catch (error) {
      console.log(" error ", error);
      setIsLoading(false);
    }
  };
  const HandleEditSubCategory = async () => {
    try {
      setisSubmit(true);
      if (
        values.categoryId == "Choose" ||
        values.title == "" ||
        // values.endpointType == "" ||
        content == ""
      ) {
        return;
      }
      setIsLoading(true);
      setisSubmit(false);
      let dataToSend = {
        subCategoryId: Iddd.split("?")[1],
        title: values.title,
        endpointType: values.endpointType.toString(),
        description: content,
      };
      const response = await putAPIHandlerCall({
        endPoint: "editApiReferenceSubcategory",
        dataToSend,
      });
      if (response.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(response.data.responseMessage);

        history.goBack();
      } else {
      }
      setIsLoading(false);
    } catch (error) {
      console.log(" error ", error);
      setIsLoading(false);
    }
  };

  return (
    <Box className={classes.subAdminContatiner}>
      <Typography variant="h3">
        {Types.split("#")[1].toUpperCase() === "EDIT"
          ? "Update Sub Category"
          : Types.split("#")[1].toUpperCase() === "VIEW"
          ? "View Sub Category"
          : "Add Sub Category"}
      </Typography>
      <Box mt={2} mb={2}>
        <Divider className="borderBox" />
      </Box>
      <Paper elevation={2}>
        <Box>
          <Box
            pb={1}
            display="flex"
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="h6">
              {Types.split("#")[1].toUpperCase() === "EDIT"
                ? "Update New Sub Category"
                : Types.split("#")[1].toUpperCase() === "VIEW"
                ? "View New Sub Category"
                : "Add New Sub Category"}
            </Typography>
            <Box
              pb={1}
              display="flex"
              flexDirection={"row"}
              justifyContent={"end"}
            >
              <Typography variant="h6" style={{ color: "#4abaf3" }}>
                Is this contained api endpoints
              </Typography>
              <Switch
                checked={values.endpointType}
                onChange={(e) => {
                  const temp = { ...values, [e.target.name]: e.target.checked };
                  setformValue(temp);
                }}
                color="primary"
                name="endpointType"
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="body2">
                {" "}
                Select Category <span>*</span>{" "}
              </Typography>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="categoryId"
                  MenuProps={menuProps}
                  value={values?.categoryId}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  error={isSubmit && values.categoryId == "Choose"}
                >
                  <MenuItem value="Choose" disabled>
                    Select Sub-Category
                  </MenuItem>
                  {appData &&
                    appData?.map((maps) => {
                      return (
                        <MenuItem value={maps?._id} key={maps?._id}>
                          {maps?.categoryName}
                        </MenuItem>
                      );
                    })}
                </Select>
                <FormHelperText error>
                  {isSubmit &&
                    values.categoryId == "Choose" &&
                    "Category id  is required"}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography variant="body2">
                Enter Title <span>*</span>{" "}
              </Typography>

              <TextField
                placeholder="Enter title"
                variant="outlined"
                name="title"
                fullWidth
                value={values.title}
                error={isSubmit && values.title === ""}
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                  handleChange({
                    target: {
                      name: "title",
                      value: inputValue,
                    },
                  });
                }}
                inputProps={{
                  maxLength: 57,
                }}
                helperText={
                  isSubmit && values.title === "" && "Title is required"
                }
              />

              {values.title.length > 56 && (
                <FormHelperText error>
                  It should not exceed 56 characters
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12} sm={12}>
              {Types.split("#")[1].toUpperCase() === "VIEW" ? (
                <Typography variant="body2">Description</Typography>
              ) : (
                <Typography variant="body2">
                  Description <span>*</span>{" "}
                </Typography>
              )}

              {Types.split("#")[1].toUpperCase() === "VIEW" ? (
                <Box mt={1}>
                  <div
                    className="mainContent"
                    dangerouslySetInnerHTML={{
                      __html: content,
                    }}
                  />
                </Box>
              ) : (
                <JoditEditor
                  // ref={editor}
                  // value={content}
                  // config={{
                  //   readonly: false, // all options from https://xdsoft.net/jodit/docs/,
                  //   placeholder: placeholder || "Start typings...",
                  // }}
                  tabIndex={1} // tabIndex of textarea
                  value={content}
                  onChange={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  // onChange={(newContent) => {}}
                />
              )}

              <FormHelperText error>
                {isSubmit && content == "" && "Description is required"}
              </FormHelperText>
            </Grid>
          </Grid>
        </Box>
        <Box py={3} align="center" className="displayCenter">
          {Types.split("#")[1].toUpperCase() != "VIEW" && (
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={() => {
                if (Types.split("#")[1].toUpperCase() == "ADD") {
                  HandleAddSubCategory();
                } else {
                  HandleEditSubCategory();
                }
              }}
            >
              {Types && Types.split("#")[1]}{" "}
              {isLoading && <ButtonCircularProgress />}
            </Button>
          )}{" "}
          {/* <Button
            variant="contained"
            type="submit"
            color="primary"
            onClick={HandleAddSubCategory}
            disabled={isLoading}
          >
            Add {isLoading && <ButtonCircularProgress />}
          </Button> */}
          &nbsp;&nbsp;&nbsp;
          <Button
            variant="contained"
            color="secondary"
            disabled={isLoading}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
