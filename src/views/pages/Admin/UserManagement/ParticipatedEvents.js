import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  mintedBox: {
    marginTop: "8px",
    padding: "20px",

    "& p": {
      wordBreak: "break-word",
      color: "rgba(255, 255, 255, 0.6)",

      "& span": {
        color: "#fff",
        fontWeight: 500,
      },
    },
  },
}));

export default function ParticipatedEvents() {
  const classes = useStyles();
  return (
    <Box className={classes.mintedBox}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={6} lg={4}>
          <Box className="displaySpacebetween">
            <Box>
              <Typography variant="body2">
                <span>The Speed Society</span>
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">:</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={6} lg={4}>
          <Box className="displayEnd">
            <Box>
              <Typography variant="body2">Arvind Tyagi</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}></Grid>
        <Grid item xs={6} sm={4} md={6} lg={4}>
          <Box className="displaySpacebetween">
            <Box>
              <Typography variant="body2">
                <span>The Iron Maidens</span>
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">:</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={6} lg={4}>
          <Box className="displayEnd">
            <Box className="displaySpacebetween">
              <Box>
                <Typography variant="body2">Rohit</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}></Grid>
        <Grid item xs={6} sm={12} md={6} lg={4}>
          <Box className="displaySpacebetween">
            <Box>
              <Typography variant="body2">
                <span>Team Twin Turbo</span>
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">:</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={6} lg={4}>
          <Box className="displayEnd">
            <Box>
              <Typography variant="body2">Jatin</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}></Grid>
        <Grid item xs={6} sm={4} md={6} lg={4}>
          <Box className="displaySpacebetween">
            <Box>
              <Typography variant="body2">
                <span>Sports Car Lovers</span>
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">:</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={6} lg={4}>
          <Box className="displayEnd">
            <Box>
              <Typography variant="body2">Amol</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}></Grid>
      </Grid>
    </Box>
  );
}
