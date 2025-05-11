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
import Topheading from "src/component/TopHeading";
import { useHistory } from "react-router-dom";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import NoDataFound from "src/component/NoDataFound";
import { getAPIHandler, putAPIHandlerCall } from "src/ApiConfig/service";
import axios from "axios";
import moment from "moment";
import { FiEdit } from "react-icons/fi";

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

function ApiHitratesList() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [userListData, setUserListData] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [noOfTotalPages, setNoOfTotalPages] = useState(1);

  const getHitrates = async (source) => {
    try {
      const response = await getAPIHandler({
        endPoint: "getHitrates",
        source: source,
      });
      if (response?.data?.responseCode === 200) {
        setUserListData(response.data.getAllhitrates);
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

  useEffect(() => {
    const source = axios.CancelToken.source();
    getHitrates(source);
    return () => {
      source.cancel();
    };
  }, [page]);
  return (
    <Box>
      <Box className="tophead">
        <Topheading heading="API Hitrates  " searchname="Search here..." />
      </Box>

      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>Sr.No.</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Per Seconds</TableCell>
              <TableCell>Per Minutes</TableCell>
              <TableCell>Per Day</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userListData &&
              userListData.map((value, i) => (
                <TableRow>
                  <TableCell> {(page - 1) * 10 + i + 1}</TableCell>
                  <TableCell>{value?.keyType}</TableCell>
                  <TableCell>{value?.perSecond}</TableCell>
                  <TableCell>{value?.perMinute}</TableCell>
                  <TableCell>{value?.perDay}</TableCell>

                  <TableCell>{moment(value.createdAt).format("lll")}</TableCell>

                  <TableCell>
                    <Box display="flex" justifyContent="flex-start">
                      <IconButton
                        onClick={() =>
                          history.push({
                            pathname: "/edit-api-hitrates",
                            // state: { ...value, editHitrates: true },
                            state: {
                              data: value,
                            },
                          })
                        }
                      >
                        <FiEdit />
                      </IconButton>
                      &nbsp;&nbsp;
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
        {!isLoading && noOfTotalPages > (page === 1 ? 10 : 0) && (
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

export default ApiHitratesList;
