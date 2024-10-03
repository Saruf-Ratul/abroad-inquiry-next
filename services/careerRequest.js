import axios from "axios";
import { api } from "./apis";

const configParams = {
  "Content-Type": "application/json",
};

/**
 * Api request to retrive all career
 * @memberof module:api/request
 * @param {Number} pageNo
 * @returns {Object}
 */
// get all Career
export const GET_ALL_CAREER = (page) => {
  return axios.get(`${api.careers.getAllCareer}?page=${page}`, {
    headers: configParams,
  });
};

/**
 * Api request to retrive a career detailed information
 * @memberof module:api/request
 * @param {Number} careerPostId
 * @returns {Object}
 */
//Get career info by giving an id
export const GET_ONE_CAREER_DETAILS = (careerPostId) => {
  return axios.get(`${api.careers.getCareerDetails}/${careerPostId}`, {
    headers: { "Content-Type": "application/json" },
  });
};

/**
 * Application
 * @memberof module:api/request
 * @param {Object} data
 * @returns {Object}
 */
export const CAREER_APPLICATION = (data) => {
  return axios.post(`${api.careers.apply}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};
