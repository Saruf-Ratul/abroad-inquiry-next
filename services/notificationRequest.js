import axios from "axios";
import { api } from "./apis";
import Cookies from "js-cookie";

/**
 * header configure for api request 
 * @memberof module:api/request
 * @type {Object}
 */
const configParamsWithToken = () => {
  const token = Cookies.get("token");
  return {
    "Content-Type": "application/json",
    authentication_token: token ? `Bearer ${token}` : null,
  };
};

/**
 * Read notificaiton api request
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const READ_NOTIFICATION_CALL = (data) => {
  return axios.post(api.notification.readNotification, data, { headers: configParamsWithToken() });
};

/**
 * Add to calender api request
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const ADD_TO_CALENDER_CALL = (data) => {
  return axios.post(api.notification.addToCalender, data, { headers: configParamsWithToken() });
};
