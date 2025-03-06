import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";
import adminSlice from "./adminSlice";

export default configureStore({
  reducer: {
    admin: adminSlice,
    employee: employeeSlice,
  },
});
