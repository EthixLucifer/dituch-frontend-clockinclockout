import { useState, useEffect } from "react";
import ClockButton from "../components/clockbutton";
import DailyLog from "../components/dailylog";
import WeeklyLog from "../components/weeklylog";
import DateSelector from "../components/dateselector";
import { fetchEntries, fetchWeeklyEntries } from "../api/api";

const Dashboard = () => {
  const [dailyLogs, setDailyLogs] = useState([]);
  const [weeklyLogs, setWeeklyLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [weeklyStartDate, setWeeklyStartDate] = useState("");

  const loadData = async (date) => {
    try {
      // Load daily entries
      const dailyEntries = await fetchEntries(date);
      setDailyLogs(dailyEntries);

      // Calculate week boundaries
      const [year, month, day] = date.split('-');
      const selectedDateObj = new Date(year, month - 1, day);
      const dayOfWeek = selectedDateObj.getDay();
      const startOfWeek = new Date(selectedDateObj);
      startOfWeek.setDate(selectedDateObj.getDate() - dayOfWeek);
      
      const startDateString = `${startOfWeek.getFullYear()}-${(startOfWeek.getMonth() + 1)
        .toString().padStart(2, '0')}-${startOfWeek.getDate().toString().padStart(2, '0')}`;
      
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
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <ClockButton onClock={() => loadData(selectedDate)} />
            <DateSelector 
              onChange={(date) => setSelectedDate(date)}
              value={selectedDate}
            />
          </div>
          <DailyLog logs={dailyLogs} />
        </div>
      </div>
      <div className="card shadow">
        <div className="card-body">
          <WeeklyLog logs={weeklyLogs} startDate={weeklyStartDate} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;