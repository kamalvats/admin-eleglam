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
import BlockIcon from "@material-ui/icons/Block";
import { useHistory } from "react-router-dom";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import NoDataFound from "src/component/NoDataFound";
import {
  deleteAPIHandler,
  getAPIHandler,
  patchAPIHandler,
  putAPIHandlerCall,
} from "src/ApiConfig/service";
import axios from "axios";
import moment from "moment";
import { FiEdit } from "react-icons/fi";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import toast from "react-hot-toast";

export function sortAddress(add) {
  const sortAdd = `${add.slice(0, 25)}...`;
  return sortAdd;
}

const useStyles = makeStyles((theme) => ({
  announcementBox: {
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
    "& .mainContent": {
      fontWeight: "300 !important",
      "& figure": {
        marginLeft: "0",
      },
      "& a": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },
      "& code": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },
      "& td": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },
      "& span, section": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },

      "& iframe": {
        width: "100%",
        // overflow: "hidden",
        display: "inherit",
      },
      "& img": {
        maxWidth: "100%",
        height: "auto",
      },

      "& >*": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        wordBreak: "break-word",
        overflow: "auto",
        color: `${theme.palette.text.primary} !important`,
      },
      "& h4": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& h5": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& h1": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& h2": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& h3": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& span": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
      },
      "& em": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
      },
      "& p": {
        fontWeight: "300 !important",
        backgroundColor: "unset !important",
        color: `${theme.palette.text.primary} !important`,
        fontSize: "14px !important",
        fontFamily: "'Poppins',sans-serif",
        fontStyle: "normal",
        fontWeight: "300 !important",
        lineHeight: "1.5",
        letterSpacing: "0.00938em",
      },
      "& strong": {
        fontWeight: "300 !important",
        color: `${theme.palette.text.primary} !important`,
      },
    },
  },
}));

