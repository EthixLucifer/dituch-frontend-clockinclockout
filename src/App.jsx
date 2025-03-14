import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
