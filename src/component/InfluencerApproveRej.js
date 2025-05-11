import React, { useState } from "react";
import {
  Box,
  Button,
  makeStyles,
  Typography,
  IconButton,
  DialogActions,
  Dialog,
  DialogContent,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { toast } from "react-hot-toast";
import { putAPIHandlerCall } from "src/ApiConfig/service";
import LoadingComp from "./LoadingComp";

const useStyles = makeStyles((theme) => ({
  customizedButton: {
    position: "absolute",
    top: "0",
    right: "0",
    color: "rgb(120, 120, 120)",
  },
}));

const InfluencerApproveRej = ({
  rejectModal,
  setRejectModal,
  getInfluencerList,
  dataReject,
}) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [isApproove, setIsApprove] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [reason, setReason] = useState("");

  const handleRejectInflue = async (statusType) => {
    try {
      setIsLoading(true);
      const response = await putAPIHandlerCall({
        endPoint: "approveOrRejectInfluencer",
        dataToSend: {
          reason: reason !== "" ? reason : undefined,
          influencerId: dataReject?._id,
          influencerStatus: statusType,
        },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        setIsLoading(false);
        getInfluencerList();
        setRejectModal(false);
      } else {
        toast.error(response.data.responseMessage);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.responseMessage);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={rejectModal}
        onClose={() => !isLoading && setRejectModal(false)}
        maxWidth="xs"
      >
        <DialogActions>
          <IconButton
            onClick={() => !isLoading && setRejectModal(false)}
            className={classes.customizedButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.padding0}>
          <Box className={classes.becomeDialogBox} align="center">
            <Box mt={2} mb={2}>
              {isApproove ? (
                <Typography variant="h6">
                  Are you sure, you want reject influencer?
                </Typography>
              ) : (
                <Typography variant="h6">
                  Are you sure, you want approve/reject influencer?
                </Typography>
              )}

              {isApproove && (
                <>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    name="reason"
                    multiline
                    placeholder="Enter reason....."
                    value={reason}
                    onChange={(e) => {
                      if (e.target.value.length <= 256) {
                        setReason(e.target.value);
                      }
                    }}
                    rows="4"
                    disabled={isLoading}
                  />
                  <Box className="displaySpacebetween">
                    <FormHelperText error>
                      {isSubmit && reason === "" && "Please enter reason."}
                    </FormHelperText>
                    <Typography variant="subtitle1">
                      {reason.length}/256
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            <Box mt={2} mb={2} align="center">
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => {
                  if (!isApproove) {
                    setIsApprove(true);
                  } else {
                    setIsSubmit(true);
                    if (reason !== "") {
                      setIsSubmit(false);
                      handleRejectInflue("REJECTED");
                    }
                  }
                }}
                disabled={isLoading}
              >
                {!isApproove ? "Reject" : "Submit"}
              </Button>
              &nbsp;&nbsp;
              {!isApproove && (
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRejectInflue("APPROVED")}
                  disabled={isLoading || isApproove}
                >
                  Approve
                </Button>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      {isLoading && <LoadingComp />}
    </>
  );
};

export default InfluencerApproveRej;
