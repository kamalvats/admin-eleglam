import { Box, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  dazeCardsBox: {
    position: "relative",
    zIndex: "1",
    "& .liveBox": {
      background: "#C20000",
      borderRadius: "8px",
      padding: "5px 15px",
    },
    "& .imgBox": {
      padding: "35px 0px",
      "& img": {
        maxWidth: "100%",
        width: "auto",
      },
    },
  },
}));

export default function DazeCards() {
  const classes = useStyles();
  return (
    <Box className={classes.dazeCardsBox}>
      <Box className="dazeBox">
        <Box style={{ position: "relative", zIndex: "999" }}>
          <Box className="centerCircle"></Box>
          <Box
            className="displaySpacebetween"
            style={{ alignItems: "flex-start" }}
          >
            <Box>
              <Typography variant="h5">Daze of Chunder</Typography>
              <Box mt={0.7}>
                <Typography variant="h6"></Typography>
              </Box>
            </Box>
            <Box className="liveBox">
              <Typography variant="body2">Live</Typography>
            </Box>
          </Box>
          <Box className="imgBox">
            <img src="images/daze.png" />
          </Box>
          <Box className="displaySpacebetween">
            <Box className="displayStart">
              <Box mr={1}>
                <img src="images/dazetime.png" style={{ maxWidth: "100%" }} />
              </Box>
              <Typography variant="body2" style={{ color: "#B1AFAF" }}>
                3d 5h 45m left
              </Typography>
            </Box>
            <Typography variant="body2">
              <span style={{ color: "#B1AFAF" }}>100000</span> PVV
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
