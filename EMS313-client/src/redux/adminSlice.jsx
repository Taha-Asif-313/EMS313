import { createSlice } from "@reduxjs/toolkit";
const adminInstance = JSON.parse(localStorage.getItem("adminInstance"));

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    // isAdminLogin: adminInstance ? true : false,
    isAdminLogin : true,
    adminInstance: adminInstance ? adminInstance : null,
  },
  reducers: {
    SetAdminLogin: (state, action) => {
      state.isAdminLogin = action.payload;
    },
    SetAdminInstance: (state, action) => {
      state.adminInstance = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetAdminLogin, SetAdminInstance } = adminSlice.actions;

export default adminSlice.reducer;
