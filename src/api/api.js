import axios from "axios";

const API_BASE_URL = "https://dituch-internship.onrender.com/api";
const TOKEN = "75a7218a00f505b783c21d24d8a07eeceabf35e1";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Token ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const fetchEntries = async (date = "") => {
  try {
    const response = await axiosInstance.get(`/entries/${date ? `?date=${date}` : ""}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching entries:", error.response?.data || error);
    return [];
  }
};

// api.js
export const clockIn = async () => {
  try {
    const response = await axiosInstance.post("/entries/", {
      project: 1,
      activity: 1,
      location: 1,
      status: 1,
    });
    return response.data; // Return the created entry
  } catch (error) {
    console.error("Error clocking in:", error.response?.data || error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const clockOut = async (id) => {
  try {
    await axiosInstance.put(`/entries/${id}/`, { end_time: new Date().toISOString() });
  } catch (error) {
    console.error("Error clocking out:", error.response?.data || error);
  }
};

export const fetchDailyEntries = async (date) => {
  try {
    const response = await axiosInstance.get(`/entries/?date=${date}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching entries:", error);
    return [];
  }
};

export const fetchWeeklyEntries = async (startDate) => {
  try {
    const response = await axiosInstance.get(`/entries/?start_date=${startDate}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly entries:", error);
    return [];
  }
};