import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { AnimationOnScroll } from "react-animation-on-scroll";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    position: "relative",
    "& .TopRightVector": {
      position: "absolute",
      top: "-10px",
      right: "-54px",
      width: "70%",
    },
    "& .BottomLeftVector": {
      width: "70%",
      position: "absolute",
      bottom: "-10px",
      left: "-45px",
    },
    "& .HeadingImage": {
      position: "absolute",
      bottom: "-15px",
      right: "0px",
      width: "42px",
    },
  },
}));

const HeadingComponent = ({ title }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {title === "ENVIROMENT" && (
        <Typography variant="h5" style={{ position: "absolute", top: "-25px" }}>
          MULTIPLE
        </Typography>
      )}
      <AnimationOnScroll animateIn="animate__fadeInRight">
        <img src="images/TopRightVector.png" className="TopRightVector" />
      </AnimationOnScroll>
      
        <Typography variant="h2">{title}</Typography>
    
      <AnimationOnScroll animateIn="animate__lightSpeedInLeft">
      <img src="images/BottomLeftVector.png" className="BottomLeftVector" />
      </AnimationOnScroll>
      <AnimationOnScroll animateIn="animate__shakeX">
      <img src="images/HeadingImage.png" className="HeadingImage" />
        </AnimationOnScroll>
    </Box>
  );
};

export default HeadingComponent;
