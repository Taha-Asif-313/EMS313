import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import adminSlice from "./adminSlice";
import dashboardReducer from "./dashboardSlice";

export default configureStore({
  reducer: {
    admin: adminSlice,
    employee: employeeSlice,
    dashboard: dashboardReducer,
  },
});
