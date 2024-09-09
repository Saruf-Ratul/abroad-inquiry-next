export const BASE_URL = "https://server.abroadinquiry.com:8443";
import axios from "axios" ;

const axiosInstance = axios.create({
    baseURL: 'https://server.abroadinquiry.com:8443',
  });

 export default axiosInstance; 