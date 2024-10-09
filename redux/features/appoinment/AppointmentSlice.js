import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  acceptOrDenyAppointment,
  cancelAppointmentRequest,
  completeAnAppointment,
  deleteSchedule,
  getAllApprovedAppointments,
  getAllSchedule,
  getMentorAvaiableSlot,
  newScheduleAppointment,
  showAppointmentApplication,
  studentRequestAppointment,
} from "./appointmentAPI.js";

const initialState = {
  loading: false,
  isError: false,
  error: "",
  deleteMsg:"",
  snackbarTest: false,
  mentorAvaialeSlots: [],
  schedules: [],
  totalSchedules: 0,
  appointmentApplication: [],
  totalAppointmentApplication: 0,
  scheduledAppointment: [],
  totalScheduledAppointment: 0,
  appointmentRecords: [],
  totalAppointmentRecords: 0,
};

// Create thunks
export const fetchAppointmentApplication = createAsyncThunk(
  "appointmentApplication/fetchAppointmentApplication",
  async (page) => {
    const appointmentApplication = await showAppointmentApplication(page);
    return appointmentApplication;
  }
);

export const fetchAllApprovedAppointments = createAsyncThunk(
  "scheduledAppointment/fetchAllApprovedAppointments",
  async (page) => {
    const scheduledAppointment = await getAllApprovedAppointments(page);
    return scheduledAppointment;
  }
);

export const fetchAppointmentRecords = createAsyncThunk(
  "appointmentRecords/fetchAppointmentRecords",
  async (page) => {
    const appointmentRecords = await getAllApprovedAppointments(page);
    return appointmentRecords;
  }
);

export const AddacceptOrDenyAppointment = createAsyncThunk(
  "acceptOrDenyAppointment/AddacceptOrDenyAppointment",
  async (data) => {
    const response = await acceptOrDenyAppointment(data);
    // Emit socket event
    // socket?.emit("sendNotification", {
    //   receiver: "student".concat(data.student_id.toString()),
    //   appointmentId: response.appointmentId,
    //   message: response.notification,
    //   notificationId: response.notificationId,
    //   createdAt: response.createdAt,
    //   isRead: false,
    //   rootScreen: "Appointments",
    //   screen: "AcceptedAppointments",
    //   fcmToken: response.fcmToken,
    // });
    return response;
  }
);

export const AddcompleteAnAppointment = createAsyncThunk(
  "completeAnAppointment/AddcompleteAnAppointment",
  async (data) => {
    const response = await completeAnAppointment(data);
    return response;
  }
);

export const deleteAppointmentRequest = createAsyncThunk(
  "cancelAppointmentRequest/deleteAppointmentRequest",
  async ({appointmentId, reason, userName}) => {
    const response = await cancelAppointmentRequest(
      appointmentId,
      reason,
      userName
    );
    // // Emit socket event
    // socket?.emit("sendNotification", {
    //   receiver: "mentor".concat(response.data.mentorId.toString()),
    //   message: response.data.notificationMessage,
    //   notificationId: response.data.notificationId,
    //   createdAt: response.data.createdAt,
    //   isRead: false,
    //   rootScreen: "Notification",
    //   screen: "NotificationScreen",
    //   fcmToken: response.data.fcmToken,
    // });
    return response;
  }
);

export const PostNewScheduleAnAppointment = createAsyncThunk(
  "newScheduleAppointment/PostNewSchduleAnAppointment",
  async (data) => {
    const response = await newScheduleAppointment(data);
    return response;
  }
);

export const fetchAllSchedule = createAsyncThunk(
  "allSchedule/fetchAllSchedule",
  async (page) => {
    const schedules = await getAllSchedule(page);
    return schedules;
  }
);

export const removeSchedule = createAsyncThunk(
  "deleteSchedule/removeSchedule",
  async (scheduleId, data) => {
    const response = await deleteSchedule(scheduleId, data);
    return response;
  }
);

export const fetchMentoravailableSlots = createAsyncThunk(
  "mentorAvailableSlots/fetchMentoravailableSlots",
  async (data) => {
    const mentorAvaialeSlots = await getMentorAvaiableSlot(data);
    return mentorAvaialeSlots;
  }
);

