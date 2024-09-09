import { getAllCountries, getCountryDetails, getMentorAccordingToCountry } from "./countryAPI.js";

export const countryCode = {
  Belgium: "be",
  Canada: "ca",
  Germany: "de",
  Denmark: "dk",
  Norway: "no",
  Sweden: "se",
  Finland: "fi",
  Netherlands: "nl",
  UK: "gb",
  USA: "us",
  Ireland: "ie",
  Italy: "it",
  Hungary: "hu",
  "South Korea": "kr",
  Australia: "au",
};
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");


const initialState = {
  loading: false,
  isError: false,
  error: "",
  countries: [],
  countryDetails:{},
  countriesMentors:[]
};

//create thunk
export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (page) => {
    const countries = getAllCountries(page);
    return countries;
  }
);


export const fetchCountryDetails = createAsyncThunk(
  "countryDetails/fetchCountryDetails",
  async (id) => {
    const countryDetails = getCountryDetails(id);
    return countryDetails;
  }
);

export const fetchCountriesAccordingToMentors = createAsyncThunk(
  "countries/fetchCountriesAccordingToMentors",
  async (country_id) => {
    const countriesMentors = getMentorAccordingToCountry(country_id);
    return countriesMentors;
  }
);


// create slice
const countriesSlice = createSlice({
  name: "countries",
  initialState,
  extraReducers: (builder) => {
    builder
      //all countries 
      .addCase(fetchCountries.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload.country.map((c) => ({
          ...c,
          countryCode: countryCode[c.countryName],
        }));
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.countries = [];
        state.error = action.error?.payload;
      })
      //country details
      .addCase(fetchCountryDetails.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchCountryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.countryDetails = action.payload;
      })
      .addCase(fetchCountryDetails.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.countryDetails = {};
        state.error = action.error?.payload;
      })
      // fetch mentor according country
      .addCase(fetchCountriesAccordingToMentors.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchCountriesAccordingToMentors.fulfilled, (state, action) => {
        state.loading = false;
        state.countriesMentors = action.payload;
      })
      .addCase(fetchCountriesAccordingToMentors.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.countriesMentors = [];
        state.error = action.error?.payload;
      });
  },
});

export default countriesSlice.reducer;
