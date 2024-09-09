import axiosInstance from "@/utils/axios";

const configParams = {
  "Content-Type": "application/json",
};


export const getAllStudentNotifications = async (id,page) => {
  try {
    const response = await axiosInstance.get(
      `/student/get_notification/${id}/${page}`,
      {
        headers: configParams,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const getAllMentorNotifications = async (id,page) => {
  try {
    const response = await axiosInstance.get(
      `/mentor/get_notification/${id}/${page}`,
      {
        headers: configParams,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};







