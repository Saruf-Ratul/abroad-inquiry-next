import axiosInstance from "@/utils/axios";
import axios from "axios";


const configParams = {
  "Content-Type": "application/json",
};


export const createOfficeVisitStudent = async (data) => {
  try {
    const response = await axios.post(
      `https://localhost:8443/office-visited-student/create`, data,
      {
        headers: configParams,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};










