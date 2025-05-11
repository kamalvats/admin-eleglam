import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import ApiConfig from "src/ApiConfig/ApiConfig";
import { calculateTimeLeft } from "src/utils";

export const AuthContext = createContext();

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("token", accessToken);
    axios.defaults.headers.common.Authorization = accessToken;
  } else {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
  }
};

function checkLogin() {
  const accessToken = window.localStorage.getItem("token");
  return accessToken ? true : false;
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin());
  const [userData, setUserData] = useState();
  const [endTime, setEndtime] = useState();
  const [timeLeft, setTimeLeft] = useState();

  const viewUserProfile = async (token) => {
    try {
      const response = await axios({
        url: ApiConfig.viewProfile,
        method: "GET",
        headers: {
          token: token,
        },
      });
      if (response.status === 200) {
        setUserData(response.data.adminProfile);
      } else {
        setUserData();
      }
    } catch (error) {
      console.log(error);
      setUserData();
    }
  };

  useEffect(() => {
    if (endTime) {
      const timer = setTimeout(() => {
        setTimeLeft(calculateTimeLeft(endTime));
        localStorage.setItem(
          "otpTimer",
          JSON.stringify(calculateTimeLeft(endTime))
        );
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      viewUserProfile(localStorage.getItem("token"));
    }
  }, [localStorage.getItem("token")]);

  let data = {
    userLoggedIn: isLogin,
    userData,
    setEndtime,
    setTimeLeft,
    timeLeft,
    viewUserProfile: viewUserProfile,
    userLogIn: (type, data) => {
      setSession(data);
      setIsLogin(type);
    },
  };

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  );
}
