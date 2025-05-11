import React from "react";
import {
  Typography,
  Box,
  Divider,
} from "@material-ui/core";



function TopHeaderSection({ heading, butname }) {


  return (
    <Box mb={2}>
      <Typography variant="h3" style={{color:"#262424"}}>{heading}</Typography>
      <Box mt={2} mb={2}>
        <Divider className="borderBox"/>
      </Box>
    </Box>
  );
}

export default TopHeaderSection;
