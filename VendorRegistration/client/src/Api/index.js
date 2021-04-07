import axios from "axios";

export const login = (loginData) =>
  axios.post(`auth/login`, loginData, {
    withCredentials: true,
    credentials: "include",
  });

export const isTokenValid = (token) =>
  axios.post(`auth/isTokenValid`, null, { headers: { "x-auth-token": token } });

export const getAllRegistrations = (initRegId, token) =>
  axios.post(`vendor/getAllRegistrations`, initRegId, {
    headers: { "x-auth-token": token },
  });

export const getUserInfo = (initRegId, token) =>
  axios.post(`register/getUserInfo`, initRegId, {
    headers: { "x-auth-token": token },
  });

export const addNewCompany = (newCompany, token) =>
  axios.post(`register/addNewCompany`, newCompany, {
    headers: { "x-auth-token": token },
  });

export const initialSave = (reqData, token) =>
  axios.post(`vendor/initialSave`, reqData, {
    headers: { "x-auth-token": token },
  });

export const uploadFile = (reqData, token, vendorId, fieldName) =>
  axios.post(`vendor/uploadFile`, reqData, {
    headers: {
      "x-auth-token": token,
      vendorId: vendorId,
      fieldName: fieldName,
    },
  });
