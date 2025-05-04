import { createSlice } from "@reduxjs/toolkit";
const employeeInstance = JSON.parse(localStorage.getItem("employeeInstance"));

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    // isEmployeeLogin: employeeInstance ? true : false,
    isEmployeeLogin: true,
    employeeInstance: employeeInstance ? employeeInstance : null,
  },
  reducers: {
    SetEmployeeLogin: (state, action) => {
      state.isEmployeeLogin = action.payload;
    },
    SetEmployeeInstance: (state, action) => {
      state.employeeInstance = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetEmployeeLogin, SetEmployeeInstance } = employeeSlice.actions;

export default employeeSlice.reducer;
