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
  
  

  
export const getStudentApplicationUpdate = async(id)=>{
    try {
        const response = await axiosInstance.get(`/student-application/get-single-student-application?studentId=${id}`,{
            headers: configParams,
        })

        return response.data;
        
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}

  
export const getStudentProfileInfo = async () => {
    try {
      const response = await axiosInstance.get(`/student/v3/get-my-profile`, {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching student profile info:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };

  export const getStudentProfileView = async (id) => {
    try {
      const response = await axiosInstance.get(`/student/profile_view/${id}`, {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching student profile info:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };


  export const editStudentProfileInfo = async (data) => {
    try {
      const response = await axiosInstance.put(`/student/v3/update-profile`, {data} , {
        headers: configParamsWithToken(),
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error fetching student profile info:", error);
      throw new Error(error.response?.data?.message || error.message);
    }
  };

