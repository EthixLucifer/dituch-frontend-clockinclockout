// components/weeklylog.jsx (Updated)
import { Card, Table } from "react-bootstrap";

const WeeklyLog = ({ logs }) => {
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
        {Object.entries(groupByDate).map(([date, entries]) => (
          <div key={date} className="mb-4">
            <h5>{date}</h5>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Time Range</th>
                  <th>Duration</th>
                  <th>Project</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(entry => (
                  <tr key={entry.id}>
                    <td>
                      {new Date(entry.start_time).toLocaleTimeString()} -{" "}
                      {entry.end_time ? new Date(entry.end_time).toLocaleTimeString() : "Now"}
                    </td>
                    <td>
                      {Math.round(
                        ((entry.end_time || Date.now()) - new Date(entry.start_time)) / 3600000
                      ).toFixed(1)}h
                    </td>
                    <td>{entry.project?.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default WeeklyLog;