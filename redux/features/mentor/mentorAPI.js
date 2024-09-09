import axios from "@/utils/axios";
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


export const getAllMentors = async (page) => {
  try {
    const response = await axios.get(
      `/mentor/get_all_mentor_overview/${page}`,
      {
        headers: configParams,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const mentorProfileView = async (id) => {
  try {
    const response = await axios.get( `/mentor/profile_view/${id}`,
      {
        headers: configParams,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const getMentorProfileInfo = async () => {
  try {
    const response = await axios.get(
      `/mentor/v3/get-my-profile`,
      {
        headers: configParamsWithToken(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const editMentorProfileInfo = async (data) => {
  try {
    const response = await axios.put(
      `/mentor/v3/profile-update-application`, {data},
      {
        headers: configParamsWithToken(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


