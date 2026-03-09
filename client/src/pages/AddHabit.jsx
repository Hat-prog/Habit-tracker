import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function AddHabit() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("health");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API}/habits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category }),
    });
    navigate("/");
  };

  return (
    <div className="page">
      <h1>Add a New Habit</h1>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Habit Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Morning run"
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="health">Health</option>
              <option value="fitness">Fitness</option>
              <option value="learning">Learning</option>
              <option value="wellness">Wellness</option>
              <option value="mindfulness">Mindfulness</option>
            </select>
          </div>
          <button type="submit" className="btn-submit">Add Habit</button>
        </form>
      </div>
    </div>
  );
}