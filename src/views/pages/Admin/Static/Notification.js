import {
  Box,
  Button,
  Typography,
  makeStyles,
  Dialog,
  Avatar,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  notificationBox: {
    position: "relative",
    zIndex: "999",
    "& p": {
      color: "#262424",
    },
    "& .notBox": {
      marginBottom: "10px",
    },
  },
}));
const dataa = [
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
  {
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor lacu justo commodo",
    date: "10/10/2024",
    time: "10:30pm",
  },
];

export default function Notification() {
  const classes = useStyles();
  const [openClear, setOpenClear] = useState(false);
  return (
    <Box className={classes.notificationBox}>
      <Box
        className="displaySpacebetween displayBlock"
        style={{ borderBottom: "1px solid rgba(97, 210, 240, 0.3411764706)", paddingBottom: "17px" }}
      >
        <Typography variant="h3" style={{ color: "#262424" }}>
          Notifications
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenClear(true)}
        >
          Clear All
        </Button>
      </Box>
      <Box mt={3}>
        {dataa.map((value) => (
          <Paper elevation={2} className="notBox" my={1}>
            <Box className="displayStart">
              <Avatar src="images/profileimage.png" />
              <Box ml={2}>
                <Typography variant="body2" color="primary">
                  {value.text}
                </Typography>
                <Typography
                  variant="body2"
                  style={{ color: "rgb(24 141 242)", fontSize: "12px" }}
                >
                  {value.date}&nbsp;&nbsp;{value.time}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Dialog
        open={openClear}
        onClose={() => setOpenClear(false)}
        fullWidth
        maxWidth="xs"
      >
        <Box className="newModalBorder1" mt={2}>
        <Box align="center">
              <Box my={1}>
                <Typography variant="h5" color="primary" style={{color:"#262424"}}>
                  Clear notification
                </Typography>
              </Box>
              <Typography variant="body2" color="primary" style={{color:"rgba(38, 36, 36, 0.87)"}}>
                Are you sure want to clear all notification?
              </Typography>
              <Box className="displayCenter" mt={4} mb={2}>
                <Button
                  variant="contained"
                  color="primary"
                size="small"
                >
                  Yes
                </Button>
                <Box ml={3}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => setOpenClear(false)}
                  
                  >
                    No
                  </Button>
                </Box>
              </Box>
            </Box>
        </Box>
      </Dialog>
    </Box>
  );
}
