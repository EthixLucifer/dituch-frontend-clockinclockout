// dashboard.jsx
import { useState, useEffect } from "react";
import ClockButton from "../components/clockbutton";
import WeeklyLog from "../components/weeklylog";
import DateSelector from "../components/dateselector";
import { fetchWeeklyEntries } from "../api/api";

const Dashboard = () => {
  const [weeklyLogs, setWeeklyLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [weeklyStartDate, setWeeklyStartDate] = useState("");

  const loadData = async (date) => {
    try {
      // Calculate week boundaries (Sunday to Saturday)
      const selectedDateObj = new Date(date);
      const startOfWeek = new Date(selectedDateObj);
      startOfWeek.setDate(selectedDateObj.getDate() - selectedDateObj.getDay());
      
      const startDateString = startOfWeek.toISOString().split('T')[0];
      setWeeklyStartDate(startDateString);

      // Load weekly entries
      const weeklyEntries = await fetchWeeklyEntries(startDateString);
      setWeeklyLogs(weeklyEntries);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData(selectedDate);
  }, [selectedDate]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Employee Time Tracker</h1>
      <div className="card shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <ClockButton onClock={() => loadData(selectedDate)} />
            <DateSelector 
              onChange={(date) => setSelectedDate(date)}
              value={selectedDate}
            />
          </div>
          <WeeklyLog logs={weeklyLogs} startDate={weeklyStartDate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;