import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticationStart: (state) => {
      state.loading = true;
      state.success = false;
      state.error = false;
      state.user = null;
    },
    authenticationSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.user = null;
    },
    authenticationFailed: (state) => {
      state.loading = false;
      state.success = false;
      state.error = true;
      state.user = null;
    },
    getUserProfile: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
      state.user = action.payload;
    },
    resetUser: (state) => {
      state = initialState;
    },
  },
});

export const {
  authenticationStart,
  authenticationSuccess,
  authenticationFailed,
  getUserProfile,
  resetUser,
} = authSlice.actions;
export default authSlice.reducer;
