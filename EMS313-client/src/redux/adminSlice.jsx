import { createSlice } from "@reduxjs/toolkit";
const adminInstance = JSON.parse(localStorage.getItem("adminInstance"));
const allEmployees = JSON.parse(localStorage.getItem("allEmployees"));

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    // isAdminLogin: adminInstance ? true : false,
    isAdminLogin : true,
    adminInstance: adminInstance ? adminInstance : null,
    allEmployees : allEmployees ? allEmployees : null
  },
  reducers: {
    SetAdminLogin: (state, action) => {
      state.isAdminLogin = action.payload;
    },
    SetAdminInstance: (state, action) => {
      state.adminInstance = action.payload;
    },
    setEmployees: (state, action)=>{
      state.allEmployees = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { SetAdminLogin, SetAdminInstance , setEmployees } = adminSlice.actions;

export default adminSlice.reducer;
