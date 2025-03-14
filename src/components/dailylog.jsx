import React from "react";
import { Table } from "react-bootstrap";

const DailyLog = ({ logs }) => {
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
              <td>{log.project?.name || "N/A"}</td>
              <td>{log.start_time ? new Date(log.start_time).toLocaleTimeString() : "N/A"}</td>
              <td>{log.end_time ? new Date(log.end_time).toLocaleTimeString() : "In Progress"}</td>
              <td>
                {log.end_time 
                  ? `${Math.round((new Date(log.end_time) - new Date(log.start_time)) / 3600000)} hours`
                  : "Active"}
              </td>
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