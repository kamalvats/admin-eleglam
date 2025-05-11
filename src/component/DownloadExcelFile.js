import { downloadExcel, listUserHandlerExcel } from "src/utils";
import { Button, Typography, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { TbFileExport } from "react-icons/tb";
import { CSVLink } from "react-csv";
const useStyles = makeStyles((theme) => ({
  mainfilter: {
    "& .displayEnd": {
      marginTop: "30px",
    },
    "& .filterpaper": {
      padding: "30px",
    },
  },
  csvbutton: {
    border: "1px solid transparent",
    height: "24px",
    padding: "10px 39px",
    fontSize: "14px",
    fontWeight: "600",
    lineHeight: "21px",
    borderRadius: "10px",
    backgroundColor: "#0666EB",
    color: "#fff",
    "& p": {
      color: "#000",
      "&:hover": {
        color: "#ffffff",
      },
    },
  },
}));
export const DownloadExcelFile = ({
  headers,
  dataWithSerialNumber,
  filename,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const updatedFilename = `${filename}_${timestamp}.csv`;

  return (
    <Button variant="contained" color="primary">
      <CSVLink
        filename={updatedFilename}
        data={dataWithSerialNumber}
        headers={headers}
        style={{ textDecoration: "none", color: "currentcolor" }}
      >
        Download CSV
      </CSVLink>
      <TbFileExport style={{ fontSize: "22px", marginRight: "8px" }} />
    </Button>
  );
};
