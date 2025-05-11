import {
  Box,
  Button,
  FormHelperText,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import {
  patchAPIHandler,
  postAPIHandler,
} from "src/ApiConfig/service";
import toast from "react-hot-toast";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { AiOutlinePlus } from "react-icons/ai";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
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
  partnerMainBox: {
    position: "relative",
    "& .MuiIconButton-root": {
      background: "#061121",
      padding: "10px",

      position: "absolute",
      right: "10px",
      bottom: "10px",
    },
  },
  BoxImg: {
    background: "linear-gradient(90deg, #39A9F4 0%, #62D3F0 100%)",
    backdropFilter: "blur(30px)",
    borderRadius: "15px",
    height: "189px",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& h6": {
      color: "#ffffff",
    },
  },
  imgsection1: {
    height: "100%",
    width: "100%",
    borderRadius: "10px",
    margin: "8px 0px",
    "& .MuiAvatar-img": {
      objectFit: "cover",
    },
  },
  icomButton: {
    borderRadius: "100%",
    padding: "10px",
    background: "rgba(255, 255, 255, 0.3)",
    boxShadow:
      "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function AddPartner() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const partnerId = location?.state?.data?._id;
  const [isLogoSizeValid, setIsLogoSizeValid] = useState(true);

  const [isLoading1, setIsLoading1] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isUploadingImage, SetIsUploadingImage] = useState(false);
  const [partnerLogo, setPartnerLogo] = useState("");
  const [partnerLogo1, setPartnerLogo1] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [concertData, setConcertData] = useState({
    name: "",
    description: "",
  });
  function testName(value) {
    const regex = /^[aA-zZ\s]+$/;
    return regex.test(value);
  }
  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        const width = image.width;
        const height = image.height;

        const maxWidth = 300;
        const maxHeight = 300;

        if (width <= maxWidth && height <= maxHeight) {
          setPartnerLogo(URL.createObjectURL(file));
          setPartnerLogo1(file);
          setIsLogoSizeValid(true);
        } else {
          setIsLogoSizeValid(false);
        }
      };
    }
  };
  
  const AddPartner = async () => {
    setIsSubmit(true);
    if (
      concertData.name !== "" &&
      concertData.description !== "" &&
      partnerLogo1
    ) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("image", partnerLogo1);
        formData.append("name", concertData.name);
        formData.append("description", concertData.description);

        const res = await postAPIHandler({
          endPoint: "addPartner",
          dataToSend: formData,
        });
        if (res.data.responseCode === 200) {
          toast.success(res.data.responseMessage);
          history.push("/list-partner");
          setIsLoading(false);
        } else {
          toast.error(res.data.responseMessage);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        setIsLoading(false);

        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
      }
    }
  };
  const UpdatePartner = async () => {
    setIsSubmit(true);
    const isLogoRemoved = partnerLogo === "" && !partnerLogo1;

    if (concertData.description !== "" && !isLogoRemoved) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("description", concertData.description);
        formData.append("partnerId", partnerId);

        if (partnerLogo1) {
          formData.append("image", partnerLogo1);
        }

        const res = await patchAPIHandler({
          endPoint: "editPartner",
          dataToSend: formData,
        });

        if (res.data.responseCode === 200) {
          toast.success(res.data.responseMessage);
          history.push("/list-partner");
          setIsLoading(false);
        } else {
          toast.error(res.data.responseMessage);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
      }
    }
  };

  useEffect(() => {
    const editData = location?.state?.data;
    setConcertData({
      name: editData?.name ? editData?.name : "",
      description: editData?.description ? editData?.description : "",
    });
    setPartnerLogo(editData?.profilePic ? editData?.profilePic : "");
  }, [location]);
  return (
    <Box className={classes.subAdminContatiner}>
      <Typography variant="h3">
        {location?.state?.componentName === "edit"
          ? "Update Partner"
          : location?.state?.componentName === "view"
          ? "View Partner"
          : "Add Partner"}
      </Typography>

      <Box mt={2} mb={2}>
        <Divider className="borderBox" />
      </Box>
      <Paper elevation={2}>
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Typography variant="body2">Partner Name : </Typography>
              <TextField
                placeholder="Please enter partner name"
                variant="outlined"
                name="title"
                fullWidth
                inputProps={{ maxLength: 35 }}
                disabled={
                  isLoading1 ||
                  location?.state?.componentName === "edit" ||
                  location?.state?.componentName === "view"
                }
                value={concertData.name}
                onChange={(e) => {
                  setConcertData({
                    ...concertData,
                    ["name"]: e.target.value,
                  });
                  const isValid = testName(e.target.value);
                  setIsValidName(isValid);
                }}
                error={isSubmit && concertData.name === ""}
                helperText={
                  isSubmit && concertData.name === "" && "Please enter name."
                }
              />
              {!isValidName && concertData.name !== "" && (
                <FormHelperText error>Please enter valid name.</FormHelperText>
              )}
              <Box mt={2}>
                <Typography variant="body2"> Description :</Typography>
                <TextField
                  placeholder="Please enter Description"
                  variant="outlined"
                  name="title"
                  fullWidth
                  rows={7}
                  multiline
                  inputProps={{
                    maxLength: 257,
                  }}
                  disabled={
                    isLoading1 || location?.state?.componentName === "view"
                  }
                  value={concertData.description}
                  onChange={(e) =>
                    setConcertData({
                      ...concertData,
                      ["description"]: e.target.value,
                    })
                  }
                  error={isSubmit && concertData.description === ""}
                  helperText={
                    isSubmit &&
                    concertData.description === "" &&
                    "Please enter description."
                  }
                />
                {concertData.description?.length > 256 && (
                  <FormHelperText error>
                    It should not exceed 256 characters.
                  </FormHelperText>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={3} align="center">
              <Box className={classes.mainTop}>
                <Box mb={1}>
                  <Typography variant="h6">Partner Logo</Typography>
                </Box>
                <Box>
                  <Box className={classes.partnerMainBox}>
                    <label htmlFor="raised-button-file">
                      <figure className="figure" style={{ margin: "0px" }}>
                        {partnerLogo === "" ? (
                          <>
                            {" "}
                            <Box my={2} className={classes.BoxImg}>
                              <Box className={classes.icomButton}>
                                <AiOutlinePlus
                                  style={{
                                    color: "#fff",
                                    fontSize: "25px",
                                  }}
                                />
                              </Box>
                              <Box mt={2}>
                                <Typography variant="body2">
                                  Logo Upload
                                </Typography>
                              </Box>
                            </Box>
                          </>
                        ) : (
                          <>
                            {" "}
                            <Avatar
                              className={classes.imgsection1}
                              src={partnerLogo}
                            />
                          </>
                        )}
                      </figure>
                    </label>
                    {partnerLogo !== "" && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setPartnerLogo("");
                          setPartnerLogo1(null);
                        }}
                        startIcon={<ClearIcon />}
                        style={{ marginLeft: "8px" }}
                        disabled={location?.state?.componentName === "view"}
                      >
                        Remove
                      </Button>
                    )}
                  </Box>
                  <>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="raised-button-file"
                      name="profile"
                      type="file"
                      onChange={handleLogoChange}
                    />
                  </>
                </Box>
                {isSubmit && partnerLogo === "" && (
                  <FormHelperText error>
                    Please upload the partner image.
                  </FormHelperText>
                )}
                {!isLogoSizeValid && (
          <FormHelperText error>
            Logo dimensions should not exceed 300x300 pixels.
          </FormHelperText>
        )}
                {isUploadingImage && (
                  <FormHelperText error>
                    Your logo is uploading, please wait.
                  </FormHelperText>
                )}
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
          {location?.state?.componentName !== "view" && (
            <>
              {location?.state?.componentName === "edit" ? (
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  style={{ marginLeft: "10px" }}
                  disabled={isLoading}
                  onClick={UpdatePartner}
                >
                  Update {isLoading && <ButtonCircularProgress />}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  style={{ marginLeft: "10px" }}
                  onClick={AddPartner}
                  disabled={isLoading}
                >
                  Add {isLoading && <ButtonCircularProgress />}
                </Button>
              )}
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
