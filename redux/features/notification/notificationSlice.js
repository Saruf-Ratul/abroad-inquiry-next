import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMentorNotifications, getAllStudentNotifications } from "./notificationAPI.js";

const initialState = {
  loading: false,
  isError: false,
  error: "",
  notifications: [],
  totalNotification: 0
};

// create thunk
export const fetchAllStudentNotifications = createAsyncThunk(
  "notifications/fetchAllStudentNotifications",
  async ({id,page}) => {
    const notifications = await getAllStudentNotifications(id,page);
    return notifications;
  }
);

export const fetchAllMentorNotifications = createAsyncThunk(
  "notifications/fetchAllMentorNotifications",
  async ({id,page}) => {
    const notifications = await getAllMentorNotifications(id,page);
    return notifications;
  }
);


// create slice

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  extraReducers: (builder) => {
    builder
      // student all notifications
      .addCase(fetchAllStudentNotifications.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchAllStudentNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload?.notificationData;
        state.totalNotification = action.payload?.totalNotification;
      })
      .addCase(fetchAllStudentNotifications.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.notifications = [];
        state.error = action.error?.message;
      })
      // mentor all notifications
      .addCase(fetchAllMentorNotifications.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchAllMentorNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload?.notificationData;
        state.totalNotification = action.payload?.totalNotification;
      })
      .addCase(fetchAllMentorNotifications.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.notifications = [];
        state.error = action.error?.message;
      })
  },
});

export default notificationsSlice.reducer;
