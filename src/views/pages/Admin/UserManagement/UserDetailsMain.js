import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import GeneralInformation from "./GeneralInformation";
import UserListedNFTs from "./UserListedNFTs";
import { useHistory, useLocation } from "react-router-dom";
import { getAPIHandler } from "src/ApiConfig/service";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  liveEventBox: {
    posation: "relative",
    zIndex: "999",
    "& .displayStart": {
      [theme.breakpoints.down("xs")]: {
        display: "block",
      },
    },
    "& .tabmainBox": {
      background: "#fff",
      border: "1px solid #188df2",
      width: "fit-content",
      borderRadius: "100px",
      padding: "3px",
    },
    "& .tabBox": {
      padding: "10px",
      cursor: "pointer",
      minWidth: "100px",
      [theme.breakpoints.down("xs")]: {
        marginLeft: "0px",
      },
      "& p": {
        color: "#000",
      },
    },
    "& .activeTab": {
      background: "rgb(24 141 242)",
      borderRadius: "100px",
      padding: "10px",
      cursor: "pointer",
      minWidth: "100px",
      "& p": {
        color: "#fff",
      },
      [theme.breakpoints.down("xs")]: {
        marginLeft: "0px",
      },
    },
  },
}));

export default function UserDetailsMain() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [viewUserData, setViewUserData] = useState();
  const [tabs, setTabs] = useState("GeneralInformation");
  const [userApiKeyList, setUserApiKeyList] = useState([]);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [noOfTotalPages, setNoOfTotalPages] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 
  const getViewUserData = async (source, id) => {
    try {
      const response = await getAPIHandler({
        endPoint: "viewUser",
        source: source,
        paramsData: {
          userId: id,
        },
      });
      if (response?.data?.responseCode === 200) {
        setViewUserData(response.data.userList);
      } else {
        setViewUserData();
      }
    } catch (error) {
      setViewUserData();
      console.log(error);
    }
  };

  const getViewUserApiKeyApi = async (source, id) => {
    try {
      const response = await getAPIHandler({
        endPoint: "userApikey",
        source: source,
        paramsData: {
          page: page,
          limit: "10",
          userId: id,
        },
      });
      if (response?.data?.responseCode === 200) {
        setUserApiKeyList(response.data.result.data);
        setNoOfPages(response.data.result.pages);
        setNoOfTotalPages(response.data.result.total);
      } else {
        setUserApiKeyList([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setUserApiKeyList([]);
      console.log(error);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (location?.state?._id) {
      getViewUserApiKeyApi(source, location?.state?._id);
    }
    return () => {
      source.cancel();
    };
  }, [page, location]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (location?.state?._id) {
      getViewUserData(source, location?.state?._id);
    }
    return () => {
      source.cancel();
    };
  }, [location?.state?._id]);

  return (
    <Box className={classes.liveEventBox}>
      <Box align="center">
        <Box className="displayCenter tabmainBox">
          <Box
            className={tabs === "GeneralInformation" ? "activeTab" : "tabBox"}
            onClick={() => setTabs("GeneralInformation")}
          >
            <Typography variant="body2" color="primary">
              General View{" "}
            </Typography>
          </Box>
          <Box
            className={tabs === "ListedNFTs" ? "activeTab" : "tabBox"}
            ml={3}
            onClick={() => setTabs("ListedNFTs")}
          >
            <Typography variant="body2" color="primary">
              API Key
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box mt={4} align="center">
        {tabs === "GeneralInformation" && (
          <GeneralInformation viewUserData={viewUserData} />
        )}
      </Box>
      <Box mt={4}>
        {tabs === "ListedNFTs" && (
          <UserListedNFTs
            userApiKeyList={userApiKeyList}
            page={page}
            noOfPages={noOfPages}
            noOfTotalPages={noOfTotalPages}
            isLoading={isLoading}
            setPage={setPage}
          />
        )}
      </Box>
      <Box className="displayCenter">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
