import axios from "axios";
import ApiConfig from "../ApiConfig";

export const postAPIHandler = async ({ endPoint, dataToSend, paramsData }) => {
  try {
    let obj ={
      method: "POST",
      url: ApiConfig[endPoint],
      headers: {
        token:window.localStorage.getItem("token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    }
    console.log("ffffffffffffffffffffffffff",obj)
    return await axios(obj);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const putAPIHandlerCall = async ({
  endPoint,
  dataToSend,
  paramsData,
}) => {
  try {
    return await axios({
      method: "PUT",
      url: ApiConfig[endPoint],
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const getAPIHandler = async ({ endPoint, id, source, paramsData }) => {
  try {
    return await axios({
      method: "GET",
      url: id ? `${ApiConfig[endPoint]}/${id}` : ApiConfig[endPoint],
      params: paramsData ? paramsData : null,
      headers: {
        token: window.localStorage.getItem("token"),
      },
      cancelToken: source ? source.token : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const patchAPIHandler = async ({ endPoint, dataToSend, paramsData }) => {
  try {
    return await axios({
      method: "PATCH",
      url: ApiConfig[endPoint],
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const deleteAPIHandler = async ({
  endPoint,
  dataToSend,
  paramsData,
}) => {
  try {
    return await axios({
      method: "DELETE",
      url: ApiConfig[endPoint],
      headers: {
        token: window.localStorage.getItem("token"),
      },
      data: dataToSend ? dataToSend : null,
      params: paramsData ? paramsData : null,
    });
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
