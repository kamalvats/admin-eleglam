import { Box, Typography, makeStyles } from "@material-ui/core";
import React from "react";
const useStyles = makeStyles((theme) => ({
  mainLoading: {
    width: "100vw",
    minWidth: "100vw",
    height: "100vh",
    zIndex: "999999999999",
    position: "fixed",
    background: "#141627ed",
    top: "0",
    left: "0",
    display: "block",
    // pointerEvents: "none",
    "& .img": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: "999999999999",
    },
  },
}));

export default function LoadingComp() {
  const classes = useStyles();
  return (
    <Box className={classes.mainLoading}>
      <img src="/images/eg-logo.jpg" alt="loading" className="img" />
      <Typography
        variant="h5"
        className="img"
        style={{ top: "55%", color: "#fff" }}
      >
        Loading...
      </Typography>
    </Box>
  );
}
