import React, { useContext, useEffect, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PropTypes from "prop-types";
import { GiWhiteBook } from "react-icons/gi";
import { MdAccountCircle, MdManageSearch } from "react-icons/md";
import { TbBrandSentry, TbApiApp } from "react-icons/tb";
import { MdCategory, MdOutlineContentPasteOff } from "react-icons/md";

import {
  Box,
  Drawer,
  Hidden,
  List,
  Button,
  ListSubheader,
  makeStyles,
  Typography,
  Slide,
  Avatar,
  Divider,
} from "@material-ui/core";
import { BiLock, BiTransfer, IoMdHammer } from "react-icons/all";
import NavItem from "./NavItem";
import { MdDashboard, MdEmojiEvents } from "react-icons/md";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import { HiUsers } from "react-icons/hi2";
import TuneIcon from "@material-ui/icons/Tune";
import ConfirmationDialogBox from "src/component/ConfirmationDialogBox";
import toast from "react-hot-toast";
import GroupIcon from "@material-ui/icons/Group";
import { useHistory } from "react-router-dom";
import { AuthContext } from "src/context/Auth";
import { FaRegNewspaper, FaRegFileAlt } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaPeopleCarry } from "react-icons/fa";

const sections = [
  {
    items: [
      {
        title: "Dashboard",
        icon: MdDashboard,
        href: "/dashboard",
      },
      {
        title: "User Management",
        icon: HiUsers,
        href: "/usermanagemet",
      },
      {
        title: "Order Management",
        icon: GiWhiteBook,
        href: "/order-mangement",
      },

      // {
      //   title: "Transaction Management",
      //   icon: BiTransfer,
      //   href: "/transaction-managemet",
      // },
      // {
      //   title: "API Category Content",
      //   icon: FaRegNewspaper,
      //   href: "/api-category-content",
      // },
      {
        title: "Product Management",
        icon: FaRegFileAlt,
        href: "/product-management",
      },
      {
        title: "Warehouse Management",
        icon: FaRegFileAlt,
        href: "/warehouse-mangement",
      },
      // {
      //   title: "FAQ Management",
      //   icon: MdManageSearch,
      //   href: "/faq-mangement",
      // },
      
      // {
      //   title: "Announcement",
      //   icon: TfiAnnouncement,
      //   href: "/list-announcement",
      // },
      // {
      //   title: "Partner Management",
      //   icon: FaPeopleCarry,
      //   href: "/list-partner",
      // },
      // {
      //   title: "Influencer Management  ",
      //   icon: RiTeamFill,
      //   href: "/influencer",
      // },
      // {
      //   title: "Api Hitrates",
      //   icon: TbApiApp,
      //   href: "/api-hitrates",
      // },
      // {
      //   title: "Brands  ",
      //   icon: TbBrandSentry,
      //   href: "/brands",
      // },
      // {
      //   title: "Control  ",
      //   icon: TuneIcon,
      //   href: "/control",
      // },
      // // {
      // //   title: "Category  ",
      // //   icon: MdCategory,
      // //   href: "/influencer-category",
      // // },
      // // {
      // //   title: "Content Management",
      // //   icon: MdOutlineContentPasteOff,
      // //   href: "/static",
      // // },
      // {
      //   title: "My Account",
      //   icon: MdAccountCircle,
      //   href: "/setting",
      // },
      // {
      //   title: "Change Password",
      //   icon: BiLock,
      //   href: "/change-password",
      // },
    ],
  },
];

function renderNavItems({ items, pathname, depth = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, pathname, depth }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />
    );
  }
  return acc;
}
const useStyles = makeStyles((theme) => ({
  mobileDrawer: {
    width: 256,
    background: "#fff",
    filter: "drop-shadow(0px 10px 40px rgba(142, 182, 210, 0.40))",
  },
  desktopDrawer: {
    top: "78px",
    width: "245px",
    height: "calc(100% - 108px)",
    padding: "10px",
    background: "#fff",
    boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.16)",
    borderRadius: "10px",
    borderRight: "none",
    marginLeft: "10px",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  socialIcon: {
    cursor: "pointer",
    marginRight: 5,
  },
  button: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    height: "45px",
    paddingLeft: "17px",
    borderRadius: "12px",
    marginTop: "-30px",
    "&:hover": {
      color: "#F5C843",
    },
    "& svg": {
      color: "#F5C843",
      fontSize: "20px",
    },
  },
  btnBox: {
    position: "relative",
    left: "30%",
    bottom: "-250px",
  },
  large: {
    width: "60px",
    height: "60px",
  },
  logoutButton: {
    left: "30px",
    bottom: "10px",
    display: "flex",
    position: "absolute",
    fontSize: "13px",
    background: "transparent",
    alignItems: "center",
    fontWeight: "400",
    justifyContent: "start",
    [theme.breakpoints.down("xs")]: {
      bottom: "10px",
      left: "37px",
    },
  },
  sideMenuBox: {
    "& .MuiDivider-root": {
      backgroundColor: "#5ed0f1",
    },
    "& .MuiCollapse-wrapperInner": {
      marginLeft: "45px",
    },
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box pt={0} pb={2}>
          <Box className="sideMenuBox">
            <Box className="displayCenter" flexDirection="column" mb={2} mt={2}>
              <Box>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    auth?.userData?.profilePic
                      ? auth?.userData?.profilePic
                      : "/images/profile.png"
                  }
                  className={classes.large}
                />
              </Box>
              <Box mt={2} mb={2}>
                <Typography variant="body2">
                  {auth?.userData?.name.slice(0, 16)}
                  {auth?.userData?.name.length > 16 && "..."}
                </Typography>
              </Box>

              <Divider width="95%" />
            </Box>

            {sections.map((section, i) => (
              <List
                key={`menu${i}`}
                subheader={
                  <ListSubheader disableGutters disableSticky>
                    {section.subheader}
                  </ListSubheader>
                }
              >
                {renderNavItems({
                  img: section.img,
                  items: section.items,
                  pathname: location.pathname,
                })}
              </List>
            ))}
          </Box>
        </Box>
        <Box className="displayCenter">
          <Button
            onClick={() => setIsLogout(true)}
            className={classes.logoutButton}
          >
            <ExitToAppIcon
              style={{
                marginRight: "16px",
              }}
            />
            &nbsp; Logout
          </Button>
        </Box>

        {isLogout && (
          <ConfirmationDialogBox
            openModal={isLogout}
            heading="Log Out"
            description="Are you sure you want to logout? This action will end your
            current session."
            handleClose={() => setIsLogout(false)}
            handleSubmit={() => {
              toast.success("You have been logout successfully!");
              window.localStorage.removeItem("token");
              auth.userLogIn(false, null);
              setIsLogout(false);
              history.push("/");
            }}
            isLoading={false}
          />
        )}
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <Box p={2}>{content}</Box>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
