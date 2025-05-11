import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  makeStyles,
  Typography,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import React from "react";
import { RxCross2 } from "react-icons/rx";
import LoadingComp from "./LoadingComp";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles(() => ({
  modalText: {
    "& .MuiDialogTitle-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 17px",
    },
    "& .MuiDialogActions-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      marginTop: "30px",
    },
  },
}));
export default function ConfirmationDialogBox({
  openModal,
  handleClose,
  heading,
  description,
  handleSubmit,
  isLoading,
}) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={openModal}
        keepMounted
        onClose={() => !isLoading && handleClose()}
        className={classes.modalText}
      >
        <DialogTitle>
          <Typography variant="h4">{heading}</Typography>
          <Box
            disabled={isLoading}
            onClick={() => handleClose()}
            color="primary"
            style={{
              height: "0px",
              position: "absolute",
              right: "10px",
              top: "4px",
              cursor: "pointer",
            }}
          >
            <ClearIcon style={{ color: "rgba(8, 5, 21, 0.6)" }} />
          </Box>
        </DialogTitle>
        <Box>
          <Divider />
        </Box>

        <DialogContent>
          <Typography variant="h6" color="secondary" align="center">
            {description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          &nbsp; &nbsp;
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && <LoadingComp />}
    </div>
  );
}
