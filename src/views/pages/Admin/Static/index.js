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
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { FiEdit } from "react-icons/fi";
import Topheading from "src/component/TopHeading";
import { useHistory } from "react-router-dom";
import { getAPIHandler } from "src/ApiConfig/service";
import axios from "axios";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";

const useStyles = makeStyles((theme) => ({
  statictableBox: {
    "& .MuiIconButton-root": {
      padding: "8px",
      backgroundColor: "#008CF2",
      "& svg": {
        color: "#fff",
        fontSize: "18px",
      },
    },
  },
  tableContainer: {
    "& .MuiTableContainer-root": {
      marginTop: "16px",
    },
  },
}));

export default function Static() {
  const classes = useStyles();
  const history = useHistory();
  const [staticContent, setStaticContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getStaticContentApi = async (source, checkFilter) => {
    try {
      const response = await getAPIHandler({
        endPoint: "getstaticContent",
        source: source,
      });
      if (response?.data?.responseCode === 200) {
        setStaticContent(response.data.staticContentList);
      } else {
        setStaticContent([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setStaticContent([]);
      console.log(error);
    }
  };

  const handleViewEdit = (value, key) => {
    const routeFile = key === "edit" ? "/add-static" : "/view-content";
    history.push({
      pathname: routeFile,
      state: { ...value, viewStatic: true },
    });
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    getStaticContentApi(source);
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <Box className={classes.tableContainer}>
      <Box className="tophead">
        <Topheading heading="Static Content Management" />
      </Box>

      <TableContainer>
        <Table className={classes.statictableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {staticContent &&
              staticContent?.map((value, i) => (
                <TableRow>
                  <TableCell> {i + 1}</TableCell>
                  <TableCell>{value.title}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-start">
                      <IconButton onClick={() => handleViewEdit(value, "view")}>
                        <VisibilityIcon />
                      </IconButton>{" "}
                      &nbsp; &nbsp; &nbsp;
                      <IconButton onClick={() => handleViewEdit(value, "edit")}>
                        <FiEdit />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && <TopTradingSkeleton skeleton={[1, 2, 3, 4, 5, 6]} />}
      </TableContainer>
    </Box>
  );
}
