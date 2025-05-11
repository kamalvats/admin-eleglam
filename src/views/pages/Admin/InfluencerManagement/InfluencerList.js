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
import CheckIcon from "@material-ui/icons/Check";
import Topheading from "src/component/TopHeading";
import { useHistory } from "react-router-dom";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import NoDataFound from "src/component/NoDataFound";
import { DownloadExcelFile } from "src/component/DownloadExcelFile";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";
import { FaRegCopy } from "react-icons/fa";
import { sortAddress, sortLinks } from "src/utils";
import { getAPIHandler } from "src/ApiConfig/service";
import axios from "axios";
import { FaCopy } from "react-icons/fa";
import CopyToClipboard from "react-copy-to-clipboard";
import CloseIcon from "@material-ui/icons/Close";
import InfluencerApproveRej from "src/component/InfluencerApproveRej";
import toast from "react-hot-toast";
import moment from "moment";
import { FaHourglassHalf } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  tableBox: {
    minWidth: "800px",
    "& .MuiIconButton-root": {
      padding: "8px",
      "& svg": {
        color: "#0CA51C",
        fontSize: "18px",
      },
    },
    "& .arrowIcon": {
      fontSize: "16px",
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

function InfluencerList() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [noOfTotalPages, setNoOfTotalPages] = useState(1);
  const [influencerListData, setInfluencerListData] = useState([]);
  const [rejectModal, setRejectModal] = useState(false);
  const [dataReject, setDataReject] = useState();
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
      getInfluencerListApi();
    }
  }, [isClear]);

  const getInfluencerListApi = async (source, checkFilter) => {
    try {
      const response = await getAPIHandler({
        endPoint: "getInfluencerRequestList",
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
          influencerStatus:
            sortCriteria !== "All"
              ? sortCriteria.toLocaleUpperCase()
              : undefined,
        },
      });
      if (response?.data?.responseCode === 200) {
        setInfluencerListData(response.data.result.docs);
        setNoOfPages(response.data.result.pages);
        setIsLoading(false);
      } else {
        setInfluencerListData([]);
        setIsLoading(false);
        setNoOfPages(1);
        setPage(1);
      }
      setIsClear(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setInfluencerListData([]);
      setNoOfPages(1);
      setIsClear(false);
      setPage(1);
    }
  };

  useEffect(() => {
    getInfluencerListApi();
  }, [page, sortCriteria]);

  const dataWithSerialNumber =
    influencerListData &&
    influencerListData?.map((user, index) => {
      return {
        srNo: index + 1,

        InfluencerName: user.name,
        InstagramLink: user.instagramLink,
        Status: user.influencerStatus,
        createdAt: user.createdAt
          ? moment(user.createdAt).format("lll")
          : user.createdAt,
      };
    });
  const headers = [
    { label: "Sr. No.", key: "srNo" },
    { label: "Influencer Name", key: "InfluencerName" },
    { label: "Instagram Link", key: "InstagramLink" },
    { label: "Status", key: "Status" },
    { label: "Created Date & Time", key: "createdAt" },
  ];
  return (
    <Box>
      <Box className="tophead">
        <Topheading
          heading="Influencer management"
          searchname="Search here..."
        />
      </Box>
      <Box my={2}>
        <MainFilter
          type="influencer"
          placeholder="Search by infl. name"
          handleClear={handleClear}
          search={search}
          fromDate={fromDate}
          setSearch={setSearch}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleCallApi={getInfluencerListApi}
          sortCriteria={sortCriteria}
          handleSortChange={handleSortChange}
        />
      </Box>

      <Box mb={2} display="flex" justifyContent="end">
        <DownloadExcelFile
          headers={headers}
          dataWithSerialNumber={dataWithSerialNumber}
          filename={"Influencer_Details.csv"}
        />
      </Box>
      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>Sr.No.</TableCell>
              <TableCell>Influencer Name</TableCell>
              {/* <TableCell>Wallet Address</TableCell> */}
              <TableCell>Instagram Link</TableCell>
              {/* <TableCell>Tiktok Link</TableCell> */}
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {influencerListData &&
              influencerListData.map((data, i) => (
                <TableRow>
                  <TableCell> {(page - 1) * 10 + i + 1}</TableCell>
                  <TableCell> {data?.name ? data?.name : "..."}</TableCell>

                  <TableCell>
                    {data?.instagramLink
                      ? sortLinks(data?.instagramLink)
                      : "..."}
                    &nbsp;&nbsp;
                    {data?.instagramLink && (
                      <CopyToClipboard text={data?.instagramLink}>
                        <FaCopy
                          style={{
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                          onClick={() => toast.success("Copied")}
                        />
                      </CopyToClipboard>
                    )}
                    &nbsp;&nbsp;
                    {data?.instagramLink && (
                      <SubdirectoryArrowLeftIcon
                        style={{
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          data?.instagramLink &&
                          window.open(`${data?.instagramLink}`)
                        }
                      />
                    )}
                  </TableCell>
                  {/* <TableCell>
                    {data?.tiktokLink ? sortLinks(data?.tiktokLink) : "..."}
                    &nbsp;&nbsp;
                    {data?.tiktokLink && (
                      <CopyToClipboard text={data?.tiktokLink}>
                        <FaCopy
                          style={{
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                          onClick={() => toast.success("Copied")}
                        />
                      </CopyToClipboard>
                    )}
                    &nbsp;&nbsp;
                    {data?.tiktokLink && (
                      <SubdirectoryArrowLeftIcon
                        style={{
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          data?.tiktokLink && window.open(`${data?.tiktokLink}`)
                        }
                      />
                    )}
                  </TableCell> */}

                  <TableCell>
                    {/* {value.status === "Approved" ? (
                      <span style={{ color: "#0CA51C" }}> {value.status}</span>
                    ) : (
                      <span style={{ color: "#EF2114" }}> {value.status}</span>
                    )} */}
                    {data?.influencerStatus}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-start">
                      {data?.influencerStatus === "REJECTED" ? (
                        <CloseIcon
                          fontSize="small"
                          style={{
                            color: "red",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            data?.influencerStatus === "PENDING" &&
                              setDataReject(data);
                            data?.influencerStatus === "PENDING" &&
                              setRejectModal(true);
                          }}
                        />
                      ) : data?.influencerStatus === "APPROVED" ? (
                        <CheckIcon
                          fontSize="small"
                          style={{
                            color: "green",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            data?.influencerStatus === "PENDING" &&
                              setDataReject(data);
                            data?.influencerStatus === "PENDING" &&
                              setRejectModal(true);
                          }}
                        />
                      ) : (
                        <FaHourglassHalf
                          fontSize="small"
                          style={{
                            color: "#F5C843",
                            fontSize: "18px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            data?.influencerStatus === "PENDING" &&
                              setDataReject(data);
                            data?.influencerStatus === "PENDING" &&
                              setRejectModal(true);
                          }}
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && <TopTradingSkeleton skeleton={[1, 2, 3, 4, 5, 6]} />}
        {!isLoading &&
          influencerListData &&
          influencerListData?.length === 0 && <NoDataFound />}
      </TableContainer>
      <Box mt={3} mb={1} className="displayEnd">
        {!isLoading && noOfTotalPages > (page === 1 ? 10 : 0) && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            shape="rounded"
          />
        )}
      </Box>
      {rejectModal && (
        <InfluencerApproveRej
          rejectModal={rejectModal}
          setRejectModal={setRejectModal}
          getInfluencerList={getInfluencerListApi}
          dataReject={dataReject}
        />
      )}
    </Box>
  );
}

export default InfluencerList;
