import React, { useEffect, useState } from "react";
import MainFilter from "src/component/MainFilter";
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
  Button,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import Topheading from "src/component/TopHeading";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import { useHistory } from "react-router-dom";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import NoDataFound from "src/component/NoDataFound";
import {
  getAPIHandler,
  postAPIHandler,
  putAPIHandlerCall,
} from "src/ApiConfig/service";
import axios from "axios";
import toast from "react-hot-toast";
import { DownloadExcelFile } from "src/component/DownloadExcelFile";
import moment from "moment";
import { useLocation } from "react-router-dom";

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

export default function UserManagment() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [blockUser, setBlockUser] = useState(false);
  const [blockId, setBlockId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userListData, setUserListData] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [blockUserLoad, setBlockUserLoad] = useState(false);
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
        endPoint: "orderList",
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
          // status:
          //   sortCriteria !== "All"
          //     ? sortCriteria.toLocaleUpperCase()
          //     : undefined,
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

  const handleBlockUser = async (id) => {
    try {
      setBlockUserLoad(true);
      const res = await postAPIHandler({
        endPoint: "cancelOrder",
        dataToSend: {
          _id: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        getUserHistoryApi();
        setBlockUser(false);
      } else {
        toast.error(res.data.responseMessage);
        setBlockUser(false);
      }
      setBlockUserLoad(false);
    } catch (err) {
      toast.error(err?.response?.data?.responseMessage);
      console.error(err.res);
      setBlockUserLoad(false);
      setBlockUser(false);
    }
  };
  useEffect(() => {
    getUserHistoryApi();
  }, [page, sortCriteria]);

  const dataWithSerialNumber =
    userListData &&
    userListData?.map((user, index) => {
      return {
        srNo: index + 1,

        email: user.email,
        status: user.status,
        updatedAt: user.updatedAt
          ? moment(user.updatedAt).format("lll")
          : user.updatedAt,
      };
    });
  const headers = [
    { label: "Sr. No.", key: "srNo" },
    { label: "Email", key: "email" },
    { label: "Status", key: "status" },
    { label: "Created Date & Time", key: "updatedAt" },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, location.pathname]);
  return (
    <Box>
      <Box className="tophead">
        <Topheading heading="Order Management" searchname="Search here..." />
      </Box>
      <Box mb={2}>
        <MainFilter
          handleClear={handleClear}
          search={search}
          fromDate={fromDate}
          type={"Product"}
          setSearch={setSearch}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleCallApi={getUserHistoryApi}
          placeholder="Search by email"
          sortCriteria={sortCriteria}
          handleSortChange={handleSortChange}
        />
      </Box>

      {/* <Box mb={2} display="flex" justifyContent="end">
        <DownloadExcelFile
          headers={headers} 
          dataWithSerialNumber={dataWithSerialNumber}
          getUserHistoryApi={getUserHistoryApi}
          filename={"User_Details.csv"}
        />
      </Box> */}
      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>Sr.No.</TableCell>

              <TableCell>Order Id</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Way Bill</TableCell>
              <TableCell>Product Count</TableCell>
              <TableCell>Total Amt</TableCell>
              <TableCell>Payment Type</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userListData &&
              userListData.map((value, i) => (
                <TableRow>
                  <TableCell> {(page - 1) * 10 + i + 1}</TableCell>
                  <TableCell>{value.orderId}</TableCell>
                  <TableCell>{value.userData.email}</TableCell>
                  <TableCell>{value.wayBill}</TableCell>
                  <TableCell>{value.products.length}</TableCell>
                  <TableCell>{value.amount}</TableCell>
                  <TableCell>{value.paymentType}</TableCell>
                  <TableCell>{value.paymentStatus}</TableCell>
                  <TableCell>
                  <span
                      style={{
                        color:
                          value.status === "CANCELLED"
                            ? "red"
                            : value.status === "DELIVERED"
                            ? "green"
                            : value.status === "PENDING"
                            ? "orange"
                            : "black",
                      }}
                    >
                      {value.status === "CANCELLED"
                        ? "Cancel"
                        : value.status === "DELIVERED"
                        ? "Completed"
                        : value.status === "PENDING"
                        ? "Pending"
                        : value.status}
                    </span>
                  </TableCell>
                  {/* <TableCell>+91 8802642953</TableCell> */}

                  <TableCell>{moment(value.createdAt).format("lll")}</TableCell>
                  
                  <TableCell>
                    <Box display="flex" justifyContent="flex-start">
                      <IconButton
                        onClick={() =>
                          history.push({
                            pathname: "/order-detail-page",
                            state: { order: value._id },
                          })
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                      &nbsp;&nbsp;
                      <IconButton
                        style={{
                          backgroundColor:
                            value.status === "PENDING"
                              ? "#EF2114" // Red
                              : value.status === "DELIVERED" ||
                                value.status === "CANCELLED"
                              ? "grey"
                              : "#008CF2", // Default color for other statuses (optional)
                          cursor:
                            value.status === "PENDING"
                              ? "pointer"
                              : "not-allowed",
                        }}
                        disabled={value.status !== "PENDING"}
                        onClick={() => {
                          if (value.status === "PENDING") {
                            setBlockUser(true);
                            setBlockId(value);
                            console.log("Blocked User ID/Object:", value);
                          }
                        }}
                      >
                        <BlockIcon />
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
      {blockUser && (
        <ConfirmationDialogBox
          openModal={blockUser}
          heading="Block"
          description={`Are you sure, you want to 
            cancel this order?`}
          handleClose={() => setBlockUser(false)}
          handleSubmit={() => {
            console.log("Block ID in ConfirmationDialogBox:", blockId?._id);
            handleBlockUser(blockId?._id);
          }}
          
          isLoading={blockUserLoad}
        />
      )}
    </Box>
  );
}
