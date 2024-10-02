import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCareer, getSingleCareer, jobApplication } from "./careerAPI.js";

const initialState = {
  loading: false,
  isError: false,
  error: "",
  careers: [],
  career: {},
};

// careate thunk

export const fetchCareers = createAsyncThunk(
  "careers/fetchCareers",
  async (page) => {
    const careers = getAllCareer(page);
    return careers;
  }
);

export const fetchSingleCareer = createAsyncThunk(
  "career/fetchSingleCareer",
  async (id) => {
    const career = getSingleCareer(id);
    return career;
  }
);

export const carrierJobApplication = createAsyncThunk(
  "career/carrierJobApplication",
  async (data) => {
    const response = jobApplication(data);
    console.log(response.then((data) => console.log(data)));
    return response;
  }
);

//create slice

const careersSlice = createSlice({
  name: "careers",
  initialState,
  extraReducers: (builder) => {
    builder
      //get all career
      .addCase(fetchCareers.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchCareers.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.careers = action.payload?.data?.careerPosts;
      })
      .addCase(fetchCareers.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.careers = [];
        state.error = action.error?.message;
      })
      // get Single career
      .addCase(fetchSingleCareer.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchSingleCareer.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.career = action.payload?.data;
      })
      .addCase(fetchSingleCareer.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.career = {};
        state.error = action.error?.message;
      })
      // job application
      .addCase(carrierJobApplication.pending, (state) => {
        state.loading = false;
        state.isError = false;
      })
      .addCase(carrierJobApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
      })
      .addCase(carrierJobApplication.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default careersSlice.reducer;
