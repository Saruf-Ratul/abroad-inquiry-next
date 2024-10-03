import axios from "axios";
import { api, BASE_URL } from "./apis";

/**
 * header configure for api request
 * @memberof module:api/request
 * @type {Object}
 */
const configParams = {
  "Content-Type": "application/json",
};

/**
 * Login api request
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const LOGIN_CALL = (data) => {
  return axios.post(api.auth.login, data, { headers: configParams });
};

/**
 * Get user informaiton request
 * @memberof module:api/request
 * @param {string} token 
 * @returns {Object}
 */
export const GET_INFO_CALL = (token) => {
  const headers = {
    "Content-Type": "application/json",
    authentication_token: `Bearer ${token}`,
  };
  return axios.get(api.auth.getInfo, { headers });
};

/**
 * Check user existence using email and send email
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const CHECKING_EMAIL_EXISTENCE_CALL = (data) => {
  return axios.post(api.auth.checkEmailExistence, data, {
    headers: configParams,
  });
};

/**
 * Password resetting
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const RESET_PASSWORD_CALL = (data) => {
  return axios.post(api.auth.resetPassword, data, { headers: configParams });
};
