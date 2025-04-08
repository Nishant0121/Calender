import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://calender-8b5p.onrender.com/api/events"
    : "http://localhost:5000/api/events";

// helper to turn ISO strings into Dates
const transformEvent = (ev) => ({
  ...ev,
  start: new Date(ev.start),
  end: new Date(ev.end),
});

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
  const { data } = await axios.get(API_URL);
  return data; // still ISO strings
});

export const addEvent = createAsyncThunk("events/add", async (event) => {
  const response = await axios.post(API_URL, event);
  // newly created event also needs conversion
  return transformEvent(response.data);
});

export const updateEvent = createAsyncThunk("events/update", async (event) => {
  const response = await axios.put(`${API_URL}/${event._id}`, event);
  return transformEvent(response.data);
});

const eventsSlice = createSlice({
  name: "events",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  },
});

export default eventsSlice.reducer;
