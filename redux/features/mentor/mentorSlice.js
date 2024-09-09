import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editMentorProfileInfo, getAllMentors, getMentorProfileInfo, mentorProfileView } from "./mentorAPI.js";

const initialState = {
  loading: false,
  isError: false,
  error: "",
  mentors: [],
  totalMentors: "",
  profileDeatails:{},
  mentorProfileInfo:{}
};

// Create thunk
export const fetchMentors = createAsyncThunk(
  "mentors/fetchMentors",
  async (page) => {
    const mentors = await getAllMentors(page);
    return mentors;
  }
);

export const fetchMentorProfileDetails = createAsyncThunk(
  "mentorProfile/fetchMentorProfileDetails",
  async (id) => {
    const profileDeatails = await mentorProfileView(id);
    return profileDeatails;
  }
);

export const fetchMentorProfileInfo = createAsyncThunk(
  "mentorProfileInfo/fetchMentorProfileInfo",
  async () => {
    const mentorProfileInfo = await getMentorProfileInfo();
    return mentorProfileInfo;
  }
);


export const updateMentorProfile = createAsyncThunk(
  "mentorProfileInfo/updateMentorProfile",
  async (data) => {
    const updatedProfile = await editMentorProfileInfo(data);
    return updatedProfile;
  }
);


//create slice

const mentorsSlice = createSlice({
  name: "mentors",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMentors.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchMentors.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.mentors = action.payload.mentor;
        state.totalMentors = action.payload.totalMentor;
      })
      .addCase(fetchMentors.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.mentors = []
        state.error = action.error?.message;
      })
      .addCase(fetchMentorProfileDetails.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchMentorProfileDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.profileDeatails = action.payload;
        
      })
      .addCase(fetchMentorProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.profileDeatails = {}
        state.error = action.error?.message;
      })
      .addCase(fetchMentorProfileInfo.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchMentorProfileInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.mentorProfileInfo = {
          ...action.payload.data ,
          phone: JSON.parse(action.payload.data.phone),
        };
        
      })
      .addCase(fetchMentorProfileInfo.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.mentorProfileInfo = {}
        state.error = action.error?.message;
      })
      .addCase(updateMentorProfile.pending, (state, action) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(updateMentorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.mentorProfileInfo = {
          ...action.payload.data ,
          phone: JSON.parse(action.payload.data.phone),
        };
        
      })
      .addCase(updateMentorProfile.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.mentorProfileInfo = {}
        state.error = action.error?.message;
      })
  },
});

export default mentorsSlice.reducer;
