// clockbutton.js
import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { fetchEntries, clockIn, clockOut } from "../api/api";

const ClockButton = ({ onClock }) => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeEntry, setActiveEntry] = useState(null);

  // Fetch active entry on component mount
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
        // Clock Out
        await clockOut(activeEntry.id);
        setIsClockedIn(false);
        setActiveEntry(null); // Reset active entry
      } else {
        // Clock In
        const newEntry = await clockIn();
        setIsClockedIn(true);
        setActiveEntry(newEntry); // Set the new active entry
      }
      onClock?.(); // Trigger the callback to refresh data
    } catch (error) {
      console.error("Clock operation failed:", error);
    } finally {
      setLoading(false);
    }
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