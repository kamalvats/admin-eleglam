import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  imgBox: {
    maxWidth: "300px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "200px",
      width: "100%",
    },
  },
  mainBox: {
    "& h3": {
      marginTop: "6px",
      color: "rgba(0, 0, 0, 0.87)",
    },
  },
}));
export default function NoDataFound({ text }) {
  const classes = useStyles();
  return (
    <Box className={`${classes.mainBox} displayCenter`} mt={6} mb={4}>
      <Box align="center">
        <img
          src="images/noResult.png"
          alt="nodata"
          className={classes.imgBox}
        />
        <Typography variant="h3">{text ? text : "No data found"}</Typography>
      </Box>
    </Box>
  );
}
