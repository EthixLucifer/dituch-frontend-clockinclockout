import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { fetchEntries, clockIn, clockOut } from "../api/api";

const ClockButton = ({ onClock }) => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeEntry, setActiveEntry] = useState(null);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const entries = await fetchEntries();
        const active = entries.find(entry => !entry.end_time);
        setIsClockedIn(!!active);
        setActiveEntry(active);
      } catch (error) {
        console.error("Error checking status:", error);
      }
    };
    
    checkStatus();
  }, []);

  const handleClock = async () => {
    setLoading(true);
    try {
      if (isClockedIn) {
        await clockOut(activeEntry.id);
      } else {
        await clockIn();
      }
      await onClock?.();
      setIsClockedIn(!isClockedIn);
    } catch (error) {
      console.error("Clock operation failed:", error);
    }
    setLoading(false);
  };

  return (
    <Button 
      variant={isClockedIn ? "outline-danger" : "outline-success"}
      onClick={handleClock}
      disabled={loading}
      className="px-4"
    >
      {loading ? (
        <Spinner animation="border" size="sm" />
      ) : isClockedIn ? (
        "Clock Out"
      ) : (
        "Clock In"
      )}
    </Button>
  );
};

export default ClockButton;