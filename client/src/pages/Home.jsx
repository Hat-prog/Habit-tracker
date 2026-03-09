import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [habits, setHabits] = useState([]);
  const [completedToday, setCompletedToday] = useState([]);

  const fetchData = async () => {
    const [habitsRes, completionsRes] = await Promise.all([
      fetch(`${API}/habits`),
      fetch(`${API}/completions/today`),
    ]);
    setHabits(await habitsRes.json());
    setCompletedToday((await completionsRes.json()).map((c) => c.habit_id));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const markComplete = async (habitId) => {
    await fetch(`${API}/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ habit_id: habitId }),
    });
    fetchData();
  };

  const deleteHabit = async (habitId) => {
    await fetch(`${API}/habits/${habitId}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="page">
      <h1>My Habits</h1>
      {habits.length === 0 && (
        <p className="empty-state">Add your first habit!</p>
      )}
      {habits.map((habit) => {
        const done = completedToday.includes(habit.id);
        return (
          <div key={habit.id} className={`habit-card ${done ? "done" : "pending"}`}>
            <div className="habit-info">
              <strong>{habit.name}</strong>
              <span className="category">{habit.category}</span>
            </div>
            <div className="habit-actions">
              {done ? (
                <span className="done-label">Done today!</span>
              ) : (
                <button className="btn-complete" onClick={() => markComplete(habit.id)}>
                  Mark Complete
                </button>
              )}
              <button className="btn-delete" onClick={() => deleteHabit(habit.id)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
