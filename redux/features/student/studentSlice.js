import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editStudentProfileInfo, getStudentApplicationUpdate, getStudentProfileInfo, getStudentProfileView } from "./studentAPI.js";

const initialState = {
  loading: false,
  isError: false,
  error: "",
  applicationUpdate: {},
  studentProfileInfo: {},
  studentProfileView:{}
};

// create thunk
export const fetchStudentApplicationUpdate = createAsyncThunk(
  "studentApplicationUpdate/fetchStudentApplicationUpdate",
  async (id) => {
    const applicationUpdate = await getStudentApplicationUpdate(id);
    return applicationUpdate;
  }
);

export const fetchStudentProfileInfo = createAsyncThunk(
  "studentProfileInfo/fetchStudentProfileInfo",
  async () => {
    const studentProfileInfo = await getStudentProfileInfo();
    return studentProfileInfo;
  }
);

export const fetchStudentProfileView = createAsyncThunk(
  "studentProfileInfo/fetchStudentProfileView",
  async (id) => {
    const studentProfileView = await getStudentProfileView(id);
    return studentProfileView;
  }
);

export const updateStudentProfile = createAsyncThunk(
    "studentProfileInfo/updateStudentProfile",
    async (data) => {
      const updatedProfile = await editStudentProfileInfo(data);
      return updatedProfile;
    }
  );
  

// create slice
const studentSlice = createSlice({
  name: "student",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentApplicationUpdate.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchStudentApplicationUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.applicationUpdate = action.payload.data;
      })
      .addCase(fetchStudentApplicationUpdate.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.applicationUpdate = {};
        state.error = action?.error.message || "Failed to fetch application update.";
      })
      .addCase(fetchStudentProfileInfo.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchStudentProfileInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.studentProfileInfo = {
          ...action.payload.data,
          phone: JSON.parse(action.payload.data.phone),
        };
      })
      .addCase(fetchStudentProfileInfo.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.studentProfileInfo = {};
        state.error = action?.error.message || "Failed to fetch profile info.";
      })
      .addCase(updateStudentProfile.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(updateStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.studentProfileInfo = {
          ...action.payload.data,
          phone: JSON.parse(action.payload.data.phone),
        };
      })
      .addCase(updateStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action?.error.message || "Failed to update profile info.";
      })
      // profile view
      .addCase(fetchStudentProfileView.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchStudentProfileView.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.studentProfileView = action.payload;
      })
      .addCase(fetchStudentProfileView.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.studentProfileView = {};
        state.error = action?.error.message || "Failed to fetch profile info.";
      })
  },
});

export default studentSlice.reducer;