export const StudentAppointmentApplication = createAsyncThunk(
  "studentRequestAppointment/StudentAppointmentApplication",
  async (data) => {
    const response = await studentRequestAppointment(data);
    return response;
  }
);

// Create slice
const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  extraReducers: (builder) => {
    builder
      // Fetch appointment application
      .addCase(fetchAppointmentApplication.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchAppointmentApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.appointmentApplication = action.payload.appointmentApplication;
        state.totalAppointmentApplication =
          action.payload.totalAppointmentApplication;
      })
      .addCase(fetchAppointmentApplication.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.appointmentApplication = [];
        state.error = action?.error.message;
      })
      // Fetch all approved appointments
      .addCase(fetchAllApprovedAppointments.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchAllApprovedAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.scheduledAppointment = action.payload.scheduledAppointment;
        state.totalScheduledAppointment =
          action.payload.totalScheduledAppointment;
      })
      .addCase(fetchAllApprovedAppointments.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.scheduledAppointment = [];
        state.error = action?.error.message;
      })
      // Fetch appointment records
      .addCase(fetchAppointmentRecords.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchAppointmentRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.appointmentRecords = action.payload.appointmentRecords;
        state.totalAppointmentRecords = action.payload.totalAppointmentRecords;
      })
      .addCase(fetchAppointmentRecords.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.appointmentRecords = [];
        state.error = action?.error.message;
      })
      // Add accept or deny appointment
      .addCase(AddacceptOrDenyAppointment.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(AddacceptOrDenyAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        if (action.payload && action.payload.data && action.payload.data.status) {
          if (action.payload.status === "Accepted") {
            state.totalScheduledAppointment += 1;
            state.scheduledAppointment.push(action.payload);
            state.snackbarTest = true;
          } else {
            state.snackbarTest = false;
          }
        } else {
          state.isError = true;
          state.error = "Unexpected response structure";
        }
      })
      
      .addCase(AddacceptOrDenyAppointment.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action?.error.message;
      })
      // Add complete appointment
      .addCase(AddcompleteAnAppointment.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(AddcompleteAnAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
      })
          
      .addCase(AddcompleteAnAppointment.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action?.error.message;
      })
      // delete appointment request
      .addCase(deleteAppointmentRequest.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(deleteAppointmentRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.deleteMsg = action.payload?.message;
        state.totalScheduledAppointment -= 1;
        state.scheduledAppointment = state.scheduledAppointment.filter(
          (item) => item.appointmentId !== action.payload.appointmentId
        );
      })
      .addCase(deleteAppointmentRequest.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action?.error.message;
        state.deleteMsg = action?.error.message;
      })
      // Fetch all Schedule
      .addCase(fetchAllSchedule.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchAllSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.schedules = action.payload.schedules;
        state.totalSchedules = action.payload.totalSchedules;
      })
      .addCase(fetchAllSchedule.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.schedules = [];
        state.totalSchedules = 0;
        state.error = action?.error.message;
      })
      // Add new schedule appointment
      .addCase(PostNewScheduleAnAppointment.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(PostNewScheduleAnAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.schedules.push(action.payload);
      })
      .addCase(PostNewScheduleAnAppointment.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action?.error.message;
      })
      // Remove schedule
      .addCase(removeSchedule.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(removeSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.totalSchedules -= 1;
        if (action.payload.isDeleted) {
          state.schedules = state.schedules.filter(
            (item) => !item.isDeleted
          );
        } else {
          state.error = "Failed to delete the schedule.";
        }
      })
      .addCase(removeSchedule.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action?.error.message;
      })
      // Fetch mentor Availabe Slot
      .addCase(fetchMentoravailableSlots.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchMentoravailableSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.mentorAvaialeSlots = action.payload;
      })
      .addCase(fetchMentoravailableSlots.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.mentorAvaialeSlots = [];
        state.error = action?.error.message;
      })
      // Student Appointment Request
      .addCase(StudentAppointmentApplication.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(StudentAppointmentApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.totalAppointmentApplication += 1;
        state.appointmentApplication.push(action.payload);
      })
      .addCase(StudentAppointmentApplication.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.error = action?.error.message;
      });
  },
});

export default appointmentSlice.reducer;
