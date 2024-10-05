/**@module api/request */
import axios from "axios";
import { api, BASE_URL } from "./apis";
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
 * schedule appointment
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const POST_NEW_SCHEDULE_APPOINTMENT = (data) => {
  return axios.post(`${api.appointment.scheduleAppointment}`, data, {
    headers: configParamsWithToken(),
  });
};

/**
 * Complete an appointment
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const COMPLETE_AN_APPOINTMENT = (data) => {
  return axios.post(`${api.appointment.completeAnAppointment}`, data, {
    headers: configParamsWithToken(),
  });
};

/**
 * Accept or deny appointment
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const ACCEPT_OR_DENY_APPOINTMENT = (data) => {
  return axios.post(`${api.appointment.acceptOrDenyAppointment}`, data, {
    headers: configParamsWithToken(),
  });
};

/**
 * Get mentor available time slots
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const GET_MENTOR_AVAILABLE_SLOTS = (data) => {
  return axios.post(`${api.appointment.getMentorAppointmentSlots}`, data, {
    headers: configParamsWithToken(),
  });
};

/**
 * Apply for appointment
 * @memberof module:api/request
 * @param {Object} data 
 * @returns {Object}
 */
export const REQUEST_APPOINTMENT = (data) => {
  return axios.post(`${api.appointment.requestAppointment}`, data, {
    headers: configParamsWithToken(),
  });
};

/**
 * Showing appointment application
 * @memberof module:api/request
 * @param {Number} page 
 * @returns {Object}
 */
export const SHOW_APPOINTMENT_APPLICATIONS = (page) => {
  return axios.get(`${api.appointment.showAppointmentApplication}/${page}`, {
    headers: configParamsWithToken(),
  });
};

/**
 * Showing approved appointments
 * @memberof module:api/request
 * @param {Number} page 
 * @returns {Object}
 */
export const GET_ALL_APPROVED_APPOINTMENTS = (page) => {
  return axios.get(`${api.appointment.getAllApprovedAppointments}/${page}`, {
    headers: configParamsWithToken(),
  });
};

/**
 * Showing appointment information
 * @memberof module:api/request
 * @param {Number} appointmentId 
 * @returns {Object}
 */
export const GET_APPOINTMENT_INFO = (appointmentId) => {
  return axios.get(`${api.appointment.getAppointmentInfo}/${appointmentId}`, {
    headers: configParamsWithToken(),
  });
};

/**
 * Showing appointment records
 * @memberof module:api/request
 * @param {Number} page 
 * @returns {Object}
 */
export const GET_APPOINTMENT_RECORDS = (page) => {
  return axios.get(`${api.appointment.appointmentRecords}/${page}`, {
    headers: configParamsWithToken(),
  });
};

/**
 * Showing appointment schedules for mentor
 * @memberof module:api/request
 * @param {Number} page 
 * @returns {Object}
 */
export const GET_ALL_SCHEDULES = (page) => {
  return axios.get(`${api.appointment.getAllSchedule}/${page}`, {
    headers: configParamsWithToken(),
  });
};

/**
 * Delete an appointment
 * @memberof module:api/request
 * @param {Number} appointmentId 
 * @param {string} reason 
 * @param {string} userName 
 * @returns {Object}
 */
export const DELETE_AN_APPOINTMENT = (appointmentId, reason, userName) => {
  return axios.put(
    `${api.appointment.cancelAppointmentRequest}/${appointmentId}`,
    { reason: reason, userName: userName },
    {
      headers: configParamsWithToken(),
    }
  );
};
