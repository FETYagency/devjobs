import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const filterJobs = createAsyncThunk("jobs/filter", async (options) => {
  const req = await fetch("/jobs/filter", {
    method: "POST",
    body: JSON.stringify(options),
  });
  const resp = await req.json();
  return resp;
});
export const readJobs = createAsyncThunk("jobs/read", async () => {
  const req = await fetch("/jobs/read", { method: "GET" });
  const resp = await req.json();
  return resp;
});
const jobs = createSlice({
  name: "jobs",
  initialState: {
    status: "idle",
    content: null,
  },
  extraReducers: (build) => {
    build
      .addCase(filterJobs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(filterJobs.fulfilled, (state, action) => {
        (state.status = "success"), (state.content = action.payload);
      })
      .addCase(readJobs.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(readJobs.fulfilled, (state, action) => {
        (state.status = "success"), (state.content = action.payload);
      });
  },
});
export const selectJobs = (state) => state.jobs;
export default jobs.reducer;
