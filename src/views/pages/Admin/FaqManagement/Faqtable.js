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
  Button,
  Divider,Typography
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DeleteIcon from "@material-ui/icons/Delete";
import Topheading from "src/component/TopHeading";
import { useHistory } from "react-router-dom";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import { FiEdit } from "react-icons/fi";
import { deleteAPIHandler, getAPIHandler } from "src/ApiConfig/service";
import toast from "react-hot-toast";
import axios from "axios";
import NoDataFound from "src/component/NoDataFound";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import moment from "moment";

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
  faqBoxes: {
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
export function sortAddress(add) {
  const sortAdd = `${add.slice(0, 40)}...`;
  return sortAdd;
}

export default function Faqtable() {
  const classes = useStyles();
  const history = useHistory();
  const [deletefaq, setDeletefaq] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userListData, setUserListData] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [noOfTotalPages, setNoOfTotalPages] = useState(1);
  const [blockUserLoad, setBlockUserLoad] = useState(false);

  const getFAQListApi = async (source, checkFilter) => {
    try {
      const response = await getAPIHandler({
        endPoint: "FAQs",
        source: source,
        paramsData: {
          page: page,
          limit: "10",
        },
      });
      if (response?.data?.responseCode === 200) {
        setUserListData(response.data.faqs.docs);
        setNoOfPages(response.data.faqs.pages);
        setNoOfTotalPages(response.data.faqs.total);
      } else {
        setUserListData([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setUserListData([]);
      console.log(error);
    }
  };

  const handleDeleteFun = async (id) => {
    try {
      setBlockUserLoad(true);
      const res = await deleteAPIHandler({
        endPoint: "deleteFAQ",
        paramsData: {
          faqId: id,
        },
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        getFAQListApi();
        setDeletefaq(false);
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    getFAQListApi(source);
    return () => {
      source.cancel();
    };
  }, [page]);
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
    <Box className={classes.faqBoxes}>
     
      <Box className="displaySpacebetween topText">
        <Typography variant="h3">FAQ</Typography>
        <Button
            variant="contained"
            color="primary"
            onClick={() =>
              history.push({ pathname: "/add-faq", search: "ADD" })
            }
          >
            Add FAQ
          </Button>
      </Box>
      <Divider className="borderBox" />
     
      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>Sr. No.</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>

              <TableCell>Created Date & Time</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userListData &&
              userListData.map((value, i) => (
                <TableRow>
                  <TableCell> {i + 1}</TableCell>
                  <TableCell>
                    {value?.question?.slice(0, 30)}{" "}
                    {value?.question?.length > 30 && "..."}
                  </TableCell>
                  <TableCell>
                    <div
                      className="mainContent"
                      dangerouslySetInnerHTML={{
                        __html:
                          value && value.answer !== undefined
                            ? truncateAndRenderHTML(value.answer, 30)
                            : "N/A",
                      }}
                    />
                  </TableCell>
                  <TableCell>{moment(value.createdAt).format("lll")}</TableCell>

                  <TableCell>
                    <Box display="flex" justifyContent="flex-start">
                      <IconButton
                        onClick={() =>
                          history.push({
                            pathname: "/view-faq",
                            state: value,
                          })
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                      &nbsp;&nbsp;
                      <IconButton
                        onClick={() =>
                          history.push({
                            pathname: "/add-faq",
                            state: { ...value, editFaq: true },
                          })
                        }
                      >
                        <FiEdit />
                      </IconButton>
                      &nbsp;&nbsp;
                      <IconButton>
                        <DeleteIcon
                          onClick={() => {
                            setDeletefaq(true);
                            setDeleteId(value._id);
                          }}
                        />
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
      <Box mt={3} mb={1}>
        {!isLoading && noOfTotalPages > (page === 1 ? 10 : 0) && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            shape="rounded"
          />
        )}
      </Box>
      {deletefaq && (
        <ConfirmationDialogBox
          openModal={deletefaq}
          handleClose={() => setDeletefaq(false)}
          heading="Delete FAQ"
          description="Are you sure, you want to delete FAQ?"
          handleSubmit={() => handleDeleteFun(deleteId)}
          isLoading={blockUserLoad}
        />
      )}
    </Box>
  );
}
