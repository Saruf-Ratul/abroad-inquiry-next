import axios from "@/utils/axios";

const configParams = {
  "Content-Type": "application/json",
};

export const getAllCountries = async (page) => {
  try {
    const response = await axios.get(`/country/get_all_countries/${page}`, {
      headers: configParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const getCountryDetails = async (id) => {
  try {
    const response = await axios.get(`/country/get_one_country/${id}`, {
      headers: configParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const getMentorAccordingToCountry = async (country_id) => {
  try {
    const response = await axios.get(`/country/get_mentor_from_country/${country_id}`, {
      headers: configParams,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


