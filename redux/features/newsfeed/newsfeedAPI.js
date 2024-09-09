import axios from "@/utils/axios"

const configParams = {
    "Content-Type": "application/json",
  };

  
export const getAllblogPosts = async(page)=>{
    try {
        const response = await axios.get(`/blog/get-blogs?page=${page}`,{
            headers: configParams,
        })

        return response.data;
        
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}


  
export const getblogPostDetails = async(id)=>{
    try {
        const response = await axios.get(`/blog/get-blog-details?bid=${id}`,{
            headers: configParams,
        })

        return response.data;
        
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
}