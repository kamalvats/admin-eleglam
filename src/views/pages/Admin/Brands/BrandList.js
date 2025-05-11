import React, { useEffect, useState } from "react";
import {
  Box,
  TableRow,
  makeStyles,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  IconButton,
  Avatar,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Topheading from "src/component/TopHeading";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import NoDataFound from "src/component/NoDataFound";
import { getAPIHandler } from "src/ApiConfig/service";
import axios from "axios";
import moment from "moment";
import { useHistory } from "react-router-dom";
import MainFilter from "src/component/MainFilter";

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
  Pagination: {
    "& .MuiPagination-ul": {
      justifyContent: "flex-end",

      marginTop: "10px",
      display: "flex",
    },
  },
}));

function BrandList() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [userListData, setUserListData] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [sortCriteria, setSortCriteria] = useState("All");
  const [search, setSearch] = useState("");
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [isClear, setIsClear] = useState(false);
  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };
  const handleClear = () => {
    setSearch("");
    setToDate(null);
    setFromDate(null);
    setIsClear(true);
    setSortCriteria("All");
  };
  useEffect(() => {
    if (isClear) {
      getUserHistoryApi();
    }
  }, [isClear]);

  const getUserHistoryApi = async (source, checkFilter) => {
    try {
      const response = await getAPIHandler({
        endPoint: "brandlists",
        source: source,
        paramsData: {
          page: page,
          limit: "10",
          search: search !== "" ? search : undefined,
          fromDate: fromDate
            ? moment(fromDate).format("YYYY-MM-DDT00:00").toString()
            : undefined,
          toDate: toDate
            ? moment(toDate).format("YYYY-MM-DDT11:59").toString()
            : undefined,
          status:
            sortCriteria !== "All"
              ? sortCriteria.toLocaleUpperCase()
              : undefined,
        },
      });
      if (response?.data?.responseCode === 200) {
        setUserListData(response.data.result.docs);
        setNoOfPages(response.data.result.pages);
        setIsLoading(false);
      } else {
        setUserListData([]);
        setIsLoading(false);
        setNoOfPages(1);
        setPage(1);
      }
      setIsClear(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setUserListData([]);
      setNoOfPages(1);
      setIsClear(false);
      setPage(1);
    }
  };

  useEffect(() => {
    getUserHistoryApi(); 
  }, [page, sortCriteria]);
  return (
    <Box>
      <Box className="tophead">
        <Topheading heading="Brand List" searchname="Search here..." />
      </Box>
      <Box mb={2}>
        <MainFilter
          handleClear={handleClear}
          search={search}
          fromDate={fromDate}
          setSearch={setSearch}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleCallApi={getUserHistoryApi}
          placeholder="Search by brand name"
          sortCriteria={sortCriteria}
          handleSortChange={handleSortChange}
          type="influencer"
        />
      </Box>
      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>Sr.No.</TableCell>
              <TableCell>Brand Name</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userListData &&
              userListData.map((value, i) => (
                <TableRow>
                  <TableCell> {(page - 1) * 10 + i + 1}</TableCell>
                  <TableCell>
                    {value.brandName ? value.brandName : "..."}
                  </TableCell>
                  <TableCell>
                    <Avatar
                      src={value?.brandLogo ? value?.brandLogo : "img.png"}
                      alt={value.brandName}
                    />
                  </TableCell>
                  <TableCell>
                    {moment(value?.createdAt).format("lll")}
                  </TableCell>
                  <TableCell>
                    <span
                      style={{
                        color:
                          value.brandApproval === "APPROVED"
                            ? "#0CA51C"
                            : value.brandApproval === "PENDING"
                            ? "#dca400"
                            : value.brandApproval === "REJECTED"
                            ? "#EF2114"
                            : "#000",
                      }}
                    >
                      {value.brandApproval}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-start">
                      <IconButton
                        onClick={() => {
                          history.push({
                            pathname: "/view-brandnft",
                            search: value?._id?.toString(),
                          });
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && <TopTradingSkeleton skeleton={[1, 2, 3, 4, 5, 6]} />}
        {!isLoading && userListData && userListData?.length === 0 && (
          <NoDataFound />
        )}
      </TableContainer>
      <Box mt={3} mb={1} className="displayEnd">
        {!isLoading && userListData && noOfPages > 1 && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            shape="rounded"
          />
        )}
      </Box>
    </Box>
  );
}

export default BrandList;
