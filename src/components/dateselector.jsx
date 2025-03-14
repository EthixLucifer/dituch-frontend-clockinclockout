const DateSelector = ({ onChange, value }) => {
    return (
      <input
        type="date"
        className="form-control"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ maxWidth: '200px' }}
      />
    );
  };
  
  export default DateSelector;