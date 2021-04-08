import _ from "lodash";
import * as api from "../Api";
import responseStatusConstants from "../Constants/responseStatusCode";


export const login = (loginData, callback, history) => async (dispatch) => {
  try {
    const { data } = await api.login(loginData);
    const loginStatus = _.get(data, "status", "");
    if (loginStatus === responseStatusConstants.SUCCESS) {
      localStorage.setItem("auth-token", data.token);
      dispatch({ type: "USER_INFO", payload: data });
      dispatch({ type: "LOGIN", payload: true });
      let company = _.get(data, "userInfo.companyDetail", []);
      dispatch({ type: "CHANGE_COMPANY", payload: company[0] });
      history.push("/main");
    } else {
      callback(_.get(data, "message", ""));
    }
  } catch (error) {
    callback("Please try again later");
  }
};
