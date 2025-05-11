import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { Cancel } from "@material-ui/icons";
import toast from "react-hot-toast";
import { getAPIHandler, patchAPIHandler } from "src/ApiConfig/service";
import Topheading from "src/component/TopHeading";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";

const useStyles = makeStyles({
  imgbox: {
    marginTop: "10px",
    height: "100%",
    "& .controlimg": {
      boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
      borderRadius: "10px",
      "& figure": {
        margin: "0px",
        height: "250px",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        borderRadius: "10px",
        padding: "10px",
        "& img": {
          width: "auto",
          height: "100%",
          borderRadius: "10px",
        },
      },
    },
  },
});

const ViewBrandNft = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const [isLoader, setIsLoader] = useState(false);
  const [mediaData, setMediaData] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [viewKey, setViewKey] = useState("");
  const [logoImageOpen, setLogoImageOpen] = useState();
  const [coverImageOpen, setCoverImageOpen] = useState();
  const [openImageBox, setOpenImageBox] = useState(false);
  const [openCoverBox, setOpenCoverBox] = useState(false);
  const [approveRejct, setApproveRejct] = useState(false);

  const ViewHandler = async (source, id) => {
    try {
      const res = await getAPIHandler({
        endPoint: "viewBrand",
        source: source,
        paramsData: {
          _id: id,
        },
      });
      if (res.data.responseCode === 200) {
        setMediaData(res.data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApproveReject = async () => {
    setIsLoader(true);
    try {
      const res = await patchAPIHandler({
        endPoint: "approveRejectBrand",
        paramsData: {
          brandId: brandId,
        },
      });

      if (res.data.responseCode === 200) {
        toast.success(res.data.responseMessage);
        history.goBack();
      } else {
        toast.error(res.data.responseMessage);
      }
      setIsLoader(false);
    } catch (err) {
      console.log(err);
      setIsLoader(false);
    }
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (location.search.split("?")[1]) {
      ViewHandler(source, location.search.split("?")[1]);
      setBrandId(location.search.split("?")[1]);
    }
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <Box className={classes.viewcontentBox}>
      <Topheading heading="View Brand NFT" />
      <Paper elevation={2}>
        <Box className="termsAndConditions">
          <Box mt={1}>
            <Grid container spacing={1}>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Box>
                  <Typography variant="h6">Brand name </Typography>
                </Box>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Typography
                  variant="body2"
                  style={{ textTransform: "capitalize" }}
                >
                  {mediaData?.brandName ? mediaData?.brandName : "..."}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Bio </Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Typography variant="body2">
                  {mediaData?.bio ? mediaData?.bio : "..."}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Phone number</Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Typography variant="body2">
                  {mediaData?.mobileNumber ? mediaData?.mobileNumber : "..."}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Email</Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Typography variant="body2">
                  {mediaData?.email ? mediaData?.email : "..."}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Features </Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Typography variant="body2">
                  {mediaData?.cons ? mediaData?.cons : "..."}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Pro and Cons</Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Typography variant="body2">
                  {mediaData?.pros ? mediaData?.pros : "..."}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Benefits </Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Typography variant="body2">
                  {mediaData?.benefits ? mediaData?.benefits : "..."}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Physical store address*</Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Typography variant="body2">
                  {mediaData?.storeAddress ? mediaData?.storeAddress : "..."}
                </Typography>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Brand Approval</Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Box>
                  {mediaData?.brandApproval === "REJECTED" && (
                    <Typography style={{ color: "red" }} variant="body2">
                      {mediaData?.brandApproval
                        ? mediaData?.brandApproval
                        : "..."}
                    </Typography>
                  )}
                  {mediaData?.brandApproval === "APPROVED" && (
                    <Typography style={{ color: "green" }} variant="body2">
                      {mediaData?.brandApproval
                        ? mediaData?.brandApproval
                        : "..."}
                    </Typography>
                  )}
                  {mediaData?.brandApproval === "PENDING" && (
                    <Typography style={{ color: "#f6b00c" }} variant="body2">
                      {mediaData?.brandApproval
                        ? mediaData?.brandApproval
                        : "..."}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Status </Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Box
                  className={
                    mediaData?.status === "ACTIVE"
                      ? "activeclass"
                      : "rejectclass"
                  }
                >
                  <Typography variant="body2">
                    {mediaData?.status ? mediaData?.status : "..."}
                  </Typography>
                </Box>
              </Grid>

              <Grid item lg={3} md={3} sm={3} xs={12}>
                <Typography variant="h6">Date & Time</Typography>
              </Grid>
              <Grid item lg={9} md={9} sm={9} xs={12}>
                <Typography variant="body2" style={{ wordBreak: "break-all" }}>
                  {mediaData?.createdAt
                    ? moment(mediaData?.createdAt).format("lll")
                    : "..."}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography variant="h6">Logo</Typography>
                <Box className={classes.imgbox}>
                  <Box className="controlimg">
                    <figure>
                      <img
                        src={
                          mediaData?.brandLogo ? mediaData?.brandLogo : "..."
                        }
                        alt=""
                        width="100%"
                        onClick={() => {
                          setLogoImageOpen(mediaData?.brandLogo);
                          setOpenImageBox(true);
                        }}
                      />
                    </figure>
                  </Box>
                </Box>
                {openImageBox && (
                  <Dialog
                    open={openImageBox}
                    onClose={() => setOpenImageBox(false)}
                    maxWidth="sm"
                  >
                    <DialogContent>
                      <img src={logoImageOpen} style={{ width: "100%" }} />

                      <Cancel
                        onClick={() => setOpenImageBox(false)}
                        style={{
                          position: "absolute",
                          zIndex: "111111111",
                          top: "0",
                          right: "0",
                          cursor: "pointer",
                          color: "#000",
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Typography variant="h6">Cover Image</Typography>
                <Box className={classes.imgbox}>
                  <Box className="controlimg">
                    <figure>
                      <img
                        src={
                          mediaData?.coverImage ? mediaData?.coverImage : "..."
                        }
                        alt=""
                        onClick={() => {
                          setCoverImageOpen(mediaData?.coverImage);
                          setOpenCoverBox(true);
                        }}
                        width="100%"
                      />
                    </figure>
                  </Box>
                </Box>
                {openCoverBox && (
                  <Dialog
                    open={openCoverBox}
                    onClose={() => setOpenCoverBox(false)}
                    maxWidth="sm"
                  >
                    <DialogContent>
                      <img src={coverImageOpen} style={{ width: "100%" }} />

                      <Cancel
                        onClick={() => setOpenCoverBox(false)}
                        style={{
                          position: "absolute",
                          zIndex: "111111111",
                          top: "0",
                          right: "0",
                          cursor: "pointer",
                          color: "#000",
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>
      <Box py={3} align="center" className="displayCenter">
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.goBack()}
        >
          Back
        </Button>
        {mediaData?.brandApproval === "PENDING" && (
          <>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "0px 10px" }}
              onClick={() => {
                setApproveRejct(true);
                setViewKey("Approve");
              }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setApproveRejct(true);
                setViewKey("Reject");
              }}
            >
              Reject
            </Button>
          </>
        )}
      </Box>
      {approveRejct && (
        <ConfirmationDialogBox
          openModal={approveRejct}
          heading={viewKey}
          description={`Are you sure, you want to ${viewKey} this brand?`}
          handleClose={() => setApproveRejct(false)}
          handleSubmit={() => handleApproveReject()}
          isLoading={isLoader}
        />
      )}
    </Box>
  );
};

export default ViewBrandNft;
