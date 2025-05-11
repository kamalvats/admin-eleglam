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
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import LoadingComp from "./LoadingComp";
import { getAPIHandler } from "src/ApiConfig/service";

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
export default function CategoryDialogBox({
  openModal,
  handleClose,
  heading,
  description,
  handleSubmit,
  isLoading,
  formValue,
  _onInputChange,
  type,
  setisSubmit,
  isSubmit,
}) {
  const classes = useStyles();
  //
  const [appData, setapiData] = useState([]);
  const [characterCount, setCharacterCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };
  const _updateCharacterCount = (inputValue) => {
    setCharacterCount(inputValue.length);
  };
  const handleAPI = async () => {
    try {
      const response = await getAPIHandler({
        endPoint: "getcategoryforEndpoint",
      });
      if (response.data.responseCode === 200) {
        setapiData(response.data.categories.docs);
      } else {
      }
    } catch (error) {
      console.log(" ---- error ", error);
    }
  };
  useEffect(() => {
    if (type == "sub") handleAPI();
  }, [type == "sub"]);

  return (
    <div>
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
            <Box className={classes.dialougTitle}>
              <Typography variant="h4">{heading}</Typography>
              {type == "main" && (
                <Box mt={2}>
                  <Typography variant="body2" style={{ textAlign: "start" }}>
                    Category Name <span>*</span>{" "}
                  </Typography>

                  <TextField
                    placeholder="Enter category Name"
                    variant="outlined"
                    name="category"
                    fullWidth
                    type="text"
                    value={formValue.category}
                    error={isSubmit && formValue.category == ""}
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^A-Za-z]/g, "");
                      _onInputChange(e);
                    }}
                    inputProps={{ maxLength: 33 }}
                    helperText={
                      isSubmit &&
                      formValue.category === "" &&
                      "Category name is required."
                    }
                  />
                  {formValue.category.length > 32 && (
                    <FormHelperText error>
                      It should not exceed 32 characters
                    </FormHelperText>
                  )}
                </Box>
              )}
              {type == "sub" && (
                <Box>
                  <Box mt={2}>
                    <Typography variant="body2" style={{ textAlign: "start" }}>
                      Select Category <span>*</span>{" "}
                    </Typography>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="categoryId"
                      value={formValue.categoryId}
                      error={isSubmit && formValue.categoryId == ""}
                      onChange={_onInputChange}
                      variant="outlined"
                      fullWidth
                      MenuProps={menuProps}
                    >
                      {appData &&
                        appData?.map((maps) => {
                          return (
                            <MenuItem value={maps?._id}>
                              {maps?.categoryName}
                            </MenuItem>
                          );
                        })}
                      {/* <MenuItem value={10}>Active</MenuItem>
                      <MenuItem value={10}>Active</MenuItem> */}
                    </Select>
                    <FormHelperText error>
                      {isSubmit &&
                        formValue.categoryId == "" &&
                        "Sub category name is required."}
                    </FormHelperText>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="body2" style={{ textAlign: "start" }}>
                      Sub Category Name <span>*</span>{" "}
                    </Typography>

                    <TextField
                      placeholder="Enter sub category Name"
                      variant="outlined"
                      name="subCategory"
                      fullWidth
                      value={formValue.subCategory}
                      error={isSubmit && formValue.subCategory == ""}
                      onChange={_onInputChange}
                      inputProps={{ maxLength: 32 }}
                    />
                    <FormHelperText error>
                      {isSubmit &&
                        formValue.subCategory == "" &&
                        "Sub category name is required."}
                    </FormHelperText>
                  </Box>
                </Box>
              )}
              {type == "NFTtab" && (
                <Box>
                  <Grid container spacing={4}>
                    <Grid item xs={4}>
                      <Box
                        style={{
                          borderRadius: "50%",
                          border: "1px solid #000",
                          width: "100px",
                          height: "100px",
                          backgroundImage: `url(${selectedImage})`,
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
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={(event) => {
                              handleImageChange(event);
                            }}
                            id="imageInput"
                            value={formValue.image}
                          />
                          <label htmlFor="imageInput">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                            >
                              Choose File
                            </Button>
                          </label>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6">Category name *</Typography>
                      <TextField
                        placeholder="Enter category name"
                        variant="outlined"
                        name="Category"
                        fullWidth
                        inputProps={{ maxLength: 32 }}
                      />
                      <FormHelperText error></FormHelperText>
                    </Grid>
                  </Grid>
                </Box>
              )}
              {type == "Influencertab" && (
                <Box>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Typography variant="h6">Category name *</Typography>
                      <TextField
                        placeholder="Enter category name"
                        variant="outlined"
                        name="category"
                        fullWidth
                        value={formValue.category}
                        error={isSubmit && formValue.category == ""}
                        onChange={_onInputChange}
                        inputProps={{ maxLength: 32 }}
                      />
                      <FormHelperText error>
                        {isSubmit &&
                          formValue.category == "" &&
                          "Category name is required."}
                      </FormHelperText>
                    </Grid>

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
                        value={formValue.description}
                        error={isSubmit && formValue.description === ""}
                        onChange={(e) => {
                          _onInputChange(e);
                          _updateCharacterCount(e.target.value);
                        }}
                      />
                      <FormHelperText error>
                        {isSubmit &&
                          formValue.description === "" &&
                          "Description is required."}
                      </FormHelperText>
                      <Typography>{`${characterCount}/256`}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Box mt={0} mb={2} className={classes.buttnBox}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setisSubmit(true);
                  // if (formValue.category == "") {
                  //   return;
                  // }
                  // setisSubmit(false);
                  handleSubmit();
                }}
                disabled={isLoading}
              >
                Submit {isLoading && <LoadingComp />}
              </Button>
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
