# CampusPilot — Smart Student OS

CampusPilot is a student-life command center built for the **Cognition × Notion Student OS Hackathon**. It brings academic tasks, campus events, study tracking and career preparation into one simple workspace.

## The problem
University students often manage assignments, exams, club events, study goals and career preparation in disconnected places. Important deadlines get missed and progress is hard to see. CampusPilot gives students one practical overview and a lightweight daily workflow.

## Features
- Dashboard with open/completed tasks, campus events, study hours and completion progress
- Task manager with course, due date, priority and completion status
- Campus event planner for workshops, competitions and club activities
- Study-session logger with history and total study time
- Career hub with skills and opportunity checklist
- Browser storage so the app works immediately without an account
- Optional Notion API sync for newly created tasks and events; Notion credentials stay on the local server, never in browser JavaScript

## Tech stack
HTML, CSS, vanilla JavaScript, Node.js, Express, Notion API, localStorage.

## Run locally
1. Install Node.js (18 or newer).
2. Open this folder in VS Code.
3. Open the terminal and run:
   ```bash
   npm install
   ```
4. Copy `.env.example` to `.env`.
5. Start the app:
   ```bash
   npm start
   ```
6. Visit `http://localhost:3000`.

The app works in **local mode** even if you do not configure Notion.

## Enable Notion integration
1. Create an integration at https://www.notion.so/profile/integrations and copy its internal integration secret.
2. In Notion, create a Tasks database with these properties:
   - `Name` (Title)
   - `Course` (Text / Rich text)
   - `Due Date` (Date)
   - `Priority` (Select: High, Medium, Low)
   - `Status` (Status; include Not started)
3. Create an Events database with:
   - `Name` (Title)
   - `Date` (Date)
   - `Category` (Select: Workshop, Competition, Club, Campus)
   - `Location` (Text / Rich text)
4. Share both databases with your integration (database menu → Connections).
5. Put the integration secret and database IDs in `.env`:
   ```env
   NOTION_TOKEN=secret_xxxxxxxxx
   NOTION_TASKS_DATABASE_ID=your_tasks_database_id
   NOTION_EVENTS_DATABASE_ID=your_events_database_id
   ```
6. Restart `npm start`. Create a new task or event; it will be sent to the corresponding database.

**Important:** Notion database property names and types must match the list above. Keep `.env` private and never commit it to GitHub.

## How this uses Notion Student OS
CampusPilot follows the Student OS idea of keeping academic planning and campus life organized in a connected workspace. The optional Notion integration creates task and event records in Notion databases, so students can continue organizing and extending their information in Notion. The local-first mode ensures the core workflow remains usable even before a Notion integration is configured.

## How Devin Chat was used
For an honest hackathon submission, document your actual Devin usage here. Suggested workflow:
- Ask Devin Chat to inspect the project requirements and propose a student dashboard architecture.
- Ask Devin to review the task/event flows and identify edge cases.
- Ask Devin to review the Express Notion API routes for safe server-side secret handling.
- Record the changes Devin actually made or reviewed. Do not claim Devin generated code that was written by another tool.

Suggested Devin prompts are in `DEVIN_PROMPTS.md`.

## Test checklist
- [ ] Start server and open the dashboard.
- [ ] Add a task, reload the page, and confirm it remains.
- [ ] Mark a task complete and check dashboard statistics.
- [ ] Add a campus event and check the overview.
- [ ] Log a study session and check the total.
- [ ] Add a skill and toggle a career checklist item.
- [ ] If Notion is configured, create a task and event and verify both appear in Notion.

## Project structure
```text
CampusPilot/
├── public/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
├── README.md
└── DEVIN_PROMPTS.md
```

## Future improvements
- Import course timetable and assignment databases from an existing Notion Student OS
- Calendar view and recurring reminders
- Role-based collaboration for student clubs and project teams
- Notion OAuth for multi-user deployment
- Accessibility and mobile-first refinements
