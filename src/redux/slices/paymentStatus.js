import { createSlice } from "@reduxjs/toolkit";

export const paymentStatusSlice = createSlice({
  name: "paymentStatus",
  initialState: {
    status: "pending",
  },
  reducers: {
    success: (state) => {
      state.status = "success";
    },
    failed: (state) => {
      state.status = "failed";
    },
    pending: (state) => {
      state.status = "pending";
    },
  },
});

export const { success, failed, pending } = paymentStatusSlice.actions;

export const selectStatus = (state) => state.paymentStatus.status;

export default paymentStatusSlice.reducer;
