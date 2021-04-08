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
      successCallback()
     
      
    } else {
      errCallback(_.get(data, "message", ""));
    }
  } catch (error) {
    errCallback("Please try again later");
  }
};

export const initialSave = (reqData, token, HandleChange,newVal) => async (
  dispatch
) => {
  try {
    const { data } = await api.initialSave(reqData, token);
    const successStatusCd = _.get(data, "status", "");
    if (successStatusCd === responseStatusConstants.SUCCESS) {
      console.log("success");
     HandleChange(null,parseInt(newVal));
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

export const uploadFile = (reqData, token, vendorId, fieldName) => async (
  dispatch
) => {
  try {
    console.log(reqData, token, vendorId, fieldName)
    const { data } = await api.uploadFile(reqData, token,vendorId, fieldName);
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
