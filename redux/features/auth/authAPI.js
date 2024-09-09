import axiosInstance from "@/utils/axios";

const configParams = {
  "Content-Type": "application/json",
};

export const userLoginAPI = async (data) => {
  try {
    const response = await axiosInstance.post('/login', data, {
      headers: configParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const getUserInfo = async (token) => {
    try {
        const headers = {
            "Content-Type": "application/json",
            authentication_token: `Bearer ${token}`,
          };
          return axiosInstance.get("/login_from_session", { headers });
        // return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };


export const forgetPasswordAPI = async (data) => {
  try {
    const response = await axiosInstance.post('/checking_email_existence', data, {
      headers: configParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const resetPasswordAPI = async (data) => {
  try {
    const response = await axiosInstance.post('/reset_password', data, {
      headers: configParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
