import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  PostBox: {
    backgroundColor: "theme",
    position: "relative",

    "& .MuiCardHeader-root": {
      padding: "0 0 16px 0",
    },
    "& .MuiCardContent-root": {
      padding: "16px 16px 16px 0",
    },
  },
}));
export default function PhotoSkeleton({ type }) {
  const classes = useStyles();

  return (
    <Box className={classes.PostBox}>
      <Skeleton
        animation="wave"
        variant="rect"
        style={{ borderRadius: "20px", height: "150px" }}
      />
    </Box>
  );
}
