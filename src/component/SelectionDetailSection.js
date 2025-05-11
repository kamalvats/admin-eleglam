import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Grid,
  Button,
  Container,
} from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  raceNow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-90px",
    width: "200px",
    [theme.breakpoints.down("md")]: {
      marginTop: "-80px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "-70px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "0px",
    },
  },
  CarDetail: {
    "& h6": {
      color: "#959595",
      position: "relative",
      zIndex: "1",
    },
    "& p": {
      color: "#959595",
      fontSize: "16px",
      fontWeight: "400",
    },
    "& .detailBox": {
      marginTop: "8px",
      background:
        "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
      boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
      backdropFilter: "blur(21px)",
      width: "100%",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",

      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        background:
          "radial-gradient(54.8% 53% at 50% 50%, #151515 0%, rgba(21, 21, 21, 0) 100%) ,\nradial-gradient(60% 51.57% at 50% 50%, #0938DF 0%, rgba(9, 56, 223, 0) 100%) ,\nradial-gradient(69.43% 69.43% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
      },
      "&:after": {
        content: "'' ",
        position: "absolute",

        inset: "2px",
        background:
          "linear-gradient(152.97deg, rgb(117 117 117) 0%, rgb(17 17 17) 100%)",
      },
      "& h6": {
        color: "#FAFFFF",
        fontWeight: "300",
        fontSize: "13px",
      },
    },
  },
  raceMainBox: {
    position: "relative",
    marginTop: "120px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "65px",
    },
    "& .bottomimg": {
      width: "auto",
      maxWidth: "100%",
      position: "relative",
      [theme.breakpoints.down("md")]: {
        maxWidth: "800px",
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "auto",
        maxWidth: "100%",
      },
    },
    "& .Topimg": {
      position: "absolute",
      transform: "translate(-50%,-50%)",
      top: "33%",
      left: "50%",
      width: "auto",
      maxWidth: "100%",
      [theme.breakpoints.down("md")]: {
        maxWidth: "500px",
        width: "100%",
      },
      [theme.breakpoints.down("sm")]: {
        maxWidth: "400px",
        width: "100%",
      },
      [theme.breakpoints.down("xs")]: {
        maxWidth: "200px",
        width: "100%",
      },
    },
  },
  marginTopBox: {
    marginTop: "32px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "320px",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "319px",
    },
  },
}));

function SelectionDetailSection(props) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { data, index, setCarData } = props;

  return (
    <>
      <Box className={classes.root}>
        <Container maxWidth="lg">
          <Box align="center">
            {window.location.pathname === "/car-selection" && (
              <Box className={classes.raceMainBox}>
                <img src="images/racestage.png" className="bottomimg" />
                <img src="images/cartop.png" className="Topimg" />
              </Box>

              // <figure className={classes.getThisCarfigure}>
              //   <img
              //     src="./images/SelectionCarImage.png"
              //     alt="SelectionCarImage Image"
              //     width="100%"
              //   />
              // </figure>
            )}
            {window.location.pathname === "/character-selection" && (
              <figure className={classes.getThisCarfigure}>
                <img
                  src="./images/CharacterSelection.png"
                  alt="CharacterSelection Image"
                  width="100%"
                />
              </figure>
            )}

            <Box className={classes.raceNow}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/character-selection")}
              >
                CHOOSE VEHICLE
              </Button>
            </Box>
          </Box>
          <Box>
            <Container maxWidth="sm">
              <Box mt={4} className={classes.marginTopBox}>
                <Grid container spacing={2}>
                  <Grid item xs={6} lg={4} md={4} sm={4}>
                    <Box className={classes.CarDetail}>
                      <Typography variant="body2">Car:</Typography>
                      <Box className="detailBox">
                        <Typography variant="h6">{data?.color}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} lg={4} md={4} sm={4}>
                    <Box className={classes.CarDetail}>
                      <Typography variant="body2">Rarity:</Typography>
                      <Box className="detailBox">
                        <Typography variant="h6">
                          {data?.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6} lg={4} md={4} sm={4}>
                    <Box className={classes.CarDetail}>
                      <Typography variant="body2">Generated:</Typography>
                      <Box className="detailBox">
                        <Typography variant="h6">{data?.number}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default SelectionDetailSection;
