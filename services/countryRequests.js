import axios from "axios";
import { api } from "./apis";

const configParams = {
  "Content-Type": "application/json",
};

/**
 * Api request to retrive all country name
 * @memberof module:api/request
 * @param {Number} mentorId 
 * @returns {Object}
 */
//Get all country name
export const GET_ALL_COUNTRY_NAME = (mentorId) => {
  return axios.get(`${api.countries.getCountryName}`, {
    headers: configParams,
  });
};

/**
 * Api request to retrive all country 
 * @memberof module:api/request
 * @param {Number} pageNo 
 * @returns {Object}
 */
//Student get all appointments
export const GET_ALL_COUNTRY = (pageNo) => {
  return axios.get(`${api.countries.getCountryDetails}/${pageNo}`, {
    headers: configParams,
  });
};

/**
 * Api request to retrive a country detailed information
 * @memberof module:api/request
 * @param {Number} countryId 
 * @returns {Object}
 */
//Get country info by giving an id
export const GET_ONE_COUNTRY_DETAILS = (countryId) => {
  return axios.get(`${api.countries.getContryInfo}/${countryId}`, {
    headers: configParams,
  });
};

/**
 * Api request to retrive mentor according to contry.
 * @memberof module:api/request
 * @param {Number} country_id 
 * @returns {Object}
 */
// get all  mentor according to countirs
export const GET_MENTOR_ACCORDING_TO_COUNTRY = (country_id) => {
  return axios.get(
    `${api.countries.getMentorAccordingToCountry}/${country_id}`,
    {
      headers: configParams,
    }
  );
};
