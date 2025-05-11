import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Divider,
  Typography,
  makeStyles,
  Button,
  Paper,
} from "@material-ui/core";
import { useHistory, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainimg: {
    width: "100%",
    overflow: "hidden",
    height: "250px",
    position: "relative",
    backgroundPosition: "center !important",
    backgroundSize: "cover !important",
    backgroundRepeat: " no-repeat !important",
    borderRadius: "20px",
    backgroundColor: "#ccc !important",
    "& .MuiDivider-root": {
      backgroundColor: "#9595954d !important",
    },
  },
}));

const UserNftCard = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { data, type, index } = props;
  const updateDimensions = () => {
    var offsetWidth = document.getElementById("imagecard" + index).offsetWidth;
    var newoofsetWidth = offsetWidth - 80;
    document.getElementById("imagecard" + index).style.height =
      newoofsetWidth + "px";
  };

  useEffect(() => {
    updateDimensions();
  }, [data, index]);
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Paper
      style={{ borderRadius: "20px" }}
      onClick={() => history.push("/userlisted-nftdetails")}
    >
      <Box
        id={`imagecard${index}`}
        className={classes.mainimg}
        style={{ background: "url(" + data.image + ")", cursor: "pointer" }}
        onClick={() => {
          history.push("/pet-description");
        }}
      ></Box>
      <Box textAlign="center" my={2}>
        <Typography variant="h6">{data?.text}</Typography>
        <Box textAlign="center" className="displayCenter" pb={2}>
          <img src="images/coin.png" alt="coin" /> &nbsp;&nbsp;
          <Typography variant="body1">{data?.text1}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default UserNftCard;
