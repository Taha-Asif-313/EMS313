import { createSlice } from "@reduxjs/toolkit";

// Assuming this data is fetched from an API and saved in local storage
const storedDashboardStats = JSON.parse(localStorage.getItem("dashboardStats"));

const initialState = {
  totalSalaries: storedDashboardStats?.totalSalaries || 0,
  totalPendingTasks: storedDashboardStats?.totalPendingTasks || 0,
  employees: storedDashboardStats?.employees || [],
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // Set Dashboard Stats from API data
    setDashboardStats: (state, action) => {
      const { totalSalaries, totalPendingTasks, employees } = action.payload;
      state.totalSalaries = totalSalaries;
      state.totalPendingTasks = totalPendingTasks;
      state.employees = employees;
      localStorage.setItem("dashboardStats", JSON.stringify(action.payload));
    },
    // Optionally reset stats or loading/error state
    resetDashboardStats: (state) => {
      state.totalSalaries = 0;
      state.totalPendingTasks = 0;
      state.employees = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDashboardStats, resetDashboardStats } = dashboardSlice.actions;

export default dashboardSlice.reducer;
