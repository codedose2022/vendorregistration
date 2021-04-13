import _ from "lodash";
import * as api from "../Api";
import responseStatusConstants from "../Constants/responseStatusCode";

export const getAllRegistrations = (userId, token, errCallback) => async (
  dispatch
) => {
  try {
    const { data } = await api.getAllRegistrations(
      { initRegId: userId },
      token
    );
    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      dispatch({ type: "ALL_VENDORS", payload: data.vendorRegistrationsList });
    } else {
      errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    errCallback("Please try again later");
  }
};

export const getUserInfo = (userId, token, errCallback) => async (dispatch) => {
  try {
    const { data } = await api.getUserInfo({ initRegId: userId }, token);
    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      dispatch({ type: "UPDATE_USER_INFO", payload: data.userInfo });
    } else {
      errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    errCallback("Please try again later");
  }
};

export const addNewCompany = (
  newCompany,
  errCallback,
  token,
  userId,
  successCallback
) => async (dispatch) => {
  try {
    const { data } = await api.addNewCompany(newCompany, token);

    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      dispatch(getUserInfo(userId, token, errCallback));
      successCallback();
    } else {
      errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    errCallback("Please try again later");
  }
};

export const initialSave = (reqData, token, change, newVal) => async (
  dispatch
) => {
  try {
    const { data } = await api.initialSave(reqData, token);
    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      if (newVal === "8") {
        dispatch(submit(reqData.vendorId, token));
      } else {
        console.log(data)
        console.log("icecream")
        change(null, parseInt(newVal));
        
      }
      dispatch({ type: "ALL_VENDORS", payload: data.vendorRegistrationsList });
    } else {
      console.log("no success");
      //errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    console.log(error.message);
    console.log("catch");
    //errCallback("Please try again later");
  }
};

export const submit = (reqData, token) => async (dispatch) => {
  try {
    console.log(reqData);
    const { data } = await api.submit(reqData, token);
    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      console.log("success");
      
      // dispatch({ type: "ALL_VENDORS", payload: data.vendorRegistrationsList });
    } else {
      console.log("no success");
      //errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    console.log("catch", error);
    //errCallback("Please try again later");
  }
};

export const uploadFile = (reqData, token, vendorId, fieldName) => async (
  dispatch
) => {
  try {
    console.log(reqData, token, vendorId, fieldName);
    const { data } = await api.uploadFile(reqData, token, vendorId, fieldName);
    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      console.log("success");
      // dispatch({ type: "ALL_VENDORS", payload: data.vendorRegistrationsList });
    } else {
      console.log("no success");
      //errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    console.log("catch");
    //errCallback("Please try again later");
  }
};

export const getUserApplications = (initRegId, token) => async (dispatch) => {
  try {
    const { data } = await api.getUserApplications(
      { initRegId: initRegId },
      token
    );
    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      dispatch({ type: "GET_APPLICATIONS", payload: data.applications });
    } else {
      console.log("no success");
    }
  } catch (error) {
    console.log("catch");
    //errCallback("Please try again later");
  }
};
