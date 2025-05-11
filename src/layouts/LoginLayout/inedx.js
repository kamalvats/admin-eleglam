import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Logo from "src/component/Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#000",
    // position: "relative",
    // zIndex: "1",
    // overflow: "hidden",
    background: "rgba(255, 255, 255, 0.03)",
    backgroundSize: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    backgroundImage: "url(/images/background.png)",
    backgroundRepeat: "repeat",
    backgroundPosition: "top",
  },
  LoginLayout: {
    minHeight: "calc(100vh - 0px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  logoBox: {
    marginBottom: "25px",
    cursor:"pointer"
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  console.log(history.location);
  return (
    <div className={classes.root}>


      <div
        style={
          history.location.pathname !== "/"
            ? { display: "block" }
            : { display: "none" }
        }
      ></div>

      <div className={classes.LoginLayout}>
        {/* <Box onClick={()=>history.push("/")} className={classes.logoBox}>
          <Logo />
        </Box> */}
        {children}
      </div>
    </div>
  );
};

export default LoginLayout;
