import React, { useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Container,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import TopHeading from "src/component/TopHeading";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  subAdminContainer: {
    "& .basicInfoBox": {
      padding: theme.spacing(4, 0),
    },
    "& h6": {
      whiteSpace: "pre",
    },
    "& p": {
      color: theme.palette.text.secondary,
      wordBreak: "break-word",
    },
    "& .MuiSvgIcon-fontSizeSmall": {
      color: theme.palette.secondary.main,
    },
    "& .paperContainer": {
      padding: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function ViewWhitelist() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box className={classes.subAdminContainer}>
      <TopHeading
        heading="View Whitelist"
        actions={
          <Button
            className={classes.backButton}
            startIcon={<ArrowBackIcon />}
            onClick={() => history.goBack()}
          >
            Back
          </Button>
        }
      />

      <Paper elevation={2} className={classes.paperContainer}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="primary">
              IP Address:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="body2" color="secondary">
              {location.state.ipAdress ? location.state.ipAdress : "..."}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="primary">
              Status:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="body2" color="secondary">
              {location.state.status}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="primary">
              Description:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="body2" color="secondary">
              {location.state.description ? location.state.description : "..."}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
