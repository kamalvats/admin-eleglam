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
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import {
  deleteAPIHandler,
  getAPIHandler,
  postAPIHandler,
  putAPIHandlerCall,
} from "src/ApiConfig/service";
import { Pagination } from "@material-ui/lab";
import NoDataFound from "src/component/NoDataFound";
import TopTradingSkeleton from "src/Skeletons/TopTradingSkeleton";
import axios from "axios";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import toast from "react-hot-toast";
import AddNftAdinfluencer from "src/component/AddNftAdinfluencer";
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
  main: {
    "& h4": {
      color: "#262424",
    },

    "& .MuiButton-containedPrimary": {
      [theme.breakpoints.down("sm")]: {
        fontSize: "12px !important",
      },
    },
    "& .displaySpacebetween": {
      flexWrap: "wrap",
    },
  },
}));

function Category({ tab, page, setPage }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [noOfPages, setNoOfPages] = useState(1);
  const [noOfTotalPages, setNoOfTotalPages] = useState(1);
  const [getCategoryData, setCategoryData] = useState([]);
  const [blockUserLoad, setBlockUserLoad] = useState(false);
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const location = useLocation();

  const [editCategory, setEditCategory] = useState({
    editOpen: false,
    editData: undefined,
  });
  const [deleteModal, setDeleteModal] = useState({
    deleteOpen: false,
    deleteData: undefined,
  });

  const getCategoryListApi = async (source, checkFilter) => {
    try {
      setIsLoading(true);
      const response = await getAPIHandler({
        endPoint: tab === "NFT" ? "getCategory" : "getInfluencerCategory",
        source: source,
        paramsData: {
          page: page,
          limit: "10",
        },
      });
      if (response?.data?.responseCode === 200) {
        setCategoryData(response.data.result.docs);
        setNoOfPages(response.data.result.pages);
        setNoOfTotalPages(response.data.result.total);
      } else {
        setCategoryData([]);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setCategoryData([]);
      console.log(error);
    }
  };

  const handleBlockUser = async (id) => {
    try {
      setBlockUserLoad(true);
      const dataToSnd =
        tab === "NFT" ? { NFTCategoryId: id } : { influencerCategoryId: id };
      const res = await deleteAPIHandler({
        endPoint:
          tab === "NFT" ? "deleteNftCategory" : "deleteInfluencerCategory",
        dataToSend: dataToSnd,
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        getCategoryListApi();
        setDeleteModal({
          deleteOpen: false,
          deleteData: undefined,
        });
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

  const handleUpdateProfile = async (values) => {
    try {
      setBlockUserLoad(true);
      const formData = new FormData();

      if (tab === "NFT") {
        formData.append("categoryTitle", values.categoryName);
        formData.append(
          "categoryIcon",
          values.profileImage ? values.profileImage : undefined
        );
        editCategory?.editOpen &&
          formData.append(
            "categoryId",
            editCategory?.editData?._id || undefined
          );
      } else {
        formData.append("influencerCategoryTitle", values.categoryName);
        formData.append("influencerCategoryDescription", values.description);
        editCategory?.editOpen &&
          formData.append("_id", editCategory?.editData?._id || undefined);
      }
      const checkMethod = editCategory.editOpen
        ? putAPIHandlerCall
        : postAPIHandler;
      const res = await checkMethod({
        endPoint:
          tab === "NFT"
            ? editCategory.editOpen
              ? "editCategory"
              : "addCategory"
            : editCategory.editOpen
            ? "editInfluencerCategory"
            : "addInfluencerCategory",
        dataToSend: formData,
      });
      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        getCategoryListApi();
        setEditCategory({
          editOpen: false,
          editData: undefined,
        });
        setAddCategoryModal(false);
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
    getCategoryListApi(source);
    return () => {
      source.cancel();
    };
  }, [page, tab]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, location.pathname]);
  return (
    <Box className={classes.main}>
      <Box className="displaySpacebetween" pb={2}>
        <Typography variant="h4">
          {tab == "NFT" ? "NFT" : "Influencer"} Category
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddCategoryModal(true)}
        >
          Add Category
        </Button>
      </Box>
      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>Sr. No.</TableCell>
              <TableCell>Name</TableCell>
              {tab == "NFT" && <TableCell>Icon</TableCell>}
              <TableCell>Date </TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {getCategoryData &&
              getCategoryData.map((value, i) => (
                <TableRow>
                  <TableCell>{(page - 1) * 10 + i + 1}</TableCell>
                  <TableCell>
                    {value.influencerCategoryTitle ||
                      value.categoryTitle ||
                      "..."}
                  </TableCell>
                  {tab == "NFT" && (
                    <TableCell>
                      <Avatar
                        src={
                          value?.categoryIcon ? value?.categoryIcon : "img.png"
                        }
                        alt={value?.categoryTitle}
                      />
                    </TableCell>
                  )}
                  <TableCell>{moment(value.createdAt).format("lll")}</TableCell>
                  <TableCell>{value.status}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-start">
                      <IconButton>
                        <DeleteIcon
                          onClick={() =>
                            setDeleteModal({
                              deleteOpen: true,
                              deleteData: value,
                            })
                          }
                        />
                      </IconButton>{" "}
                      &nbsp;&nbsp;
                      <IconButton
                        onClick={() => {
                          setAddCategoryModal(true);
                          setEditCategory({
                            editOpen: true,
                            editData: value,
                          });
                        }}
                      >
                        <MdEdit />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {isLoading && <TopTradingSkeleton skeleton={[1, 2, 3, 4, 5, 6]} />}
        {!isLoading && getCategoryData && getCategoryData?.length === 0 && (
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

      {deleteModal?.deleteOpen && (
        <ConfirmationDialogBox
          openModal={deleteModal?.deleteOpen}
          heading="Delete"
          description={`Are you sure, you want to delete this category?`}
          handleClose={() =>
            setDeleteModal({ ...deleteModal, deleteOpen: false })
          }
          handleSubmit={() => handleBlockUser(deleteModal?.deleteData?._id)}
          isLoading={blockUserLoad}
        />
      )}

      {addCategoryModal && (
        <AddNftAdinfluencer
          openModal={addCategoryModal}
          handleClose={() => {
            setEditCategory({
              editOpen: false,
              editData: undefined,
            });
            setAddCategoryModal(false);
          }}
          heading={`${
            editCategory?.editOpen ? "Edit influencer" : "Add influencer"
          } Category`}
          type={tab}
          isLoading={blockUserLoad}
          handleUpdateProfile={handleUpdateProfile}
          editCategory={editCategory}
        />
      )}
    </Box>
  );
}

export default Category;
