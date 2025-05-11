import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box, makeStyles, Button } from "@material-ui/core";
import Topheading from "src/component/TopHeading";
import Category from "./Category";

const useStyles = makeStyles((theme) => ({
  main: {
    "& .activeTab": {
      color: "#fff",
      border: "none",
      height: "48px",
      padding: "10px 35px",
      fontSize: "14px",
      background:
        "var(--Linear, linear-gradient(262deg, #62D3F0 13.12%, #35A5F5 83.57%))",
      boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
      fontWeight: "400",
      lineHeight: "21px",
      whiteSpace: "pre",
      borderRadius: "10px",
      backgroundColor: "#fff",
    },
    "& .diactiveTab": {
      color: "rgba(38, 36, 36, 0.87)",
      background: "#fff !important",
      boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
      border: "none",
      height: "48px",
      padding: "10px 35px",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "21px",
      whiteSpace: "pre",
      borderRadius: "10px",
      backgroundColor: "#fff",
    },
  },
}));

export default function InfluencerCategory() {
  const classes = useStyles();
  const [tab, setTab] = useState("NFT");
  const [page, setPage] = useState(1);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Box className={classes.main}>
      <Box className="tophead">
        <Topheading
          heading="  
          Category "
          searchname="Search here..."
        />
      </Box>

      <Box pb={2} align="center" className="displaySpacebetween">
        <Box className="displayStart">
          <Button
            variant="contained"
            className={tab == "NFT" ? "activeTab" : "diactiveTab"}
            onClick={() => {
              setPage(1);
              setTab("NFT");
            }}
          >
            NFT
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            className={tab == "Influencer" ? "activeTab" : "diactiveTab"}
            onClick={() => {
              setPage(1);
              setTab("Influencer");
            }}
          >
            Influencer
          </Button>
        </Box>
      </Box>
      <Category tab={tab} page={page} setPage={setPage} />
    </Box>
  );
}
