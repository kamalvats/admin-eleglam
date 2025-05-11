import React, { useState } from "react";
import {
  makeStyles,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
  FormControl,
  Typography,
  TextField,
  Box,
  Button,
  Avatar,
  Divider,
  Grid,
  Hidden,
} from "@material-ui/core";
import { IoClose } from "react-icons/io5";
// import CheckOutModal from "src/component/CheckOutModal";
// import Motion from "src/component/Motion";

const useStyles = makeStyles((theme) => ({
  connectModalBox: {
    padding: "30px",
    [theme.breakpoints.down("xs")]: {
      padding: "10px",
    },
    "& .leftWalletImg": {
      width: "auto",
      maxWidth: "356px",
    },
    "& h4": {
      color: "#fff",
      fontWeight: "300",
      [theme.breakpoints.down("xs")]: {
        fontSize: "12px",
      },
    },
    "& h6": {
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: "300",
      marginTop: "12px",
    },
    "& p": {
      // color: "red",
    },
    "& .gridFlex": {
      padding: "30px 27px",
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "6px",
      },
    },
  },
  walletBox: {
    display: "flex",
    justifyContent: "space-between",
    "& .Wallet": {
      background: "rgb(21 20 20)",
      padding: "31px 40px",
      borderRadius: "14px",
      // minWidth: "113px",
      marginRight: "9px",
      marginTop: "24px",
      border: "1px solid #2c2c2c",
      "& h5": {
        marginTop: "16px",
        color: "#fff",
        whiteSpace: "pre",
        [theme.breakpoints.down("xs")]: {
          fontSize: "14px !important",
          marginTop: "6px",
        },
      },
      [theme.breakpoints.down("xs")]: {
        padding: "20px",
        marginLeft: "5px",
      },
      "& img": {
        [theme.breakpoints.down("xs")]: {
          maxWidth: "35px",
          width: "auto",
        },
      },
    },
  },
  cancelBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    "& svg": {
      color: "#fff",
      fontWeight: "700",
    },
  },
}));

function ConnectModal({ open, setOpen }) {
  const classes = useStyles();
  const [checkout, setCheckout] = React.useState(false);
  const handleOpenCheckOut = () => {
    setCheckout(true);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
        style={{ borderRadius: "20px" }}
      >
        <DialogContent className="borderShadowBox">
          <Box className={classes.connectModalBox}>
            <Grid container spacing={3}>
              <Hidden smDown>
                <Grid item xs={6} sm={6} md={6} align="center">
               
                  <img src="images/connet_left.png" className="leftWalletImg" />
                </Grid>
              </Hidden>

              <Grid item xs={12} sm={12} md={6}>
                <Box className="gridFlex">
                  <Box>
                    <Typography className="ubuntu" variant="h4">
                      Connect your Wallet
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="body2">
                      Choose your wallet, that you want to connect.
                    </Typography>
                  </Box>
                  <Box className={classes.walletBox}>
                    <Box align="center" className="Wallet">
                      <img width="45px" src="images/MetaMaskImg.png" />
                      <Typography variant="body2">Metamask</Typography>
                    </Box>
                    <Box align="center" className="Wallet">
                      <img width="57px" src="images/WayConnectImg.png" />
                      <Typography variant="body2">Way Connect</Typography>
                    </Box>
                  </Box>
                  <Box mt={4}>
                    <Typography variant="body2" style={{ color: "red" }}>
                      Wallet is Wallet?
                    </Typography>
                  </Box>
                  {/* <Box mt={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpenCheckOut}
                    >
                      Connect Wallet
                    </Button>
                  </Box> */}
                </Box>
              </Grid>
            </Grid>

            <IconButton
              className={classes.cancelBtn}
              onClick={() => setOpen(false)}
            >
              <IoClose />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
      {/* <CheckOutModal
        setCheckout={setCheckout}
        checkout={checkout}
        setOpen={setOpen}
      /> */}
    </>
  );
}

export default ConnectModal;
