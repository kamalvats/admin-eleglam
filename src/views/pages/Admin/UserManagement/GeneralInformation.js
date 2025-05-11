import {
  Avatar,
  Box,
  Container,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  generalMainBox: {
    marginTop: "24px",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "12px",
    },
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
  },
  profileImg: {
    width: "120px",
    height: "120px",
    border: "4px solid #fff",
    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.2)",
    borderRadius: "50%",
  },
  subProfileBox: {
    fontWeight: 500,
    color: "#333",
  },
}));

export default function GeneralInformation({ viewUserData }) {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.generalMainBox}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          src={viewUserData?.profilePic ? viewUserData?.profilePic : "img.png"}
          alt={viewUserData?.name}
          className={classes.profileImg}
        />
        <Box mt={3} textAlign="center">
          <Typography variant="h6">
            {viewUserData?.name ? viewUserData?.name : "..."}
          </Typography>
          <Typography variant="body2">
            {viewUserData?.email ? viewUserData?.email : "..."}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
