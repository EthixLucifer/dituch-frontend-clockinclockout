import { useState, useEffect } from "react";
import ClockButton from "../components/clockbutton";
import DailyLog from "../components/dailylog";
import WeeklyLog from "../components/weeklylog";
import DateSelector from "../components/dateselector";
import { fetchEntries } from "../api/api";

const Dashboard = () => {
  const [dailyLogs, setDailyLogs] = useState([]);
  const [weeklyLogs, setWeeklyLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const loadData = async (date) => {
    try {
      const entries = await fetchEntries(date);
      setDailyLogs(entries);
      // For weekly view, you'd need a separate API endpoint to fetch week data
      setWeeklyLogs(entries); // Temporary - replace with actual weekly data
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
          <WeeklyLog logs={weeklyLogs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;