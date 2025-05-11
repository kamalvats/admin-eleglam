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
} from "@material-ui/core";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import VisibilityIcon from "@material-ui/icons/Visibility";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteAPIHandler } from "src/ApiConfig/service";
import { useHistory } from "react-router-dom";
import CategoryDialogBox from "src/component/CategoryDialogBox";
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
}));

export default function MainCategoryTable({ apiData, tab, callBack, page }) {
  const classes = useStyles();
  const history = useHistory();
  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [iddd, setIddd] = useState(false);
  const [open, setOpen] = useState(false);
  // deleteApiReferenceSubcategory

  const handleDeleteAPI = async (id) => {
    try {
      setIsLoading(true);
      let paramsData;
      if (tab == "main") {
        paramsData = {
          categoryId: iddd,
        };
      } else {
        paramsData = {
          subCategoryId: iddd,
        };
      }
      const response = await deleteAPIHandler({
        endPoint:
          tab == "main"
            ? "deleteCategoryforEndpoint"
            : "deleteApiReferenceSubcategory",
        paramsData,
      });
      if (response.data.responseCode === 200) {
        setOpenModal1(false);
        setIsLoading(false);
        callBack(page);
        toast.success(response.data.responseMessage);
      } else {
        setIsLoading(false);
        toast.error(response.data.responseMessage);
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
  return (
    <>
      <TableContainer>
        <Table className={classes.tableBox}>
          <TableHead>
            <TableRow alignItems="center">
              <TableCell>Sr. No.</TableCell>
              {tab == "sub" && <TableCell>Main Category Name</TableCell>}
              <TableCell>Category Name</TableCell>
              {/* {tab == "sub" && <TableCell>Description</TableCell>} */}
              <TableCell>Status</TableCell>
              <TableCell>Updated Date & Time</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {apiData &&
              apiData.map((value, i) => (
                <TableRow>
                  <TableCell> {i + 1}</TableCell>
                  {tab == "sub" && (
                    <TableCell>{value?.categoryId?.categoryName}</TableCell>
                  )}
                  {tab == "sub" && <TableCell>{value.title}</TableCell>}
                  {tab !== "sub" && <TableCell>{value.categoryName}</TableCell>}
                  {/* <TableCell>{value.categoryName}</TableCell> */}
                  {/* {tab == "sub" && (
                    <TableCell>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            value.description && value.description.length > 40
                              ? `${value?.description?.slice(0, 40)}...`
                              : value.description,
                        }}
                      />
                    </TableCell>
                  )} */}
                  <TableCell>{value.status}</TableCell>
                  <TableCell>{moment(value.createdAt).format("lll")}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="flex-start">
                      {tab != "main" && ( 
                        <IconButton
                          // onClick={() =>  {(tab != "main"){history.push("/view-catogory")}}}
                          onClick={() => {
                            if (tab != "main") {
                              history.push({
                                pathname: "/add-sub-category",
                                hash: "view",
                                search: value._id,
                              });
                            } else {
                              setOpen(true);
                            }
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      )}
                      &nbsp;&nbsp;
                      {tab != "main" && (
                        <IconButton
                          onClick={() => {
                            history.push({
                              pathname: "/add-sub-category",
                              hash: "edit",
                              search: value._id,
                            });
                          }}
                        >
                          <MdEdit />
                        </IconButton>
                      )}
                      &nbsp;&nbsp;
                      <IconButton>
                        <DeleteIcon
                          onClick={() => {
                            setOpenModal1(true);
                            setIddd(value._id);
                          }}
                        />
                      </IconButton>
                      {/* &nbsp;&nbsp;
                      <IconButton
                        onClick={() => {
                          setOpenModal2(true);
                          setIddd(value._id);
                        }}
                      >
                        <BlockIcon />
                      </IconButton> */}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationDialogBox
        openModal={openModal1}
        handleClose={() => setOpenModal1(false)}
        heading="Delete"
        description="Are you sure do you want to delete this?"
        handleSubmit={() => handleDeleteAPI(false)}
        isLoading={isLoading}
      />
      <ConfirmationDialogBox
        openModal={openModal2}
        handleClose={() => setOpenModal2(false)}
        handleSubmit={() => setOpenModal2(false)}
        heading="Block"
        description="Are you sure do you want to block this?"
        isLoading={isLoading}
      />

      {/* {open && (
        <CategoryDialogBox
          openModal={open}
          handleClose={() => setOpen(false)}
          isSubmit={isSubmit}
          setisSubmit={() => setisSubmit(false)}
          _onInputChange={(data) => _onInputChange(data)}
          handleSubmit={() => HandleAddCategory(false)}
          heading="Add Category"
          // description="Are you sure do you want to block this?"
          isLoading={isLoading}
          formValue={formValue}
          type="main"
        />
      )} */}
    </>
  );
}
