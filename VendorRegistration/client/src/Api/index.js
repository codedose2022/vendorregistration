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