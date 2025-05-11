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
  Avatar,
  DialogContent,
  Dialog,
  DialogContentText,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Topheading from "src/component/TopHeading";
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
import BlockIcon from "@material-ui/icons/Block";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import toast from "react-hot-toast";

export function sortAddress(add) {
  const sortAdd = `${add.slice(0, 35)}...`;
  return sortAdd;
}

const useStyles = makeStyles((theme) => ({
  announcementBox: {},
  topText: {
    "& h3": {
      "@media(max-width:599px)": {
        marginBottom: "8px",
      },
    },
    [theme.breakpoints.down("xs")]: {
      display: "block",
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
  },
}));

function ListPartner() {
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
  const [blockUser, setBlockUser] = useState(false);
  const [blockId, setBlockId] = useState();
  const [iddd, setIddd] = useState("");
  const [noOfTotalPages, setNoOfTotalPages] = useState(1);
  const [blockUserLoad, setBlockUserLoad] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("All");
  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const [open5, setOpen5] = React.useState(false);
  const [imagedata, setImageData] = useState("");

  const handleClose1 = () => {
    setOpen5(false);
  };
  const imageData = (data) => {
    setOpen5(true);

    setImageData(data);
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
      ListPartnerHandler();
    }
  }, [isClear]);
  const ListPartnerHandler = async () => {
    try {
      const res = await getAPIHandler({
        endPoint: "partnerList",
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
      console.log("getAllAnnouncement-----", res);
      if (res.data.responseCode === 200) {
        setNoOfPages(res?.data?.result?.pages);
        setNoOfTotalPages(res.data.result.total);
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
    ListPartnerHandler();
  }, [page, sortCriteria]);
  const handleDeleteAPI = async () => {
    setIsLoading(true);

    try {
      let dataToSend = {
        partnerId: iddd,
      };
      const response = await deleteAPIHandler({
        endPoint: "deletePartner",
        dataToSend,
      });
      if (response.data.responseCode === 200) {
        setIsLoading(false);
        toast.success(response.data.responseMessage);
        setOpenModal1(false);
        ListPartnerHandler();
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
        endPoint: "blockUnblockPartner",
        dataToSend: {
          partnerId: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        ListPartnerHandler();
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
  return (
    <Box className={classes.announcementBox}>
      <Box className={`${classes.topText} displaySpacebetween`}>
        <Typography variant="h3">Partner Management</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/add-partner")}
        >
          Add Partner
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
          handleCallApi={ListPartnerHandler}
          placeholder="Search by partner title."
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
                "Name",
                "Logo Image",
                "Description",
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
                <TableCell>{data.name ? data.name : "---"}</TableCell>
                <TableCell>
                  <Avatar
                    src={data?.profilePic}
                    onClick={() => imageData(data.profilePic)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
                <TableCell>
                  {data?.description?.slice(0, 30)}{" "}
                  {data?.description?.length > 30 && "..."}
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
                        pathname: "/add-partner",

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
                          pathname: "/add-partner",
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
        {!isLoading && noOfTotalPages > (page === 1 ? 10 : 0) && (
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
        heading="Delete Partner"
        description="Are you sure, you want to delete this partner?"
        handleSubmit={() => handleDeleteAPI(false)}
        isLoading={isLoading}
      />

      {blockUser && (
        <ConfirmationDialogBox
          openModal={blockUser}
          heading="Block partner"
          description={`Are you sure, you want to ${
            blockId.status === "BLOCK" ? "active" : "block"
          } this partner?`}
          handleClose={() => setBlockUser(false)}
          handleSubmit={() => handleBlockUser(blockId?._id)}
          isLoading={blockUserLoad}
        />
      )}
      <Dialog
        open={open5}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.maincssbox}>
          <Box mb={2}>
            <img alt="" src={imagedata} width="100%" />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ListPartner;
