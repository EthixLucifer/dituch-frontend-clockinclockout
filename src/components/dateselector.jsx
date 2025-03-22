import React from "react";

const DateSelector = ({ onChange, value }) => {
  return (
    <div className="d-flex align-items-center">
      <input
        type="date"
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ maxWidth: '200px' }}
      />
      <span className="ms-2">{new Date(value).toDateString()}</span>
    </div>
  );
};

export default DateSelector;