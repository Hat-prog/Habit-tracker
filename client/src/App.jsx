import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddHabit from "./pages/AddHabit";

export default function App() {
  return (
    <div>
      <nav>
        <span className="nav-brand">Habit Tracker</span>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add">+ Add Habit</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddHabit />} />
      </Routes>
    </div>
  );
}
