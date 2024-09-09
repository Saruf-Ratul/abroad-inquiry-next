import axiosInstance from "@/utils/axios";
import Cookies from "js-cookie";

const configParamsWithToken = () => {
  const token = Cookies.get("token");
    return {
      "Content-Type": "application/json",
      authentication_token: token ? `Bearer ${token}` : null,
    };
  };


  export const createNewConversation = async (data) => {
    try {
      const response = await axiosInstance.post(
        `/conversation/create_conversation`,{data},
        {
          headers: configParamsWithToken(),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };



  export const getOldConversation = async (page) => {
    try {
      const response = await axiosInstance.get(
        `/conversation/get_conversation/${page}`,
        {
          headers: configParamsWithToken(),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  export const getMessage = async (id,page) => {
    try {
      const response = await axiosInstance.get(
        `/conversation/get_previous_message/${id}/${page}`,
        {
          headers: configParamsWithToken(),
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  export const searchMessage = async (keyword, pageNumber) => {
    try {
      const response = await axiosInstance.get(
        `/conversation/search/${pageNumber}?clue=${keyword}`,
        {
          headers: configParamsWithToken(),
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  };
  






