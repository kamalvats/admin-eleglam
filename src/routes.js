import React, { lazy } from "react";
import { Redirect } from "react-router-dom";
import DashboardLayout from "src/layouts/DashboardLayout";
import LoginLayout from "./layouts/LoginLayout/inedx";

export const routes = [
  {
    exact: true,
    path: "/",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Login")),
  },

  {
    exact: true,
    path: "/verify-otp",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Verifyotp")),
  },
  {
    exact: true,
    path: "/forget",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Forgot")),
  },
  {
    exact: true,
    path: "/reset",
    layout: LoginLayout,
    component: lazy(() => import("src/views/pages/Auth/Reset")),
  },

  {
    exact: true,
    guard: true,
    path: "/change-password",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/Setting/Changepassword")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/setting",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Setting/Profile")),
  },
  {
    exact: true,
    guard: true,
    path: "/dashboard",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/Dashboard/DashboardHome")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/usermanagemet",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/UserManagement/UserManagment")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/user-details",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/UserManagement/UserDetails")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/faq-mangement",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/FaqManagement/Faqtable")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/view-faq",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/FaqManagement/ViewFaq")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/static",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Static/index")),
  },
  {
    exact: true,
    guard: true,
    path: "/view-content",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/FaqManagement/ViewFaq")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/add-faq",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/FaqManagement/AddFaqs")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/add-static",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/FaqManagement/AddFaqs")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/notification",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Static/Notification")),
  },

  {
    exact: true,
    guard: true,
    path: "/order-mangement",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/SubAdminManagement/index")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/warehouse-mangement",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/WarehouseManagement/index")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/order-detail-page",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/SubAdminManagement/OrderDetail")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/add-whitelist",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/SubAdminManagement/AddNewSubAdmin")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/view-whitelist",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/SubAdminManagement/ViewSubAdmin")
    ),
  },

  {
    exact: true,
    guard: true,
    path: "/confirmation-dialog",
    layout: DashboardLayout,
    component: lazy(() => import("src/component/ConfirmationDialogBox")),
  },
  // {
  //   exact: true,
  //   path: "/rewards-dialog",
  //   layout: DashboardLayout,
  //   component: lazy(() => import("src/component/RewardsDialogBox")),
  // },

  {
    exact: true,
    guard: true,
    path: "/userlisted-nftdetails",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/UserManagement/UserListedNftDetails")
    ),
  },

  {
    exact: true,
    guard: true,
    path: "/userlisted-nft",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/UserManagement/UserListedNFTs")
    ),
  },

  // {
  //   exact: true,
  //   guard: true,
  //   path: "/transaction-managemet",
  //   layout: DashboardLayout,
  //   component: lazy(() =>
  //     import("src/views/pages/Admin/TransactionManagment/TransactionManagement")
  //   ),
  // },
  {
    exact: true,
    guard: true,
    path: "/api-category-content",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/CategoryManagement/index")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/add-sub-category",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/CategoryManagement/AddCategory")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/product-management",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/ApiContentManagement/ApiContentManagement")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/add-product",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/ApiContentManagement/AddCategory")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/view-catogory",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/ApiContentManagement/ViewCategory")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/influencer",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/InfluencerManagement/InfluencerList")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/api-hitrates",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/ApiHitrates/ApiHitratesList")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/edit-api-hitrates",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/ApiHitrates/EditApiHitrates")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/brands",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Brands/BrandList")),
  },
  {
    exact: true,
    guard: true,
    path: "/view-brandnft",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Brands/ViewBrandNft")),
  },
  {
    exact: true,
    guard: true,
    path: "/control",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Control/Control")),
  },
  {
    exact: true,
    guard: true,
    path: "/influencer-category",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/InfluencerCategory/index")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/list-announcement",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/Announcement/ListAnnouncement")
    ),
  },
  { 
    exact: true,
    guard: true,
    path: "/add-announcement",
    layout: DashboardLayout,
    component: lazy(() =>
      import("src/views/pages/Admin/Announcement/AddAnnouncement")
    ),
  },
  {
    exact: true,
    guard: true,
    path: "/list-partner",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Partner/ListPartner")),
  },
  {
    exact: true,
    guard: true,
    path: "/add-partner",
    layout: DashboardLayout,
    component: lazy(() => import("src/views/pages/Admin/Partner/AddPartner")),
  },

  {
    exact: true,
    path: "/404",
    component: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    component: () => <Redirect to="/404" />,
  },
];
