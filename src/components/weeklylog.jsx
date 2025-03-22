// weeklylog.jsx
import { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";

const WeeklyLog = ({ logs, startDate }) => {
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    if (startDate) {
      const generateWeekDays = () => {
        const start = new Date(startDate);
        const days = [];
        for (let i = 0; i < 7; i++) {
          const day = new Date(start);
          day.setDate(start.getDate() + i);
          days.push(day);
        }
        return days;
      };
      setWeekDays(generateWeekDays());
    }
  }, [startDate]);

  const groupByDate = logs.reduce((acc, log) => {
    const date = new Date(log.start_time).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(log);
    return acc;
  }, {});

  const formatDateTime = (dateString) => {
    const options = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : new Date();
    const durationMs = endTime - startTime;
    
    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <Card>
      <Card.Header>Weekly Summary</Card.Header>
      <Card.Body>
        {weekDays.map((date) => {
          const dateStr = date.toDateString();
          const entries = groupByDate[dateStr] || [];
          
          return (
            <div key={dateStr} className="mb-4">
              <h5>
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric"
                })}
              </h5>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Time Range</th>
                    <th>Duration</th>
                    <th>Project</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.length > 0 ? (
                    entries.map((entry) => (
                      <tr key={entry.id}>
                        <td>
                          {formatDateTime(entry.start_time)} -{" "}
                          {entry.end_time ? 
                            formatDateTime(entry.end_time) : "Now"}
                        </td>
                        <td>
                          {calculateDuration(entry.start_time, entry.end_time)}
                        </td>
                        <td>{entry.project?.name || "N/A"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No entries
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          );
        })}
      </Card.Body>
    </Card>
  );
};

export default WeeklyLog;