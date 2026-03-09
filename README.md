# Habit Tracker

A full-stack habit tracking app built with React, Express, and PostgreSQL (Supabase).

## Links
- Client: https://habit-tracker-1-93y2.onrender.com
- Server: https://habit-tracker-temr.onrender.com
- GitHub: https://github.com/Hat-prog/Habit-tracker

## What I built
Users can add habits, mark them as complete each day, and delete them. The app polls the database every 10 seconds to stay up to date.

## Tech Stack
- React + React Router (frontend)
- Express (backend API)
- PostgreSQL via Supabase (database)
- Deployed on Render

## Reflection

### What requirements did I achieve?
All core requirements: React client, Express GET/POST endpoints, React form, multiple pages with React Router, database schema with seed data, SQL queries, `.map()` to display habits, and `useEffect` with polling interval. Also completed stretch goals: delete functionality.

### Were there any requirements or goals you were unable to achieve?
Did not fully implement category filtering routes (`/habits/:category`).

### What did I find difficult?
Connecting the deployed server to Supabase — the Direct Connection doesn't support IPv4 (used by Render), so switching to the Session Pooler connection string was needed to fix it.