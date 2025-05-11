import React, { useState } from "react";
import {
  Box,
  TableRow,
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  Typography,
  Grid,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import NoDataFound from "src/component/NoDataFound";
import moment from "moment";
import UserApiKeyDetail from "./UserApiKeyDetail";

const useStyles = makeStyles((theme) => ({
  tableBox: {
    minWidth: "800px",
    "& .MuiIconButton-root": {
      backgroundColor: "#008CF2",
      padding: "8px",
      "& svg": {
        color: "#fff",
        fontSize: "18px",
      },
    },
  },
}));

export default function Apikey({
  userApiKeyList,
  page,
  noOfPages,
  noOfTotalPages,
  isLoading,
  setPage,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState("");
  const handleClickOpen = (value) => {
    setOpen(true);
    setViewData(value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={6} lg={3}>
          <Box align="left" className="apicardBox" mb={2}>
            <Typography variant="h6">Total No. Of Keys</Typography>
            <Typography variant="h3">{noOfTotalPages}</Typography>
          </Box>
        </Grid>
      </Grid>
      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>Sr.No.</TableCell>
              <TableCell>Project ID</TableCell>
              <TableCell>Key Type</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>API KEY Name</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userApiKeyList &&
              userApiKeyList.map((value, i) => (
                <TableRow>
                  <TableCell> {(page - 1) * 10 + i + 1}</TableCell>
                  <TableCell>{value.projectId}</TableCell>
                  <TableCell>{value.keyType}</TableCell>
                  <TableCell>
                    {value?.projectName.slice(0, 24)}
                    {value?.projectName.length > 24 && "..."}
                  </TableCell>
                  <TableCell>
                    {value?.keyName.slice(0, 24)}
                    {value?.keyName.length > 24 && "..."}
                  </TableCell>
                  <TableCell>{moment(value.createdAt).format("L")}</TableCell>
                  <TableCell
                    onClick={() => handleClickOpen(value)}
                    style={{
                      textDecoration: "underline",
                      color: "#3f51b5",
                      cursor: "pointer",
                    }}
                  >
                    view
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && <TopTradingSkeleton skeleton={[1, 2, 3, 4, 5, 6]} />}
        {!isLoading && userApiKeyList && userApiKeyList?.length === 0 && (
          <NoDataFound />
        )}
      </TableContainer>
      <Box mt={3} mb={1} align="right">
        {!isLoading && noOfTotalPages > (page === 1 ? 10 : 0) && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            shape="rounded"
          />
        )}
      </Box>
      <UserApiKeyDetail
        open={open}
        handleClose={handleClose}
        viewData={viewData}
      />
    </Box>
  );
}
