import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";


const configParams = {
    "Content-Type": "application/json",
  };

const configParamsWithToken = () => {
  const token = Cookies.get("token");
    return {
      "Content-Type": "application/json",
      authentication_token: token ? `Bearer ${token}` : null,
    };
  };

  export const showAppointmentApplication = async (page) => {
    try {
      const response = await axiosInstance.get(`/appointment/get_appointment_application/${page}`, {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching student profile info:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  export const getAllApprovedAppointments = async (page) => {
    try {
      const response = await axiosInstance.get(`/appointment/get_scheduled_appointment/${page}`, {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching getAllApprovedAppointments:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  export const getAppointmentRecords = async (page) => {
    try {
      const response = await axiosInstance.get(`/appointment/get_appointment_records/${page}`, {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching getAppointmentRecords:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  export const acceptOrDenyAppointment = async (data) => {
    try {
      const response = await axiosInstance.post(`/appointment/accept_or_deny_appointment`,data , {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching acceptOrDenyAppointment:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  export const completeAnAppointment = async (data) => {
    try {
      const response = await axiosInstance.post(`/appointment/complete_appointment`,data, {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching completeAnAppointment:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  export const cancelAppointmentRequest = async (appointmentId, reason, userName) => {
    try {
      const response = await axiosInstance.put(`/appointment/delete_appointment/${appointmentId}`, { reason: reason, userName: userName }, {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching cancelAppointmentRequest:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };
 

  export const newScheduleAppointment = async (data) => {
    try {
      const response = await axiosInstance.post(`/appointment/schedule_appointment`, data , {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching newScheduleAppointment:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  export const getAllSchedule = async (page) => {
    try {
      const response = await axiosInstance.get(`/appointment/get_all_schedule/${page}`, {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching getAllSchedule:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };
 

  export const deleteSchedule = async (scheduleId, data) => {
    try {
      const response = await axiosInstance.post(`/appointment/delete_schedule/${scheduleId}`, data , {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching deleteSchedule:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  export const getMentorAvaiableSlot = async (data) => {
    try {
      const response = await axiosInstance.post(`/appointment/get_appointment_time_slot`, data , {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching completeAnAppointment:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  export const studentRequestAppointment = async (data) => {
    try {
      const response = await axiosInstance.post(`/appointment/apply_for_appointment`, data , {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching completeAnAppointment:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };



  