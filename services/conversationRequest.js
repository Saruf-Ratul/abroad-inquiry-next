import axios from "axios";
import { api } from "./apis";
import Cookies from "js-cookie";

/**
 * header configuration for api request
 * @memberof module:api/request
 * @returns {Object}
 */
const configParamsWithToken = () => {
  const token = Cookies.get("token");
  return {
    "Content-Type": "application/json",
    authentication_token: token ? `Bearer ${token}` : null,
  };
};

/**
 * api request to create new conversation
 * @memberof module:api/request
 * @param {Object} data -The object data
 * @returns {Object}
 */
export const CREATE_NEW_CONVERSATION_CALL = (data) => {
  return axios.post(`${api.chat.createNewConversation}`, data, {
    headers: configParamsWithToken(),
  });
};

/**
 * api request to retrive old conversations
 * @memberof module:api/request
 * @param {Number} page -
 * @returns {Object}
 */
export const GET_OLD_CONVERSATION_CALL = (page) => {
  return axios.get(`${api.chat.getOldConversation}/${page}`, {
    headers: configParamsWithToken(),
  });
};

/**
 * api request to retrve message
 * @memberof module:api/request
 * @param {Number} conversationId -
 * @param {Number} pageNumber -
 * @returns {Object}
 */
export const GET_MESSAGE_CALL = (conversationId, pageNumber) => {
  //this is new
  return axios.get(`${api.chat.getMessage}/${conversationId}/${pageNumber}`, {
    headers: configParamsWithToken(),
  });
};

/**
 * api request to search conversatio
 * @memberof module:api/request
 * @param {string} keyword -
 * @param {Number} pageNumber -
 * @returns {Object}
 */
export const SEARCH_CONVERSATION_CALL = (keyword, pageNumber) => {
  return axios.get(
    `${api.chat.searchConversation}/${pageNumber}?clue=${keyword}`,
    {
      headers: configParamsWithToken(),
    }
  );
};
