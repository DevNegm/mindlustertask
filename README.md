Kanban ToDo Dashboard

A Kanban-style ToDo dashboard built with React, React Query, Material UI, and Drag-and-Drop functionality.
This application allows users to create, update, delete, search, and move tasks between columns with smooth UI and cached data handling.

🚀 Features

✅ 4 Kanban columns:

To Do

In Progress

In Review

Done

✅ Task management

Create new tasks

Edit existing tasks

Delete tasks

✅ Drag and Drop

Move tasks between columns

Reorder tasks inside the same column

✅ Search

Filter tasks by title

Filter tasks by description

Searches across all columns

✅ Pagination / Infinite scroll ready structure

✅ Server state management

Cached using React Query

Optimistic-ready architecture

✅ Modern UI

Built using Material UI and Tailwind Css

Responsive layout

🧱 Tech Stack

Frontend

React 18+

React Query (@tanstack/react-query)

Material UI
Tailwind Css

@hello-pangea/dnd (Drag and Drop)

State Management

React Query (server state caching)

Mock Backend

JSON Server

📁 Project Structure
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Preloader.jsx
│   ├── Column.jsx
│   ├── Task.jsx
│   ├── NewTask.jsx
│   ├── TaskBody.jsx
│   ├── TaskForm.jsx
│
├── api/
│   ├── main.js
│
├── utils/
│   ├── helpers.jsx
│
├── App.jsx
├── index.css
└── main.jsx

⚙️ Installation
1. Clone repo
git clone https://github.com/DevNegm/mindlustertask.git
cd kanban-dashboard
2. Install dependencies
npm install
3. Start JSON Server

Create db.json

{
  "columns": [
    {
      "id": "1",
      "title": "To Do",
      "status_color":"#64748b",
      "tasks": []
    },
    {
      "id": "2",
      "title": "In Progress",
      "status_color": "#3b82f6",
      "tasks": []
    },
    {
      "id": "3",
      "title": "In Review",
      "status_color": "#8b5cf6",
      "tasks": []
    },
    {
      "id": "4",
      "title": "Done",
      "status_color": "#22c55e",
      "tasks": []
    }
  ]
}

Run server:

npm run server

4. Start frontend
npm run dev
🔄 Drag and Drop

Implemented using:

@hello-pangea/dnd

Supports:

moving between columns

reordering inside column

empty column drops

🔎 Search

Search bar filters tasks by:

title
description

Across all columns instantly (client-side filtering).

🧠 React Query Usage

Used for:

fetching columns

caching data

mutations:

create task

update task

delete task

move task

Benefits:

automatic caching

better performance

🎨 UI

Material UI used for:

Modal
Inputs
Typography

⏱ Challenge Constraints

Completed according to requirements:

✅ React

✅ React Query

✅ Material UI

✅ Tailwind Css

✅ Drag and Drop

✅ CRUD

✅ Search

✅ Column layout

✅ Cached server state

📸 Preview

visit this link : https://mindlustertask.vercel.app/

👨‍💻 Author

Ahmad Negm
Frontend Developer (React / Next.js)
