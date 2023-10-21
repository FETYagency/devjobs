import { configureStore } from "@reduxjs/toolkit";
import jobs from "./jobs";
const store = configureStore({
  reducer: {
    jobs: jobs,
  },
});
export default store;
