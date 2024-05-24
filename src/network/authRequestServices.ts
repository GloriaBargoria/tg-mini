import axios from "axios";
import { LoginTypes, OtpTypes } from "../types/authTypes";
const PREFIX_API =
  import.meta.env.VITE_NEXT_APP_API_HOST_PREFIX_LOCAL ||
  "http://localhost:5001";
const endpoint = `${PREFIX_API}/telegram`;

// we have no headers in our requests currently

// create supergroup interface
interface DataType {
    phoneNumber: boolean;
    password?: boolean;
}

// id type
type IdType = string;

// create chat(group) interface

// get single group service

const getSingleGroup = (id: IdType) => {
  const config = {
    method: "GET",
    url: `${endpoint}/groups/${id}`,
    // withCredentials: true,
    // crossdomain: true,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
    },
  };
  return axios(config);
};

// get all groups request service
const getGroups = () => {
  const config = {
    method: "GET",
    url: `${endpoint}/groups`,
    // withCredentials: true,
    // crossdomain: true,
    // headers: {
    //   "Access-Control-Allow-Headers": "*",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "*",
    // },
  };
  return axios(config);
};

// create megagroup request service
const createGroup = (data: DataType) => {
  const config = {
    method: "POST",
    url: `${endpoint}/create-group`,
    data: data,
    // crossdomain: true,
    // withCredentials: true,
    // headers: {
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Headers": "*",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "*",
    // },
  };
  return axios(config);
};

// create chat (group) request service
const verifyOtp = (data: OtpTypes) => {
    const config = {
      method: "POST",
      url: `${endpoint}/verifyOtp`,
      data: data,
    };
    return axios(config);
  };

// add user to chat request service
// for future use (endpoint is ready)
const loginTelegram = (data: LoginTypes) => {
  const config = {
    method: "POST",
    url: `${endpoint}`,
    data: data,
  };
  return axios(config);
};

export { getSingleGroup, createGroup, getGroups, verifyOtp, loginTelegram };
