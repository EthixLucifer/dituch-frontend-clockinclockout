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
                          {new Date(entry.start_time).toLocaleTimeString()} -{" "}
                          {entry.end_time ? 
                            new Date(entry.end_time).toLocaleTimeString() : "Now"}
                        </td>
                        <td>
                          {(
                            ((entry.end_time || Date.now()) - 
                            new Date(entry.start_time)) / 3600000
                          ).toFixed(1)}h
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