import React, { useContext } from "react";

import PropTypes from "prop-types";
import {
  makeStyles,
  IconButton,
  Typography,
  SvgIcon,
  Toolbar,
  AppBar,
  Hidden,
  Avatar,
  Grid,
  Box,
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "src/context/Auth";
import Logo from "src/component/Logo";
import { BiBell } from "react-icons/bi";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    padding: "4px 30px 4px 30px",
    background: "transparent",
    [theme.breakpoints.down("sm")]: {
      padding: "4px 20px 0px 20px",
    },
  },
  logo: {
    marginRight: theme.spacing(2),
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    "& + &": {
      marginLeft: theme.spacing(2),
    },
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  mainheader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",

    "& svg": {
      color: theme.palette.text.primary,
    },
    "& .leftBox": {
      width: "306px",
      [theme.breakpoints.down("md")]: {
        width: "200px",
      },
      [theme.breakpoints.down("xs")]: {
        width: "150px",
      },
      "& img": {
        width: "100px",
        [theme.breakpoints.down("xs")]: {
          width: "100px",
          paddingLeft: "0 !important",
        },
      },
    },
  },
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar
      elevation={0}
      className="headerBox"
      color="inherit"
      // style={{
      //   background: "rgba(255, 255, 255, 0.8)",
      //   backdropFilter: "blur(44px)",
      // }}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="#00e0b0"
            onClick={onMobileNavOpen}
            style={{ padding: "0px" }}
          >
            <SvgIcon>
              <MenuIcon style={{ color: "#0DCCFD", fontSize: "25px" }} />
            </SvgIcon>
          </IconButton>
        </Hidden>
        &nbsp; &nbsp;
        <Box 
        // className={classes.mainheader}
        >
          {/* <Grid container alignItems="center">
            <Grid item lg={3} md={3} sm={4} xs={6}>
              <Box className="leftBox">
                <Logo width="125" />
              </Box>
            </Grid>
            <Hidden xsDown>
              <Grid lg={4} md={6} sm={5}></Grid>
            </Hidden>
           
          </Grid> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};
TopBar.defaultProps = {
  onMobileNavOpen: () => {},
};

export default TopBar;

export function TopBarData() {
  const classes = useStyles();
  const history = useHistory();
  const auth = useContext(AuthContext);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Hidden xsDown>
          <Box>
            <Typography variant="h5">NFT Marketplace</Typography>
            <Typography variant="body1" style={{ color: "#ffffff9c" }}>
              example@gmail.com
            </Typography>
          </Box>
        </Hidden>
        &nbsp; &nbsp;
        <Avatar
          src={
            auth?.userData?.profilePic
              ? `${auth?.userData?.profilePic}`
              : "https://picsum.photos/533/357"
          }
          className={classes.avatar}
          // onClick={() => history.push("/admin-profile")}
        />
      </Box>
    </>
  );
}
