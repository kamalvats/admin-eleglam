import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
import Topheading from "src/component/TopHeading";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  flexBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  welcomeBox: {
    "& h1": {
      textAlign: "center",
      lineHeight: "137.1%",
      letterSpacing: "0.1em",
    },
  },
  mintedBox: {
    padding: "20px",
    "& h6": {
      fontWeight: "300",
      fontSize: "35px",
      lineHeight: "130%",
    },
    "& p": {
      wordBreak: "break-word",
      color: "rgba(255, 255, 255, 0.6)",
      marginTop: "8px",
      marginBottom: "8px",
      fontWeight: 300,
    },
    "& .formControl": {
      marginTop: "8px",
      marginBottom: "8px",
    },
  },
  typoBox: {
    "& p": {
      color: "rgba(38, 36, 36, 0.87)",
      marginTop: "8px",
      marginBottom: "8px",
      fontWeight: 300,
    },
  },
}));

export default function ViewFaq() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  function checkHeading(item) {
    return location?.state?.viewStatic ? item.title : item?.question;
  }
  function checkContent(item) {
    return location?.state?.viewStatic ? item.description : item?.answer;
  }

  return (
    <Box className={classes.viewcontentBox}>
      <Topheading
        heading={location?.state?.viewStatic ? "View Static" : "View FAQ"}
      />
      <Paper elevation={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box mt={1} mb={2}>
              <Typography variant="h5">
                {location?.state ? checkHeading(location?.state) : "..."}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">
                {location?.state ? (
                  <div
                    style={{ wordBreak: "break-word" }}
                    dangerouslySetInnerHTML={{
                      __html: checkContent(location?.state),
                    }}
                  ></div>
                ) : (
                  "..."
                )}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box py={3} align="center" className="displayCenter">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
