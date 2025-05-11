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
  Divider,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { postAPIHandler, putAPIHandlerCall } from "src/ApiConfig/service";
import toast from "react-hot-toast";
import LoadingComp from "src/component/LoadingComp";
import JoditEditor from "jodit-react";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

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

export default function AddAnnouncement() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const announceId = location?.state?.data?._id;

  const [isSubmit, setIsSubmit] = useState(false);
  const [announceDetail, setAnnounceDetail] = useState({
    titleData: "",
    messageData: "",
  });
  const AddAnnouncementHandler = async () => {
    setIsSubmit(true);
    if (announceDetail.titleData !== "" && announceDetail.messageData !== "") {
      setIsLoading(true);
      try {
        const res = await postAPIHandler({
          endPoint: "addAnnouncement",
          dataToSend: {
            title: announceDetail.titleData,
            description: announceDetail.messageData,
          },
        });
        if (res.data.responseCode === 200) {
          toast.success(res.data.responseMessage);
          history.push("/list-announcement");
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
  const updateAnnouncementHandler = async () => {
    setIsSubmit(true);
    if (announceDetail.titleData !== "" && announceDetail.messageData !== "") {
      setIsLoading(true);
      try {
        const res = await putAPIHandlerCall({
          endPoint: "editAnnouncement",
          dataToSend: {
            title: announceDetail.titleData,
            description: announceDetail.messageData,
            announcementID: announceId,
          },
        });
        if (res.data.responseCode === 200) {
          toast.success(res.data.responseMessage);
          history.push("/list-announcement");
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
    setAnnounceDetail({
      titleData: editData?.title ? editData?.title : "",
      messageData: editData?.description ? editData?.description : "",
    });
  }, [location]);
  return (
    <Box className={classes.subAdminContatiner}>
      <Typography variant="h3">
        {location?.state?.componentName === "edit"
          ? "Update Announcement"
          : location?.state?.componentName === "view"
          ? "View Announcement"
          : "Add Announcement"}
      </Typography>

      <Box mt={2} mb={2}>
        <Divider className="borderBox" />
      </Box>
      <Paper elevation={2}>
        <Box>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12} md={12} lg={12}>
              <Box>
                <Typography variant="body2">Title : </Typography>
                <TextField
                  placeholder="Please announcement title"
                  variant="outlined"
                  name="title"
                  fullWidth
                  value={announceDetail.titleData}
                  InputProps={{
                    maxLength: 81,
                  }}
                  onChange={(e) =>
                    setAnnounceDetail({
                      ...announceDetail,
                      titleData: e.target.value,
                    })
                  }
                  disabled={
                    isLoading || location?.state?.componentName === "view"
                  }
                  helperText={
                    isSubmit &&
                    announceDetail.titleData === "" &&
                    "Please enter announcement title."
                  }
                  error={isSubmit && announceDetail.titleData === ""}
                />
                {announceDetail.titleData.length > 80 && (
                  <FormHelperText error>
                    It should not exceed 80 characters
                  </FormHelperText>
                )}
              </Box>
            </Grid>
            <Grid item sm={12} lg={12} md={12} xs={12}>
              <Typography variant="body2">Message :</Typography>
              {location?.state?.componentName === "view" ? (
                <Box>
                  <div
                    className="mainContent"
                    dangerouslySetInnerHTML={{
                      __html: announceDetail?.messageData,
                    }}
                  />
                </Box>
              ) : (
                <JoditEditor
                  value={announceDetail.messageData}
                  onChange={(content) =>
                    setAnnounceDetail({
                      ...announceDetail,
                      messageData: content,
                    })
                  }
                  tabIndex={1}
                />
              )}
              {isSubmit && announceDetail.messageData === "" && (
                <Typography
                  variant="body2"
                  color="error"
                  style={{ fontSize: "12px" }}
                >
                  Please enter announcement message.
                </Typography>
              )}
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
                  onClick={updateAnnouncementHandler}
                >
                  Update {isLoading && <ButtonCircularProgress />}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  color="secondary"
                  style={{ marginLeft: "10px" }}
                  onClick={AddAnnouncementHandler}
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
