"use client";
import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./features/appoinment/AppointmentSlice";
import userReducer from "./features/auth/authSlice";
import careersReducer from "./features/career/careerSlice";
import countriesReducer from "./features/country/countrySlice";
import mentorsReducer from "./features/mentor/mentorSlice";
import blogPostsReducer from "./features/newsfeed/newsfeedSlice";
import notificationsReducer from "./features/notification/notificationSlice";
import studentReducer from "./features/student/studentSlice";
import chatReducer from "./features/chat/chatSlice";
import OfficeVisitedStudetReducer from "./features/officeVisitStudent/officeVisitStudentSlice";

export const store = configureStore({
  reducer: {
    mentors: mentorsReducer,
    countries: countriesReducer,
    blogs: blogPostsReducer,
    careers: careersReducer,
    user: userReducer,
    student: studentReducer,
    appoinment: appointmentReducer,
    notification: notificationsReducer,
    chat: chatReducer,
    offcieVisitStudent:OfficeVisitedStudetReducer
  },
});

export const { dispatch } = store;
