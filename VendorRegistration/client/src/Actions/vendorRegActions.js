import _ from "lodash";
import * as api from "../Api";
import responseStatusConstants from "../Constants/responseStatusCode";

export const getAllRegistrations = (userId, token, errCallback) => async (
  dispatch
) => {
  try {
    const { data } = await api.getAllRegistrations({ initRegId: userId }, token);
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

export const getUserInfo = (userId, token, errCallback) => async (
  dispatch
) => {
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