function ListAnnouncement() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState();
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [search, setSearch] = useState("");
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [isClear, setIsClear] = useState(false);
  const [userListData, setUserListData] = useState([]);
  const [announcementData, setAnnouncementData] = useState([]);
  const [openModal1, setOpenModal1] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [iddd, setIddd] = useState("");
  const [blockUser, setBlockUser] = useState(false);
  const [blockId, setBlockId] = useState();
  const [sortCriteria, setSortCriteria] = useState("All");
  const [blockUserLoad, setBlockUserLoad] = useState(false);

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };
  const handleClickOpen = (data) => {
    setOpen(true);
    setId(data); 
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
      ListAnnouncementHandler();
    }
  }, [isClear]);
  const ListAnnouncementHandler = async () => {
    try {
      const res = await getAPIHandler({
        endPoint: "getAllAnnouncement",
        paramsData: {
          page: page,
          limit: 10,
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
      if (res.data.responseCode === 200) {
        setNoOfPages(res?.data?.result?.pages);
        setAnnouncementData(res?.data?.result?.docs);
        setIsLoading(false);
      } else {
        setNoOfPages(1);
        setPage(1);
        setAnnouncementData([]);
        setIsLoading(false);
      }
      setIsClear(false);
    } catch (error) {
      console.log(error);
      setNoOfPages(1);
      setIsClear(false);
      setPage(1);
      setAnnouncementData([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    ListAnnouncementHandler();
  }, [page, sortCriteria]);
  const handleDeleteAPI = async () => {
    setIsLoading(true);

    try {
      let paramsData = {
        announcementId: iddd,
      };
      const response = await deleteAPIHandler({
        endPoint: "deleteAnnouncement",
        paramsData,
      });
      if (response.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(response.data.responseMessage);
        setOpenModal1(false);
        ListAnnouncementHandler();
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false); 
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    }
  };
  const handleBlockUser = async (id) => {
    try {
      setBlockUserLoad(true);
      const res = await patchAPIHandler({
        endPoint: "blockUnblockAnnouncement",
        paramsData: {
          announcementId: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        ListAnnouncementHandler();
        setBlockUser(false);
      } else {
        toast.error(res.data.responseMessage);
      }
      setBlockUserLoad(false);
    } catch (err) {
      toast.error(err?.response?.data?.responseMessage);
      console.error(err.res);
      setBlockUserLoad(false);
    }
  };

  function truncateAndRenderHTML(html, maxLength) {
    if (!html) return "N/A";

    // Create a temporary element to parse HTML
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;

    // Get the text content and truncate if needed
    const truncatedText = tempElement.textContent.slice(0, maxLength);
    const truncatedHTML =
      truncatedText.length < tempElement.textContent.length
        ? truncatedText + "..." // add ellipsis if truncated
        : tempElement.innerHTML;

    return truncatedHTML;
  }

  return (
    <Box className={classes.announcementBox}>
      <Box className="displaySpacebetween topText">
        <Typography variant="h3">Announcement Management</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/add-announcement")}
        >
          Add Announcement
        </Button>
      </Box>
        <Divider className="borderBox" />
        <Box mb={2}>
        <MainFilter
          handleClear={handleClear}
          search={search}
          fromDate={fromDate}
          setSearch={setSearch}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          handleCallApi={ListAnnouncementHandler}
          placeholder="Search by title."
          sortCriteria={sortCriteria}
          handleSortChange={handleSortChange}
        />
      </Box>
      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
            {[
                "Sr.No",
                "Title",
                "Message",
                "Created At",
                "Status",
                "Action",
              ].map((item) => {
                return <TableCell>{item}</TableCell>;
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {announcementData?.map((data, i) => (
              <TableRow key={data._id}>
                <TableCell>{(page - 1) * 10 + i + 1}</TableCell>
                <TableCell>{data.title ? data.title : "---"}</TableCell>
                <TableCell>
                  <div
                    className="mainContent"
                    dangerouslySetInnerHTML={{
                      __html:
                        data && data.description !== undefined
                          ? truncateAndRenderHTML(data.description, 30)
                          : "N/A",
                    }}
                  />
                </TableCell>
                <TableCell>
                  {data.updatedAt
                    ? moment(data.updatedAt).format("lll")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      color: data.status === "BLOCK" ? "#EF2114" : "#0CA51C",
                    }}
                  >
                    {data.status === "BLOCK" ? "Blocked" : "Active"}
                  </span>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      history.push({
                        pathname: "/add-announcement",

                        search: data?._id,
                        state: {
                          componentName: "view",
                          data: data,
                        },
                      })
                    }
                    style={{ padding: "6px" }}
                  >
                    <VisibilityIcon style={{ fontSize: "17px" }} />
                  </IconButton>
                  <IconButton
                    style={{
                      padding: "6px",
                      marginRight: "8px",
                      marginLeft: "8px",
                    }}
                  >
                    <MdModeEditOutline
                      style={{ fontSize: "17px" }}
                      onClick={() =>
                        history.push({
                          pathname: "/add-announcement",
                          state: {
                            componentName: "edit",
                            data: data,
                          },
                        })
                      }
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setIddd(data?._id);
                      setOpenModal1(true);
                    }}
                    style={{ padding: "6px", marginRight: "8px" }}
                  >
                    <MdDelete style={{ fontSize: "17px" }} />
                  </IconButton>
                  <IconButton
                    style={{
                      backgroundColor:
                        data.status === "BLOCK" ? "#EF2114" : "#008CF2",
                    }}
                    onClick={() => {
                      setBlockUser(true);
                      setBlockId(data);
                    }}
                  >
                    <BlockIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {isLoading && <TopTradingSkeleton skeleton={[1, 2, 3, 4, 5, 6]} />}
        {!isLoading && announcementData && announcementData?.length === 0 && (
          <NoDataFound />
        )}
      </TableContainer>
      <Box mt={3} mb={1} className="displayEnd">
        {!isLoading && announcementData && noOfPages > 1 && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            shape="rounded"
          />
        )}
      </Box>
      <ConfirmationDialogBox
        openModal={openModal1}
        handleClose={() => setOpenModal1(false)}
        heading="Delete"
        description="Are you sure do you want to delete this?"
        handleSubmit={() => handleDeleteAPI(false)}
        isLoading={isLoading}
      />
      {blockUser && (
        <ConfirmationDialogBox
          openModal={blockUser}
          heading="Block partner"
          description={`Are you sure, you want to ${
            blockId.status === "BLOCK" ? "active" : "block"
          } this announcement?`}
          handleClose={() => setBlockUser(false)}
          handleSubmit={() => handleBlockUser(blockId?._id)}
          isLoading={blockUserLoad}
        />
      )}
    </Box>
  );
}

export default ListAnnouncement;
