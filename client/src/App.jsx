import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddHabit from "./pages/AddHabit";

export default function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/">Home</Link>
        <Link to="/add">+ Add Habit</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddHabit />} />
      </Routes>
    </div>
  );
}