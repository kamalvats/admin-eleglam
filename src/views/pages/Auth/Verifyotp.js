import {
  Box,
  Button,
  makeStyles,
  FormControl,
  Typography,
  Container,
  Paper,
  FormHelperText,
} from "@material-ui/core";
import React, { useContext, useState, useMemo } from "react";
import OTPInput from "otp-input-react";
import { useHistory, useLocation } from "react-router-dom";
import { patchAPIHandler, putAPIHandlerCall } from "src/ApiConfig/service";
import toast from "react-hot-toast";
import { AuthContext } from "src/context/Auth";
import moment from "moment";
import LoadingComp from "src/component/LoadingComp";

const useStyles = makeStyles((theme) => ({
  verifyotpBox: {
    width: "100%",
    maxWidth: "620px",
    "& .subBox": {
      width: "100%",
      maxWidth: "441px",
      margin: "0 auto",
      paddingBottom: "24px",
      [theme.breakpoints.down("xs")]: {
        maxWidth: "100%",
      },
    },
  },

  otpFormControl: {
    "& input": {
      // color: theme.palette.primary.main,
      width: "49px !important",
      height: "49px !important",
      marginRight: "20px !important",
      border: "2px solid #4edaff",
      borderRadius: "10px",
      "@media(max-width:507px)": {
        marginRight: "8px !important",
      },
      "@media(max-width:460px)": {
        width: "41px !important",
        height: "41px !important",
      },
      "@media(max-width:380px)": {
        width: "31px !important",
        height: "31px !important",
      },
      "&:last-child": {
        marginRight: "0 !important",
      },
    },
  },
  otpTimer: {
    float: "right",
    marginRight: "29px",
    marginTop: "0px",
    marginBottom: "0px",
    color: "#f44336",
    "@media(max-width:548px)": {
      marginRight: "18px !important",
    },
    "@media(max-width:460px)": {
      marginRight: "8px !important",
    },
  },
}));

export default function Verifyotp() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [OTP, setOTP] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (values) => {
    try {
      setIsLoading(true);
      const response = await patchAPIHandler({
        endPoint: "verifyOTP",
        dataToSend: {
          email: location?.state,
          otp: OTP,
        },
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.responseMessage);

        history.push({
          pathname: "/reset",
          state: response?.data?.obj?.token,
        });
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error");
      toast.error(error.response.data.responseMessage);
    }
  };

  const handleResendOtp = async (values) => {
    try {
      setIsLoading(true);
      const response = await putAPIHandlerCall({
        endPoint: "resendOTP",
        dataToSend: {
          email: location?.state,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.responseMessage);
        localStorage.removeItem("otpTimer");
        auth.setEndtime(moment().add(3, "m").unix());
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error");
      toast.error(error.response.data.responseMessage);
    }
  };
  const timeLeft = useMemo(() => {
    if (localStorage.getItem("otpTimer")) {
      const storedTimer = localStorage.getItem("otpTimer");
      const parsedTimer = JSON.parse(storedTimer);
      !auth.timeLeft &&
        auth.setEndtime(
          moment()
            .add(parsedTimer?.minutes, "m")
            .add(parsedTimer?.seconds, "s")
            .unix()
        );
      return parsedTimer;
    }
  }, [localStorage.getItem("otpTimer")]);
  return (
    <Box className={classes.verifyotpBox}>
      <Container>
        <Paper elevation={2} style={{ padding: "28px 28px" }}>
          <Box className="displayCenter" mb={1}>
            <Typography variant="h2">Verification code </Typography>
          </Box>
          <Box textAlign={"center"} className="subBox">
            <Typography variant="body2" color="secondary">
              OTP has been sent to {location?.state} Please enter the OTP
            </Typography>
          </Box>
          <Box>
            <FormControl fullWidth className={classes.otpFormControl}>
              <OTPInput
                value={OTP}
                inputVariant="standard"
                autoComplete="off"
                onChange={setOTP}
                style={{ display: "flex", justifyContent: "center" }}
                autoFocus
                OTPLength={6}
                otpType="number"
                secure={false}
                disabled={isLoading}
              />
              <FormHelperText error>
                {isSubmit && OTP.length !== 6 && "Please enter valid otp."}
              </FormHelperText>
            </FormControl>
            <Box pt={1}>
              {timeLeft && timeLeft.seconds >= 0 && (
                <Typography variant="body2" className={classes.otpTimer}>
                  {timeLeft?.minutes} m : {timeLeft?.seconds} s
                </Typography>
              )}
            </Box>
          </Box>

          <Box align="center" mt={4}>
            {timeLeft && timeLeft.seconds >= 0 ? (
              <Typography variant="body2">Wait for resend OTP</Typography>
            ) : (
              <Typography variant="body2" style={{ cursor: "pointer" }}>
                If you don't receive any OTP? &nbsp;
                <span
                  className="textblueShadow"
                  onClick={() => handleResendOtp()}
                >
                  Resend OTP
                </span>
              </Typography>
            )}
          </Box>
          <Box mt={2} mb={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="transparentbutton"
              type="submit"
              disabled={isLoading}
              onClick={() => {
                setIsSubmit(true);
                if (OTP.length === 6) {
                  handleFormSubmit();
                  setIsSubmit(true);
                }
              }}
            >
              Submit
            </Button>
          </Box>

          <Box align="center">
            <Typography
              variant="body2"
              style={{ cursor: "pointer" }}
              onClick={() => !isLoading && history.push("/")}
            >
              <span className="textblueShadow">Back to Login</span>
            </Typography>
          </Box>
        </Paper>
      </Container>
      {isLoading && <LoadingComp />}
    </Box>
  );
}
