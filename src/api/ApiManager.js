import axios from "axios";

export const ApiManager = axios.create({
  baseURL: "/notitas_auth/api/v1/auth/login",
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-type": "application/json"
  }
});