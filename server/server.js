const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// GET all habits
app.get("/habits", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM habits ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new habit
app.post("/habits", async (req, res) => {
  const { name, category } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO habits (name, category) VALUES ($1, $2) RETURNING *",
      [name, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST completion for a habit
app.post("/completions", async (req, res) => {
  const { habit_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO completions (habit_id) VALUES ($1) RETURNING *",
      [habit_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET completions today
app.get("/completions/today", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT habit_id FROM completions WHERE completed_at = CURRENT_DATE"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// habit delete route
app.delete("/habits/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM habits WHERE id = $1", [id]);
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on("uncaughtException", (err) => {
  console.error("CRASH:", err.message);
});