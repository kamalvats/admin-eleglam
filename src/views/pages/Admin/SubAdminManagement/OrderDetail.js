import React, { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  Grid,
  Box,
  Divider,
  Typography,
  Button,
} from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import toast from "react-hot-toast";
import { AuthContext } from "src/context/Auth";
import { getAPIHandler, postAPIHandler } from "src/ApiConfig/service";

const useStyles = makeStyles((theme) => ({
  startBox: {
    display: "flex",
    marginLeft: "8%",
    marginTop: "3%",
    gap: "20px",
  },
  headBox: {
    display: "flex",
    alignItems: "center",
  },
  headText: {
    fontFamily: "Playfair Display",
    fontSize: "30px",
    fontWeight: 700,
    lineHeight: "39.99px",
  },
  firstDivider: {
    marginTop: "3em",
    width: "84%",
  },
  secondHeadBox: {
    display: "flex",
    marginLeft: "8%",
    marginTop: "2%",
    gap: "20px",
  },
  container: {
    width: "87%",
    margin: "0 auto", // Center the container
  },
  imgBox: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  flex: {
    display: "flex",
  },
  firstProductBox: {
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
    marginLeft: "2rem",
    marginTop: "2rem",
  },
  mainBoxImg: {
    justifyContent: "center",
    alignSelf: "center",
    paddingRight: "25px",
    height: "100%",
  },
  vertcalDivider: {
    height: "20px",
  },
  divider: {
    marginTop: "25px",
    marginBottom: "20px",
    border: "1px  #D8D7D7",
  },
  typo: {
    fontFamily: "Nunito Sans",
    fontSize: "14px",
    fontWeight: 600,
    lineHeight: "20px",
  },
  headTypo: {
    fontFamily: "Playfair Display",
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: "20px",
  },
  ProductText: {
    fontFamily: "Playfair Display",
    fontSize: "20px",
    fontWeight: 700,
    marginTop: "5%",
    lineHeight: "26.66px",
  },
  ProductsecondText: {
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontWeight: 600,
    lineHeight: "24.55px",
    color: "#4D8C40",
  },
  ProductCommonText: {
    fontFamily: "Nunito Sans",
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "24.55px",
  },
  lineThrough: {
    textDecoration: "line-through",
    color: "grey",
  },
  searchBox: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  valueText: {
    fontFamily: "Nunito Sans",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "19.1px",
  },
  payText: {
    fontFamily: "Nunito Sans",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "16.37px",
  },
  ProductQuantityText: {
    fontFamily: "Nunito Sans",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "19.1px",
  },
  productBox: {
    margin: "8%",
    width: "100%",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2.5),
    display: "flex",
    justifyContent: "space-between", // Align children to the ends
    border: "1px solid #33333333",
    marginTop: "15px",
    "@media(max-width:767px)": {
      flexDirection: "column",
    },
  },
  image: {
    width: "7rem",
    height: "8rem",
    marginTop: "10%",
    // marginRight: theme.spacing(2),
  },
  statusBox: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  selectDate: {
    marginLeft: "2rem",
    borderRadius: "10rem",
    border: "1px solid #ccc",
    padding: theme.spacing(2),
    display: "flex", // Make it a flex container
    alignItems: "center", // Center align the content vertically
    background: "#f0f0f0", // Add a background color
  },
  formkeyboardPicker: {
    width: "35%",
    height: "80%",
  },

  keyboardPicker: {
    marginLeft: "1.5rem",
    borderRadius: "10rem",
    // border: "1px solid #ccc",
    borderRadius: "100px",
    height: "100%",
    justifyContent: "center",
    // padding: theme.spacing(2),
    display: "flex", // Make it a flex container
    alignItems: "center", // Center align the content vertically
    background: "#f0f0f08f", // Add a background color
  },
  mainBox: {
    display: "flex",
  },
  dropBox: {
    width: "20%",
    height: "80%",
    // border: "1px solid #ccc",

    borderRadius: "100px",
    marginLeft: "3%",

    "& .MuiSelect-select": {
      background: "none",
    },
  },
  select: {
    height: "100%",
    background: "#f0f0f08f",

    borderRadius: "100px",
  },
  all: {
    marginLeft: "1rem",
    borderRadius: "10rem",
    padding: theme.spacing(1),
    width: "7rem",
    border: "1px solid #D8D7D7",
    display: "flex", // Make it a flex container
    alignItems: "center", // Center align the content vertically
    background: "#f0f0f0", // Add a background color
  },
  calendarImage: {
    width: 30, // Increase the width of the calendar image
    marginRight: theme.spacing(1), // Add some space between the calendar image and the text field border
  },
  searchField: {
    borderRadius: "9rem", // Add border radius to the search field
    marginRight: theme.spacing(1), // Add spacing between the two input fields
    padding: theme.spacing(2), // Add padding to match TextField styling
    border: "none",
    background: "#f0f0f08f",
    width: "20rem", // Add border to match TextField styling
  },
  searchimg: {
    //  marginRight:"15px",
  },
  descriptionBox: {
    border: "0.5px solid #7E563D",
    borderRadius: "5px",
    padding: "2px 7px 2px 7px",
    height: "23px",
    marginLeft: "6px",
    fontSize: "12px",
    color: "#7E563D",
    fontFamily: "Poppins",
  },
  root: {
    width: "100%",
    marginTop: "3%",
    marginBottom: "15%",
    "& .MuiStepConnector-completed": {
      "& .MuiStepConnector-lineHorizontal": {
        border: "3.1px solid #4DB044",
      },
    },

    "& .MuiStep-completed + .MuiStep-horizontal .Mui-disabled .MuiStepConnector-line":
      {
        border: "3.1px solid #4DB044",
      },
    "& .MuiStepIcon-root": {
      fontSize: "30px",
    },

    "& .MuiStepIcon-root.MuiStepIcon-completed": {
      color: "#4DB044",
    },
    "& .MuiStepConnector-line": {
      display: "block",
      border: "3.1px solid #D9D9D9",
      marginTop: "5px",
    },
  },
  freeText: {
    color: "#7E563D",
  },

  rupeeText: {
    fontFamily: "Nunito Sans",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "16px",
    letterSpacing: "0.005em",
  },
  label: {
    fontFamily: "Nunito Sans",
    fontSize: "16px",
    fontWeight: 400,
    color: "black",
    lineHeight: "24.42px",
  },
  totalText: {
    fontFamily: "Nunito Sans",
    fontSize: "14px",
    fontWeight: "bold",
    lineHeight: "19.1px",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  circleIcon: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "2px solid #D9D9D9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#7E563D",
  },
  imageIcon: {
    borderRadius: "50%",
  },
  completedCircle: {
    background: "#4DB044",
    border: "none",
  },
  incompletedCircle: {
    background: "#D9D9D9",
    border: "none",
  },
}));

