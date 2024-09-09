import axiosInstance from "@/utils/axios";

const configParams = {
  "Content-Type": "application/json",
};


export const createOfficeVisitStudent = async (data) => {
  try {
    const response = await axiosInstance.get(
      `/office-visited-student/create`, data,
      {
        headers: configParams,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};










