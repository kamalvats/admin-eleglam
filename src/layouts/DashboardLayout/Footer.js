import React from "react";
import { Box, Typography, Divider } from "@material-ui/core";

const Footer = () => {
  return (
    <Box>
      <Divider className="borderBox" />
      <Box className="displayCenter">
        <Typography variant="body2" style={{ color: "#262424" }}>
          Copyright &copy; {new Date().getFullYear()}.&nbsp;
          <span className="textblueShadow" style={{ fontSize: "18px" }}>
            Hover
          </span>
          &nbsp; Integral Business Limited
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
