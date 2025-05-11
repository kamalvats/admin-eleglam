import React from "react";
import {
  Typography,
  Box,
  Dialog,
  IconButton,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  modaltext: {
    paddingBottom: "10px",

    "& h6": {
      fontWeight: "400",
      marginBottom: "8px",
      [theme.breakpoints.down("sm")]: {
        marginBottom: "0px",
      },
    },
    "& h2": {
      fontSize: "18px",
    },
    "& p": {
      wordBreak: "break-all",
      lineHeight: "22px",
      marginBottom: "8px",
      marginTop: "3px",
    },
    "& .MuiDialogActions-root": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
}));

export default function UserApiKeyDetail({ handleClose, open, viewData }) {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      keepMounted
      maxWidth="sm"
      fullWidth
      className={classes.modaltext}
    >
      <DialogTitle>
        Project and Key Details
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{ position: "absolute", right: 0, top: 0 }}
        >
          <ClearIcon />
        </IconButton>
      </DialogTitle>
      <Box mb={2}>
        <Divider />
      </Box>
      <DialogContent>
        <Box>
          <Grid container>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Typography variant="h6">Project Name:</Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Typography variant="body1">{viewData?.projectName}</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Typography variant="h6">API KEY Name:</Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Typography variant="body1">{viewData?.keyName}</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Typography variant="h6">Project ID:</Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Typography variant="body1">{viewData?.projectId}</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Typography variant="h6">Key Type:</Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Typography variant="body1">{viewData?.keyType}</Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={12} xs={12}>
              <Typography variant="h6">Created Date:</Typography>
            </Grid>
            <Grid item lg={9} md={9} sm={12} xs={12}>
              <Typography variant="body1">
                {viewData?.createdAt
                  ? moment(viewData?.createdAt).format("lll")
                  : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
