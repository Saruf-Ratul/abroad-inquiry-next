import axios from "axios";
import { api, BASE_URL } from "./apis";
import Cookies from "js-cookie";

/**
 * header configure for api request 
 * @memberof module:api/request
 * @type {Object}
 */
const configParams = {
  "Content-Type": "application/json",
};

/**
 * header configure for api request with token
 * @memberof module:api/request
 * @type {Object}
 */
const configParamsWithToken = () => {
  return {
    "Content-Type": "application/json",
    authentication_token: Cookies.get("token")
      ? `Bearer ${Cookies.get("token")}` 
      : null,
  };
};

/**
 * header configure for api request for form data
 * @memberof module:api/request
 * @type {Object}
 */
const formDataConfig = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};

// Mentor signup requests

/**
 * Mentor sign up api 1
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const MENTOR_SIGNUP_1 = (data) => {
  return axios.post(`${api.mentor.signup1}`, data, {
    headers: configParams,
  });
};

/**
 * Mentor sign up api 2
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const MENTOR_SIGNUP_2 = (data) => {
  return axios.post(`${api.mentor.signup2}`, data, {
    headers: configParams,
  });
};

/**
 * Mentor sign up api 3
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const MENTOR_SIGNUP_3 = (data) => {
  return axios.post(`${api.mentor.signup3}`, data, {
    headers: configParams,
  });
};

/**
 * Mentor sign up api 4
 * @memberof module:api/request
 * @param {Object} data 
 * @param {Number} mentorId
 * @returns {Object}
 */
export const MENTOR_SIGNUP_4 = async (mentorId, data) => {
  let returnData;
  try {
    returnData = await axios.post(`${api.mentor.signup4}/${mentorId}`, data, {
      headers: formDataConfig,
    });
  } catch (error) {
    returnData = await error;
  }

  return returnData;
};

// Update Profile Pic
/**
 * Update mentor profile pic update api request
 * @memberof module:api/request
 * @param {Number} mentorId
 * @param {Object} data 
 * @returns {Object}
 */
export const UPDATE_MENTOR_PROFILE_PIC = async (mentorId, data) => {
  let returnData;
  try {
    returnData = await axios.post(
      `${api.mentor.uploadProfilePic}/${mentorId}`,
      data,
      { headers: formDataConfig }
    );
  } catch (error) {
    returnData = await error;
  }

  return returnData;
};

/**
 * Mentor data update api request
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
//Update Mentor Data
export const UPDATE_MENTOR_DATA = (data) => {
  return axios.post(`${api.mentor.updateMentor}`, data, {
    headers: configParamsWithToken(),
  });
};

//Update Mentor Active status
export const UPDATE_MENTOR_ACTVIE_STATUS = (data) => {
  return axios.put(`${api.mentor.updateDisableStatus}`, data, {
    headers: configParamsWithToken(),
  });
};


export const UPDATE_CONVERSATION = (data) => {
  return axios.put(`${api.chat.updateConversation}`, data, {
    headers: configParamsWithToken(),
  });
};

/**
 * Mentor password update request api
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
//Update Mentor Password
export const UPDATE_MENTOR_PASSWORD = (data) => {
  return axios.post(`${api.mentor.updatePassword}`, data, {
    headers: configParams,
  });
};

//Get Info Requests
/**
 * Mentor information retriving api request
 * @memberof module:api/request
 * @returns {Object}
 */
export const GET_MENTOR_INFO_CALL = () => {
  return axios.get(`${api.mentor.getInfo}`, {
    headers: configParamsWithToken(),
  });
};

/**
 * Mentor overview api request call api
 * @memberof module:api/request
 * @param {Number} page 
 * @returns {Object}
 */
export const GET_MENTORS_OVERVIEW = (page) => {
  return axios.get(`${api.mentor.getAllMentorsOverview}/${page}`, {
    headers: configParams,
  });
};

/**
 * Mentor overview api request
 * @memberof module:api/request
 * @param {Number} id 
 * @returns {Object}
 */
export const GET_MENTOR_OVERVIEW = (id) => {
  return axios.get(`${api.mentor.getMentorsOverview}/${id}`, {
    headers: configParams,
  });
};

/**
 * Mentor profile view api request
 * @memberof module:api/request
 * @param {Number} mentorId 
 * @returns {Object}
 */
export const MENTORS_PROFILE_VIEW = (mentorId) => {
  return axios.get(`${api.mentor.profileView}/${mentorId}`, {
    headers: configParams,
  });
};

/**
 * Mentor unread notification api reqeust
 * @memberof module:api/request
 * @returns {Object}
 */
export const GET_UNREAD_MENTOR_NOTIFICATIONS = () => {
  return axios.get(`${api.mentor.showTotalUnReadNotification}`, {
    headers: configParamsWithToken(),
  });
};

//Post new schedules

// Get all approved appointments

//Accept or deny Appointment

//Appointment done
/**
 * Appointment done api request
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const APPOINTMENT_DONE = (data) => {
  return axios.post(`${api.mentor.appointmentDone}`, data, {
    headers: configParams,
  });
};

/**
 * Retriving notificaiton api request
 * @memberof module:api/request
 * @param {Number} mentorId
 * @param {Number} pageNumber
 * @returns {Object}
 */
export const GET_NOTIFICATIONS = (mentorId, pageNumber) => {
  return axios.get(
    `${api.mentor.showNotifications}/${mentorId}/${pageNumber}`,
    {
      headers: configParams,
    }
  );
};

/**
 * Delete mentor scheduled time for appointment
 * @memberof module:api/request
 * @param {Number} scheduled
 * @param {Object} data 
 * @returns {Object}
 */
export const DELETE_A_SCHEDULE = (scheduleId, data) => {
  return axios.post(`${api.appointment.deleteSchedule}/${scheduleId}`, data, {
    headers: configParamsWithToken(),
  });
};
