import React from "react";
import { Table } from "react-bootstrap";

const DailyLog = ({ logs }) => {
  // Format time to show date and time
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "N/A";
    const dateTime = new Date(dateTimeString);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
  };

  // Calculate duration with precision to seconds
  const calculateDuration = (startTime, endTime) => {
    if (!startTime) return "N/A";
    if (!endTime) return "Active";
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffMs = end - start;
    
    // Calculate hours, minutes, seconds
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
  };

  return (
    <div>
      <h4 className="mb-3">Daily Entries</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Project</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.project?.name || "dituch"}</td>
              <td>{formatDateTime(log.start_time)}</td>
              <td>{log.end_time ? formatDateTime(log.end_time) : "In Progress"}</td>
              <td>{calculateDuration(log.start_time, log.end_time)}</td>
            </tr>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">No entries found for this day</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DailyLog;