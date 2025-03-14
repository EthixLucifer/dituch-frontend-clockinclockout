import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { clockIn, clockOut } from "../api/api";

const ClockInOutButton = ({ isClockedIn, setIsClockedIn, entryId, setEntryId }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (isClockedIn) {
        await clockOut(entryId);
        setIsClockedIn(false);
        setEntryId(null);
      } else {
        const newEntry = await clockIn();
        setIsClockedIn(true);
        setEntryId(newEntry.id);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <Button variant={isClockedIn ? "danger" : "success"} onClick={handleClick} disabled={loading}>
      {loading ? <Spinner size="sm" animation="border" /> : isClockedIn ? "Clock Out" : "Clock In"}
    </Button>
  );
};

export default ClockInOutButton;
