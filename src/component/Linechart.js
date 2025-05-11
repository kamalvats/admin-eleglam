import React from "react";
import ReactApexChart from "react-apexcharts";
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
  Paper
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    margin: "20px 0",
    position: "relative",
    overflow: "hidden",
    "& .topText": {
      "& h6": {
        "@media(max-width:599px)": {
          marginBottom: "8px",
        },
      },
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
  },
}));

const Linechart = ({ graphData,sortCriteria,setSortCriteria }) => {
  const classes = useStyles();
  let newArray =
    graphData &&
    graphData.map((obj) => ({
      month: Object.keys(obj)[0],
      value: String(Object.values(obj)[0]),
    }));
  const options = {
    chart: {
      id: "crypto-line",
      type: "line",
      height: "100%",
      toolbar: {
        show: false, // Hide the chart toolbar
      },
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: 3,
      dashArray: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#A2FF03"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    grid: {
      show: false,
    },
    colors: ["#36F097", "#1ED6FF", "#7D56E7"],
    xaxis: {
      show: true,
      labels: {
        show: true,
      },
      lines: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      categories: graphData ? graphData.map((vl) => vl.month) : [],
    },
    yaxis: {
      show: true, // Hide the chart toolbar
      labels: {
        show: true,
      },
      lines: {
        show: false,
      },
      decimalsInFloat: 2, // Number of decimal places for y-axis values
    },
    legend: {
      show: true,
      showForSingleSeries: false,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "left",
      floating: false,
      fontSize: "12px",
      fontFamily: "Helvetica, Arial",
      fontWeight: 400,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 10,
      labels: {
        colors: "#f5f5f5",
        useSeriesColors: false,
      },
      markers: {
        width: 22,
        height: 4,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        customHTML: undefined,
        onClick: undefined,
        offsetX: -6,
        offsetY: -3,
      },
      itemMargin: {
        horizontal: 15,
        vertical: 2,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };
  const series = [
    {
      name: "Users",
      data: graphData ? graphData.map((vl) => vl.value) : [],
    },
  ];
  

  return (
    <Paper className={classes.chartContainer} elevation={2}>
      <Box className="displaySpacebetween topText" mb={4}>
      <Typography variant="h6">Total Users</Typography>
      <Box className="mainTab">
        <Box
          className={sortCriteria === "year" ? "tabActiveButtons" : "tabButtons"}
          onClick={() => setSortCriteria("year")}
        >
          <Typography variant="body2">Year</Typography>
        </Box>
        <Box
          className={sortCriteria === "month" ? "tabActiveButtons" : "tabButtons"}
          onClick={() => setSortCriteria("month")}
        >
          <Typography variant="body2">Month</Typography>
        </Box>
        <Box
          className={sortCriteria === "week" ? "tabActiveButtons" : "tabButtons"}
          onClick={() => setSortCriteria("week")}
        >
          <Typography variant="body2">Week</Typography>
        </Box>
      </Box>
      </Box>

      <ReactApexChart options={options} series={series} type="line" />
    </Paper>
  );
};

export default Linechart;
 