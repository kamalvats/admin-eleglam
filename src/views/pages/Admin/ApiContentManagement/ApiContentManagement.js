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
  Typography,
  Divider,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import Topheading from "src/component/TopHeading";
import { TbFileExport } from "react-icons/tb";
import { useHistory } from "react-router-dom";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import { MdEdit } from "react-icons/md";
import {
  deleteAPIHandler,
  getAPIHandler,
  patchAPIHandler,
  putAPIHandlerCall,
} from "src/ApiConfig/service";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { IoFileTrayFullSharp } from "react-icons/io5";

import { DownloadExcelFile } from "src/component/DownloadExcelFile";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import NoDataFound from "src/component/NoDataFound";
import toast from "react-hot-toast";

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
  apiContentBox: {
    "& .topText": {
      "& h3": {
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

export default function ApiContentManagement() {
  const classes = useStyles();
  const history = useHistory();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [iddd, setIddd] = useState("");
  const [apiData, setapiData] = useState([]);
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
      handleAPI();
    }
  }, [isClear]);

  const handleDeleteAPI = async () => {
    try {
      setIsLoading1(true);
      let dataToSend = {
        _id: iddd,
      };
      const response = await deleteAPIHandler({
        endPoint: "deleteproduct",
        dataToSend,
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        setIsLoading1(false);
        setOpenModal1(false);
        handleAPI();
      } else {
        setIsLoading1(false);
      }
    } catch (error) {
      console.log(" ---- error ", error);
      setIsLoading1(false);
    }
  };
  const handleBlockUnBlockAPI = async () => {
    try {
      setIsLoading1(true);
      let dataToSend = {
        _id: iddd?._id,
      };
      const response = await putAPIHandlerCall({
        endPoint: "activeDeactiveProduct",
        dataToSend,
      });
      if (response.data.responseCode === 200) {
        setIsLoading1(false);
        setOpenModal2(false);
        toast.success(response.data.responseMessage);
        handleAPI();
      } else {
        setIsLoading1(false);
      }
    } catch (error) {
      console.log(" ---- error ", error);
      setIsLoading1(false);
    }
  };
  const handleAPI = async (source, checkFilter) => {
    try {
      setIsLoading(true);
      let paramsData = {
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
          sortCriteria !== "All" ? sortCriteria.toLocaleUpperCase() : undefined,
      };
      const response = await getAPIHandler({
        endPoint: "listProduct",
        source: source,
        paramsData: paramsData,
      });
      if (response.data.responseCode === 200) {
        setapiData(response.data.result.docs);
        setNoOfPages(response.data.result.pages);
        setIsLoading(false);
      } else {
        setapiData([]);
        setIsLoading(false);
        setNoOfPages(1);
        setPage(1);
      }
      setIsClear(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setapiData([]);
      setNoOfPages(1);
      setIsClear(false);
      setPage(1);
    }
  };
  useEffect(() => {
    handleAPI();
  }, [page, sortCriteria]);
  const dataWithSerialNumber =
    apiData &&
    apiData?.map((user, index) => {
      return {
        srNo: index + 1,

        CategoryName: user.categoryName,
        TitleName: user.titleName,
        APIType: user.method,
        BaseURL: user.baseUrlMainnet,
        updatedAt: user.updatedAt
          ? moment(user.updatedAt).format("lll")
          : user.updatedAt,
      };
    });
  const headers = [
    { label: "Sr. No.", key: "srNo" },
    { label: "Title", key: "CategoryName" },
    { label: "Description", key: "TitleName" },
    { label: "API Type", key: "APIType" },
    { label: "Base URL", key: "BaseURL" },
    { label: "Created Date & Time", key: "updatedAt" },
  ];

  const handleStock = async (value) => {
    try {
      const updatedStock = !value.stockAvailable; // Toggle the current value

      const formData = {
        _id: value._id,
        stockAvailable: updatedStock,
      };

      const response = await putAPIHandlerCall({
        endPoint: "editProduct",
        dataToSend: formData,
      });

      if (response.status === 200) {
        toast.success("Product stock updated successfully!");
        handleAPI();

      } else {
        toast.error("Failed to update stock.");
      }
    } catch (error) {
      console.log("Error processing form:", error);
    }
  };

  return (
    <Box className={classes.apiContentBox}>
      <Box className="displaySpacebetween topText">
        <Typography variant="h3">Product Management</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            history.push({
              pathname: "/add-product",
              hash: "add",
            })
          }
        >
          Add
        </Button>
      </Box>
      <Divider className="borderBox" />
      <Box mb={2}>
        <MainFilter
          placeholder="Search by title name"
          // type={"Product"}
          // types={"API"}

          handleClear={handleClear}
          search={search}
          fromDate={fromDate}
          setSearch={setSearch}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleCallApi={handleAPI}
          sortCriteria={sortCriteria}
          handleSortChange={handleSortChange}
        />
      </Box>
      {/* <Box pb={2} align="center">
        <Box display="flex" justifyContent="end">
          <Box className="displayEnd">
            <DownloadExcelFile
              headers={headers}
              dataWithSerialNumber={dataWithSerialNumber}
              filename={"APIContent_Details.csv"}
            />
          </Box>
        </Box>
      </Box> */}
      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>Sr. No.</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Updated Date & Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apiData &&
              apiData.map((value, i) => (
                <TableRow>
                  <TableCell> {(page - 1) * 10 + i + 1}</TableCell>
                  <TableCell>{value?.productTitle}</TableCell>
                  <TableCell>
                    {value?.productDescription?.slice(0, 40) +
                      (value?.productDescription?.split(" ").length > 40
                        ? "..."
                        : "")}
                  </TableCell>

                  <TableCell>{moment(value.updatedAt).format("lll")}</TableCell>
                  <TableCell>
                    <span
                      style={{
                        color: value.status === "BLOCK" ? "#EF2114" : "#0CA51C",
                      }}
                    >
                      {value.status === "BLOCK" ? "In-Active" : "Active"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-start">
                      <IconButton
                        onClick={() =>
                          history.push({
                            pathname: "/add-product",
                            search: value._id,
                            hash: "edit",
                          })
                        }
                      >
                        <FiEdit />
                      </IconButton>
                      &nbsp;&nbsp;
                      <IconButton>
                        <DeleteIcon
                          onClick={() => {
                            setIddd(value?._id);
                            setOpenModal1(true);
                          }}
                        />
                      </IconButton>
                      &nbsp;&nbsp;
                      <IconButton
                        style={{
                          backgroundColor:
                            value.status === "BLOCK" ? "#EF2114" : "#008CF2",
                        }}
                        onClick={() => {
                          setOpenModal2(true);
                          setIddd(value);
                        }}
                      >
                        <BlockIcon />
                      </IconButton>
                      &nbsp;&nbsp;
                      <IconButton
                        style={{
                          backgroundColor: value.stockAvailable
                            ? "#008CF2"
                            : "#EF2114  ", // red if true, blue if false
                          color: "white",
                        }}
                        onClick={() => handleStock(value)}
                      >
                        <IoFileTrayFullSharp />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && <TopTradingSkeleton skeleton={[1, 2, 3, 4, 5, 6]} />}
      </TableContainer>
      {!isLoading && apiData && apiData?.length === 0 && <NoDataFound />}
      {!isLoading && apiData && noOfPages > 1 && (
        <Box mt={3} mb={1} className="displayEnd">
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            shape="rounded"
          />
        </Box>
      )}
      <ConfirmationDialogBox
        openModal={openModal1}
        handleClose={() => setOpenModal1(false)}
        heading="Delete"
        description="Are you sure do you want to delete this?"
        handleSubmit={() => {
          handleDeleteAPI();
          // setOpenModal1(false)
        }}
        isLoading={isLoading1}
      />
      <ConfirmationDialogBox
        openModal={openModal2}
        handleClose={() => setOpenModal2(false)}
        handleSubmit={() => {
          //  setOpenModal2(false)
          handleBlockUnBlockAPI();
        }}
        heading="Block"
        description={`Are you sure, you want to ${
          iddd.status === "BLOCK" ? "active" : "block"
        } this?`}
        isLoading={isLoading1}
      />
    </Box>
  );
}
