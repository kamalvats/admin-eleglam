import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import Footer from "./Footer";
const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
    // height: "100%",
    // overflow: "hidden",
    // width: "100%",
    position: "relative",
    backgroundSize: "100%",
    backgroundImage: "url(/images/background.png)",
    // background:"#7E563D",
    backgroundRepeat: "repeat",
    backgroundPosition: "top",
  },

  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    position: "relative",
    paddingTop: 70,
    minHeight: "calc(100vh - 75px)",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
    "@media (max-width:767px)": {
      paddingTop: "70px !important",
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "hidden",
    position: "relative",
    padding: "20px 40px 25px ",
    "@media (max-width: 1280px)": {
      padding: "20px 33px 20px ",
    },
    [theme.breakpoints.down("md")]: {
      padding: "20px 30px 10px ",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "20px 24px 10px ",
    },
  },
}));

const DashboardLayout = ({ children }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content} id="main-scroll">
            {children}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default DashboardLayout;