const Page3 = () => {
  const classes = useStyles();
  const { userDetails } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const orderItem = location.state?.order;
  console.log(orderItem);
  // const [activeStep, setActiveStep] = React.useState(4);

  const [orderDetails, setOrderDetails] = useState("");
  console.log("object12121212", orderDetails);

  const handleCancel = async () => {
    try {
      const response = await postAPIHandler({
        endPoint: "cancelOrder",
        dataToSend: {
          _id: orderItem,
        },
      });
      if (response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        handleOrderList();
      }
    } catch (error) {
      console.log(" error ", error);
    }
  };

  const handleOrderList = async (pincode) => {
    try {
      const response = await getAPIHandler({
        endPoint: "viewOrder",
        // source: source,
        paramsData: {
          _id: orderItem,
        },
      });
      //   const response = await axios({
      //     method: "GET",
      //     url: apiConfig.viewOrder,
      //     headers: {
      //       token: window.sessionStorage.getItem("ELEGLAMToken"),
      //     },
      //     params:{
      //       _id: orderItem
      //     }

      //   });

      if (response.data && response.data.responseCode === 200) {
        toast.success(response.data.responseMessage);
        setOrderDetails(response.data.result);
        console.log("object", response.data.result);
      } else {
        toast.error("Invalid Pincode. Please enter again.");
      }
    } catch (error) {
      toast.error("Failed to fetch state and district");
    }
  };

  useEffect(() => {
    handleOrderList();
  }, []);

  const date = new Date(orderDetails?.createdAt || "");

  // Format date and time with AM/PM
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <>
      <Grid container style={{ background: "white" }}>
        <Box className={classes.startBox}>
          <Box className={classes.headBox}>
            <ArrowBackIcon
              className={classes.arrow}
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={() => history.goBack()}
            />
          </Box>
          <Box className={classes.headBox}>
            <Typography className={classes.headText} variant="h2">
              Order Detail
            </Typography>
          </Box>
        </Box>
        {/* divider */}
        <Grid container justifyContent="center">
          <Divider className={classes.firstDivider} />
        </Grid>

        <Box className={classes.secondHeadBox}>
          <Box>
            <Typography className={classes.typo}>
              Ordered on {`${formattedDate}, ${formattedTime}`}
            </Typography>
          </Box>
          <Box mx={1}>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.vertcalDivider}
            />
          </Box>
          <Box>
            <Typography className={classes.typo}>
              Order# {orderDetails?.orderId || ""}
            </Typography>
          </Box>
          <Box mx={1}>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.vertcalDivider}
            />
          </Box>
          <Box mx={1}>
            <Typography className={classes.typo}>
              {/* {orderDetails?.orderId || ""} */}
              {orderDetails?.status || ""}
            </Typography>
          </Box>
        </Box>

        {/* box */}

        <Box className={classes.productBox}>
          <Box className={classes.mainBox}>
            <Box className={classes.imgBox}>
              <Typography variant="body1" className={classes.headTypo}>
                Product
              </Typography>
              {orderDetails?.products?.map((product, index) => (
                <Box key={index} style={{ display: "flex" }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                    # {index + 1}
                  </Typography>
                  <img
                    src={product?.productId?.images[0]}
                    className={classes.image}
                  />
                  <Box className={classes.firstProductBox}>
                    <Typography variant="body2" className={classes.ProductText}>
                      {product?.productId?.productTitle || ""}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={classes.ProductsecondText}
                    >
                      ₹{product?.productId?.price || ""}
                    </Typography>
                    <Typography
                      variant="body2"
                      className={classes.ProductQuantityText}
                    >
                      Qty : {product?.quantity || ""}
                    </Typography>
                    <Typography variant="body2" className={classes.valueText}>
                      {product?.productId?.productDetails || ""}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
          <Box className={classes.flex}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <Typography variant="body1" className={classes.headTypo}>
                Deliver To
              </Typography>
              <Typography variant="body1" className={classes.ProductText}>
                {orderDetails?.address?.name || ""}
              </Typography>
              <Typography
                variant="body1"
                className={classes.ProductCommonText}
              ></Typography>
              <Typography variant="body2" className={classes.ProductCommonText}>
                {orderDetails?.address?.address || ""}
              </Typography>
              <Typography variant="body2" className={classes.ProductCommonText}>
                {orderDetails?.address?.phone || ""}
              </Typography>
              <Typography variant="body2" className={classes.ProductCommonText}>
                {userDetails?.email || ""}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.flex}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.4rem",
              }}
            >
              <Typography variant="body1" className={classes.headTypo}>
                Payment Details
              </Typography>
              <Box style={{ display: "flex", marginTop: "5%", gap: "5rem" }}>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                  }}
                >
                  <Typography variant="body2" className={classes.payText}>
                    Subtotal
                  </Typography>
                  <Typography variant="body2" className={classes.payText}>
                    Discount
                  </Typography>
                  <Typography variant="body2" className={classes.payText}>
                    Total
                  </Typography>
                  <Typography variant="body2" className={classes.payText}>
                    Shipping & Handling <br />
                    (Standard)
                  </Typography>
                  <Typography variant="body2" className={classes.totalText}>
                    Grand Total
                  </Typography>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                  }}
                >
                  <Typography variant="h6" className={classes.rupeeText}>
                    Rs. {orderDetails?.amount + orderDetails?.totalDiscount}.00
                  </Typography>
                  <Typography variant="body2" className={classes.rupeeText}>
                    - Rs. {orderDetails?.totalDiscount}.00{" "}
                  </Typography>
                  <Typography variant="body2" className={classes.rupeeText}>
                    Rs. {orderDetails?.amount}.00{" "}
                  </Typography>
                  <Typography variant="body2" className={classes.rupeeText}>
                    Rs. <span className={classes.lineThrough}>75</span>{" "}
                    <span className={classes.freeText}>FREE</span>
                  </Typography>

                  <Typography variant="body2" className={classes.rupeeText}>
                    <br />
                    Rs. {orderDetails?.amount}.00
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {orderDetails?.status === "PENDING" && (
          <Box
          style={{
            margin: "3%",
            width: "100%",
            display: "flex",
            justifyContent: "end", // Align children to the ends
            marginTop: "15px",
            paddingLeft: "70%",
            paddingRight: "6%",
          }}
          >
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={handleCancel}
            >
              Cancel Order
            </Button>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Page3;
