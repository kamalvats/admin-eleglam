import React, { useEffect, useState } from "react";
import MainFilter from "src/component/MainFilter";
import { Box, makeStyles, Button } from "@material-ui/core";
import Topheading from "src/component/TopHeading";
import { TbFileExport } from "react-icons/tb";
import { useHistory } from "react-router-dom";
import { getAPIHandler, postAPIHandler } from "src/ApiConfig/service";
import CategoryDialogBox from "src/component/CategoryDialogBox";
import MainCategoryTable from "./MainCategoryTable";
import { Pagination } from "@material-ui/lab";
import toast from "react-hot-toast";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import NoDataFound from "src/component/NoDataFound";

const useStyles = makeStyles((theme) => ({
  main: {
    "& .activeTab": {
      color: "#fff",
      border: "none",
      height: "48px",
      padding: "10px 35px",
      fontSize: "14px",
      background:
        "var(--Linear, linear-gradient(262deg, #62D3F0 13.12%, #35A5F5 83.57%))",
      boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
      fontWeight: "400",
      lineHeight: "21px",
      whiteSpace: "pre",
      borderRadius: "10px",
      backgroundColor: "#fff",
    },
    "& .diactiveTab": {
      color: "rgba(38, 36, 36, 0.87)",
      background: "#fff !important",
      boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",

      // color: "#fff",
      border: "none",
      height: "48px",
      padding: "10px 35px",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "21px",
      whiteSpace: "pre",
      borderRadius: "10px",
      backgroundColor: "#fff",
    },
  },
}));

export default function CategoryManagement() {
  const classes = useStyles();
  const history = useHistory();
  const [isSubmit, setisSubmit] = useState(false);
  const [tab, setTab] = useState(getStoredTab() || "main");
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [apiData, setapiData] = useState([]);
  const [page, setpage] = useState(1);
  const [noOfPage, setnoOfPage] = useState(1);

  const [formValue, setformValue] = useState({
    category: "",
    categoryId: "",
    subCategory: "",
  });
  const _onInputChange = (e) => {
    const temp = { ...formValue, [e.target.name]: e.target.value };
    setformValue(temp);
  };

  const handleAPI = async (pa) => {
    try {
      setIsLoading(true);
      let paramsData = {
        page: pa,
        // page:page,
        limit: 10,
      };
      const response = await getAPIHandler({
        endPoint:
          tab == "main"
            ? "getcategoryforEndpoint"
            : "getapiReferenceSubcategory",
        paramsData,
      });
      if (response.data.responseCode === 200) {
        let isM = tab == "main" ? "categories" : "result";
        let responseData = response.data[isM];
        setapiData(responseData.docs);
        setnoOfPage(responseData.pages);
        setIsLoading(false);
      } else {
      }
      setIsLoading(false);
    } catch (error) {
      console.log("  error ", error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleAPI(1);
    setapiData([]);
    setnoOfPage(0);
    storeTab(tab);
  }, [tab]);
  useEffect(() => {
    handleAPI(page);
    // setapiData([]);
    // setnoOfPage(0);
    storeTab(tab);
  }, [page]);

  // Function to get the stored tab from localStorage
  function getStoredTab() {
    return localStorage.getItem("activeTab");
  }

  // Function to store the active tab in localStorage
  function storeTab(activeTab) {
    localStorage.setItem("activeTab", activeTab);
  }

  const HandleAddCategory = async () => {
    try {
      setisSubmit(true);
      if (formValue.category == "") {
        return;
      }
      setisSubmit(false);
      setIsLoading1(true);
      let dataToSend = {
        categoryName: formValue.category,
      };
      const response = await postAPIHandler({
        endPoint: "addCategoryforEndpoint",
        dataToSend,
      });
      if (response.data.responseCode === 200) {
        setIsLoading1(false);
        toast.success(response.data.responseMessage);
        setOpen(false);
        handleAPI();
      } else {
        toast.error(response.data.responseMessage);
      }
      setIsLoading1(false);
    } catch (error) {
      console.log(" ---- error ", error);
      setIsLoading1(false);
      if (error.response) {
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <Box className={classes.main}>
      <Box className="tophead">
        <Topheading
          heading="  
         API Category Content"
          searchname="Search here..."
        />
      </Box>
    
      <Box pb={2} align="center" className="displaySpacebetween">
        <Box className="displayStart">
          <Button
            variant="contained"
            className={tab == "main" ? "activeTab" : "diactiveTab"}
            onClick={() => setTab("main")}
          >
            Main Category
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="contained"
            className={tab == "sub" ? "activeTab" : "diactiveTab"}
            onClick={() => setTab("sub")}
          >
            Sub Category
          </Button>
        </Box>
        <Box className="displayEnd">
          {tab === "main" && (
            <Button
              variant="contained"
              color="primary"
              // style={{padding:"10px 20px"}}
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Main Category
            </Button>
          )}
          &nbsp;&nbsp;
          {tab === "sub" && (
            <Button
              variant="contained"
              color="primary"
              // style={{padding:"10px 20px"}}
              onClick={() => {
                history.push({ pathname: "/add-sub-category", hash: "add" });
              }}
            >
              Add Sub Category
            </Button>
          )}
          &nbsp;&nbsp;
          {/* <Button variant="contained" color="secondary">
            <TbFileExport style={{ fontSize: "22px", paddingRight: "5px" }} />
            Download CSV
          </Button> */}
        </Box>
      </Box>
      <MainCategoryTable
        apiData={apiData}
        tab={tab}
        callBack={handleAPI}
        page={page}
      />

      {isLoading && <TopTradingSkeleton skeleton={[1, 2, 3, 4, 5, 6]} />}

      {!isLoading && apiData && apiData?.length === 0 && <NoDataFound />}

      {noOfPage > 1 && (
        <Box mt={3} mb={1} className="displayEnd">
          <Pagination
            count={noOfPage}
            page={page}
            onChange={(e, value) => setpage(value)}
            shape="rounded"
          />
        </Box>
      )}
      {/* noOfPage */}
      {open && (
        <CategoryDialogBox
          openModal={open}
          handleClose={() => setOpen(false)}
          isSubmit={isSubmit}
          setisSubmit={() => setisSubmit(false)}
          _onInputChange={(data) => _onInputChange(data)}
          handleSubmit={() => HandleAddCategory(false)}
          heading="Add Category"
          // description="Are you sure do you want to block this?"
          isLoading={isLoading1}
          formValue={formValue}
          type="main"
        />
      )}
      {openSub && (
        <CategoryDialogBox
          openModal={openSub}
          handleClose={() => setOpenSub(false)}
          isSubmit={isSubmit}
          setisSubmit={() => setisSubmit(false)}
          _onInputChange={(data) => _onInputChange(data)}
          // handleSubmit={() => HandleAddSubCategory()}
          heading="Add Sub Category"
          isLoading={isLoading1}
          formValue={formValue}
          type="sub"
        />
      )}
    </Box>
  );
}
