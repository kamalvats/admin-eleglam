import { getAPIHandler } from "src/ApiConfig/service";
import {
  Box,
  Typography,
  makeStyles,
  Grid,
  Divider,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Linechart from "src/component/Linechart";
import PhotoSkeleton from "src/Skeletons/PhotoSkeleton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  FaUser,
  FaListAlt,
  FaDatabase,
  FaChartBar,
  FaKey,
} from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  dashboardBox: {
    position: "relative",
    zIndex: "999",
    "& .mainBox": {
      borderRadius: "5px !important",
      padding: "30px",
    },

    "& .countBox1": {
      padding: "20px",
      background: "#fff",
      transition: "0.5s",
      borderRadius: "10px",
      border: "1px solid #59caf1",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
      },
    },
  },
}));

export default function DashdoardHome() {
  const classes = useStyles();
  const [adminDashboardData, setAdminDashboardData] = useState([]);
  const [graphData, setGraphData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  // const [sortCriteria, setSortCriteria] = useState("year");

  const getAdminDashboardApi = async () => {
    try {
      const response = await getAPIHandler({
        endPoint: "adminDashboard",
        
      });

      if (response?.data?.responseCode === 200) {
        const { dashboardFields, mappedData } = response.data;

        const newArray = mappedData.map((obj) => {
          const [dateKey, value] = Object.entries(obj)[0];

          return {
            month: new Date(dateKey).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            value: String(value),
          };
        });

        setAdminDashboardData(dashboardFields);
        setGraphData(newArray);
      } else {
        setAdminDashboardData([]);
        setGraphData([]);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setAdminDashboardData([]);
      setGraphData([]);
      console.log(error);
    }
  };

  const handleStatisticClick = (label) => {
    switch (label) {
      case "Total Users":
        history.push("/usermanagemet");
        break;
      case "Total white listed IP's":
        history.push("/order-mangement");
        break;
      case "Active Listing Api":
        history.push("/product-management");
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getAdminDashboardApi()
  }, []);



  const menuProps = {
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left",
    },
    elevation: 0,
    PaperProps: {
      style: {
        top: "0px !important",
        maxHeight: 250,
      },
    },
  };
  const dashboardCountItems = [
    {
      label: "Total Users",
      count: adminDashboardData?.totalUsers,
      icon: <FaUser />,
    },
    {
      label: "Active Users",
      count: adminDashboardData?.activeUser,
      icon: <FaListAlt />,
    },
    {
      label: "In-Active Users",
      count: adminDashboardData?.inActiveUser,
      icon: <FaDatabase />,
    },
    {
      label: "Total Products",
      count: adminDashboardData?.totalActivity ,
      icon: <FaChartBar />,
    },
    {
      label: "Total Orders",
      count: adminDashboardData?.totalActivity,
      icon: <FaChartBar />,
    },
    {
      label: "Pending Orders",
      count: adminDashboardData?.totalTestnetKey,
      icon: <FaKey />,
    },
    {
      label: "Completed Orders",
      count: adminDashboardData?.totalMainnetKey,
      icon: <FaKey />,
    },
  ];

  return (
    <Box className={classes.dashboardBox}>
      <Grid container spacing={3}>
        <Grid item xs={11} sm={6} md={12}>
          <Typography variant="h3" style={{ color: "#262424" }}>
            Dashboard
          </Typography>

          <Divider className="borderBox" />
        </Grid>
      </Grid>
      <Box>
        <Grid container spacing={2}>
          {dashboardCountItems &&
            dashboardCountItems.map((value) => (
              <Grid item xs={12} sm={6} md={3}>
                <Box
                  className="countBox1"
                  align="left"
                  onClick={() => handleStatisticClick(value.label)}
                  style={{ cursor: "pointer" }}
                >
                  <Box style={{ fontSize: "25px", color: "rgb(15 195 241)" }}>
                    {value.icon}
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      color="primary"
                      style={{ color: "#262424" }}
                    >
                      {/* {value.key} */}
                      {value.label}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      style={{ color: "rgba(38, 36, 36, 0.87)" }}
                    >
                      {value.count ? value.count : "0"}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}

          {isLoading &&
            [1, 2, 3, 4, 5, 6].map((val) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <PhotoSkeleton />
                </Grid>
              );
            })}
        </Grid>
      </Box>
      {/* <Linechart
        graphData={graphData}
        setSortCriteria={setSortCriteria}
        sortCriteria={sortCriteria}
      /> */}
    </Box>
  );
}
