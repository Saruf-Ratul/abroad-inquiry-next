import axios from "@/utils/axios";

const configParams = {
  "Content-Type": "application/json",
};

export const getAllCareer = async (page) => {
  try {
    const response = await axios.get(`/career/get-careers?page=${page}`, {
      headers: configParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getSingleCareer = async (id) => {
  try {
    const response = await axios.get(`/career/get-career-details/${id}`, {
      headers: configParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const jobApplication = async (data) => {
  try {
    const response = await axios.post(`/application/create-application`, data, {
      headers: { ...configParams, "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    // console.error("Error fetching completeAnAppointment:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};
