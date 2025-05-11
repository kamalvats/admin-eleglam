import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Topheading from "src/component/TopHeading";
const useStyles = makeStyles((theme) => ({
  tableBox: {
    minWidth: "800px",
  },
  MainBox: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 30px",
    [theme.breakpoints.down("md")]: {
      padding: "10px 0px",
    },

    "& .SubBoxMain": {
      background: "#fff",
      borderRadius: "10px",
      "& .MuiTypography-h5": {
        color: "#000",
      },
      "& .MuiTypography-h6": {
        color: "#262626",
      },
      "& .MuiTypography-body2": {
        color: "#262626",
      },
      "& .subBox": {
        display: "flex",
        // gap: "10px",
        alignItems: "center",
        padding: "20px 0px",
      },
      "& .collectionBox": {
        textAlign: "center",
      },
      "& .GridContainermain": {
        padding: "20px",
        "& .GridContainerText": {
          padding: "15px 0px",
        },
        "& .GridSubContainer": { alignItems: "center" },
      },
    },
  },
}));
function Control() {
  const classes = useStyles();
  const [mrketplaceFee, setMarketplaceFee] = useState([]);
  const [collectionFee, setCollectionFee] = useState([]);
  return (
    <Box>
      <Box className="tophead">
        <Topheading heading="Admin Controls" />
      </Box>
      <Box className={classes.MainBox}>
        <Grid container spacing={3} className="SubBoxMain">
          <Grid
            container
            spacing={2}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className="GridContainermain"
          >
            <Grid item lg={12} className="GridContainerText">
              <Typography variant="h5">Fee Management</Typography>
            </Grid>

            <Grid container spacing={1} xs={12} className="GridSubContainer">
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography variant="h6">Marketplace Fee</Typography>
              </Grid>

              <Grid item lg={4} md={4} sm={9} xs={8}>
                <TextField
                  variant="outlined"
                  placeholder="Enter fee"
                  value={mrketplaceFee}
                  onChange={(e) => setMarketplaceFee(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid item lg={4} md={4} sm={3} xs={4}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            lg={6}
            md={6}
            sm={12}
            xs={12}
            className="GridContainermain"
          >
            <Grid item lg={12} className="GridContainerText">
              <Typography variant="h5">
                Hot Collections Fee Management
              </Typography>
            </Grid>

            <Grid container spacing={1} xs={12} className="GridSubContainer">
              <Grid item lg={4} md={4} sm={12} xs={12}>
                <Typography variant="h6">Hot Collections Fee</Typography>
              </Grid>

              <Grid item lg={4} md={4} sm={9} xs={8}>
                <TextField
                  variant="outlined"
                  placeholder="Enter qie fee"
                  value={collectionFee}
                  onChange={(e) => setCollectionFee(e.target.value)}
                  fullWidth
                />
              </Grid>

              <Grid item lg={4} md={4} sm={3} xs={4}>
                <Button variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            style={{ display: "flex", justifyContent: "flex-end" }}
            lg={12}
            className="collectionBox"
          >
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <Typography variant="body2">
                Current collection fee O QIE
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Control;
