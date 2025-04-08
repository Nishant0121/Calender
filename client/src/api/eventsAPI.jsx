import axios from "axios";
const API_URL = "http://localhost:5000/api/events";

export const getEvents = () => axios.get(API_URL);
export const createEvent = (event) => axios.post(API_URL, event);
export const editEvent = (event) => axios.put(`${API_URL}/${event._id}`, event);
