import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from "./features/events/eventSlice";

export const store = configureStore({
  reducer: { events: eventsReducer },
});
