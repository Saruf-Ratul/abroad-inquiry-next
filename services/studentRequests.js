import axios from "axios";
import { api } from "./apis";
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
  const token = Cookies.get("token");
  return {
    "Content-Type": "application/json",
    authentication_token: token ? `Bearer ${token}` : null,
  };
};

/**
 * header configure for api request  for form data
 * @memberof module:api/request
 * @type {Object}
 */
const formDataConfig = {
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};

/**
 * student sign up request
 * @memberof module:api/request
 * @param {Object} data
 * @returns {Object}
 */
// Signup Requests
export const STUDENT_SIGNUP_CALL = (data) => {
  return axios.post(api.student.signup, data, { headers: configParams });
};

// Signup Requests Social Media
export const STUDENT_SIGNUP_CALL_SOCIAL = (data) => {
  return axios.post(api.student.signupSocial, data, { headers: configParams });
};

/**
 * update student data request
 * @memberof module:api/request
 * @param {Object} data
 * @returns {Object}
 */
//Update student data
export const UPDATE_ALL_STUDENT_DATA_CALL = (data) => {
  return axios.put(`${api.student.updateStudentInfo}`, data, {
    headers: configParamsWithToken(),
  });
};

/**
 * update student password request
 * @memberof module:api/request
 * @param {Object} data
 * @returns {Object}
 */
//Update Password
export const UPDATE_STUDENT_PASSWORD = (studentId, data) => {
  return axios.post(`${api.student.updatePassword}/${studentId}`, data, {
    headers: configParams,
  });
};

/**
 * api request to retrive data of a student
 * @memberof module:api/request
 * @param {Object} data
 * @returns {Object}
 */
// Get Info Requests
export const GET_STUDENT_INFO_CALL = () => {
  return axios.get(`${api.student.getInfo}`, {
    headers: configParamsWithToken(),
  });
};

/**
 * update student information request
 * @memberof module:api/request
 * @param {Object} data
 * @returns {Object}
 */
export const UPDATE_STUDENT_INFO = (data) => {
  return axios.put(`${api.student.updateStudentInfo}`, data, {
    headers: configParamsWithToken(),
  });
};

/**
 * update student profile request
 * @memberof module:api/request
 * @param {Object} data
 * @param {Number} studentId
 * @returns {Object}
 */
export const UPDATE_STUDENT_PROFILE_PIC = async (studentId, data) => {
  let returnData;
  try {
    returnData = await axios.post(
      `${api.student.updateProfilePic}/${studentId}`,
      data,
      { headers: formDataConfig }
    );
  } catch (error) {
    returnData = await error;
  }

  return returnData;
};

export const STUDENT_PROFILE_VIEW_CALL = (studentId) => {
  return axios.get(`${api.student.profileView}/${studentId}`, {
    headers: configParamsWithToken(),
  });
};


// Request for Appointment
/**
 * retrive notification request
 * @memberof module:api/request
 * @param {Number} studentId
 * @param {Number} pageNumber
 * @returns {Object}
 */
export const GET_NOTIFICATIONS = (studentId, pageNumber) => {
  return axios.get(
    `${api.student.showNotifications}/${studentId}/${pageNumber}`,
    {
      headers: configParams,
    }
  );
};

/**
 * get unread notification request
 * @memberof module:api/request
 * @returns {Object}
 */
export const GET_UNREAD_NOTIFICATIONS = () => {
  return axios.get(`${api.student.showTotalUnReadNotification}`, {
    headers: configParamsWithToken(),
  });
};

//=========================== REGISTERED STUDENT =====================================//
export const GET_STUDENT_UPDATE = (studentId) => {
  return axios.get(`${api.student.studentUpdate}?studentId=${studentId}`, {
    headers: { "Content-Type": "application/json" },
  });
};
//=====================================================================//

//=========================== APPLY ABROAD STUDENT =====================================//
export const STUDENT_APPLY_ABROAD = (data) => {
  return axios.post(`${api.student.studentApplyAbroad}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};
//=====================================================================//


//=========================== APPLY ABROAD STUDENT =====================================//

export const OFFICE_VISITED_STUDENT = (data) => {
  return axios.post(`${api.student.officeVisitedStudent}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const RESET_PASSWORD_CALL = (data) => {
  return axios.post(api.auth.resetPassword, data);
};

//=========================== PUSH NOTIFICATIONS =====================================//

export const GET_PUSH_NOTIFICATIONS = (studentId) => {
  return axios.get(`${api.notification.getPushNotification}/${studentId}`, {
    headers: { "Content-Type": "application/json" },
  });
};

export const UPDATE_PUSH_NOTIFICATIONS = (studentId,push_notification_id) => {
  return axios.put(`${api.notification.getPushNotification}/${studentId}/${push_notification_id}`, {
    headers: { "Content-Type": "application/json" },
  });
};


