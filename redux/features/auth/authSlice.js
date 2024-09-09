import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgetPasswordAPI, getUserInfo, resetPasswordAPI, userLoginAPI } from "./authAPI.js";
import Cookies from "js-cookie";

const initialState = {
  loading: false,
  isError: false,
  error: "",
  user: {},
  userInfo: {},
  isOTPSent:false,
  resetPass : false
};

// Create thunk
export const userLogin = createAsyncThunk("user/userLogin", async (data) => {
  const user = await userLoginAPI(data);
  if (user.token) {
    Cookies.set("token", user.token, { expires: 7 }); 
  }
  return user;
});

export const userForgetPassword = createAsyncThunk("user/userForgetPassword", async (data) => {
  const response = await forgetPasswordAPI(data);
  return response;
});

export const userResetPassword = createAsyncThunk("user/userResetPassword", async (data) => {
  const response = await resetPasswordAPI(data);
  return response;
});

export const fetchUserInfo = createAsyncThunk("user/fetchUserInfo", async () => {
  const token = Cookies.get("token"); 
  const userInfo = await getUserInfo(token);
  return userInfo;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {};
      state.userInfo = {};
      Cookies.remove("token"); 
    },
  },
  extraReducers: (builder) => {
    builder
     // login slice
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.user = {};
        state.error = action.error?.message;
      })
      // userinfo 
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.userInfo = action.payload.data;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.userInfo = {};
        state.error = action.error?.message;
      })
      // forget password
      .addCase(userForgetPassword.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(userForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.isOTPSent = action.payload;
      })
      .addCase(userForgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.isOTPSent = false;
        state.error = action.error?.message;
      })
      // reset password
      .addCase(userResetPassword.pending, (state) => {
        state.loading = true;
        state.isError = false;
      })
      .addCase(userResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isError = false;
        state.resetPass = true;
      })
      .addCase(userResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.isError = true;
        state.resetPass = false;
        state.error = "Something wrong! Please Try again";
      })
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
