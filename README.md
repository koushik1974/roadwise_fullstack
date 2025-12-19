🌍 RoadWise — Full-Stack Travel Experience Platform

RoadWise is a full-stack web application that enables users to discover budget-friendly travel plans and visually create and share their own travel experiences using an interactive node-based editor.

Built to demonstrate full-stack engineering, REST API design, authentication, and stateful UI interactions.

🚀 Key Highlights (Recruiter View)

🧠 Designed and implemented a complete MERN-style architecture

🔐 Built JWT-based authentication with protected routes

🎯 Developed an interactive drag-and-drop experience builder

📦 Modeled and persisted graph-like data structures in MongoDB

🔎 Implemented dynamic city-based search with backend filtering

🧪 Debugged and resolved real-world dependency & deployment issues

🧩 Core Features
Authentication & Security

User registration and login

Secure JWT authentication

Backend route protection for sensitive operations

Travel Discovery

City-based travel search

Displays budget, duration, and travel mode

Clean and responsive UI

Experience Creation (Primary Feature)

Visual drag-and-drop editor

Nodes represent:

Hotels / Inns (with food preference)

Beaches, temples, hills, water bodies

Curved dotted connections to represent travel flow

Backend stores:

Node positions (x, y)

Node types & metadata

Connection relationships

🖼️ Screenshots

All major flows are documented with screenshots:

Home Page:

<img width="1920" height="1080" alt="Screenshot (123)" src="https://github.com/user-attachments/assets/89888423-c7c9-46e5-9152-5f647082203a" />

Login:

<img width="1920" height="1080" alt="Screenshot (122)" src="https://github.com/user-attachments/assets/470f9b1a-1659-4a83-8998-494eeba10d3a" />


Register:

<img width="1920" height="1080" alt="Screenshot (121)" src="https://github.com/user-attachments/assets/50180c46-57a9-44aa-8af2-8782f3218f1d" />


Search Results:

<img width="1920" height="1080" alt="Screenshot (124)" src="https://github.com/user-attachments/assets/42dfcb72-4f46-41b4-a017-9c705267288a" />


Add Experience Editor:

<img width="1920" height="1617" alt="screencapture-localhost-5173-add-2025-12-18-15_54_12" src="https://github.com/user-attachments/assets/ec8ddf24-3ac5-45f1-874e-aaed4c139513" />


Experience Detail View:

<img width="1920" height="1058" alt="screencapture-localhost-5173-trip-6943d65795b50b016b37babc-2025-12-19-10_24_26" src="https://github.com/user-attachments/assets/5e11a840-e7ba-48d1-a383-b58dd3220959" />


📁 Located in:

/screenshots

🏗️ Tech Stack
Frontend

React.js

Vite

React Router

JavaScript (ES6+)

CSS / Inline Styling

React Hot Toast

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

RESTful API Design

📁 Project Architecture
roadwise/
├── roadwise-frontend/
│   └── React SPA (UI, Routing, State)
│
├── roadwise-backend/
│   └── Express API (Auth, Travel, DB)
│
└── screenshots/

⚙️ Local Setup (Verified)
Backend
cd roadwise-backend
npm install
node app.js


Runs on:

http://localhost:5000

Frontend
cd roadwise-frontend
npm install
npm run dev


Runs on:

http://localhost:3000

📦 Database Design (MongoDB)

Each travel experience stores:

City, budget, duration, travel mode

Array of nodes (type, position, metadata)

Array of connections (graph edges)

User reference (creator)

Demonstrates schema design, data normalization, and relationship handling.

🧪 Engineering Challenges Solved

Dependency conflicts in MongoDB drivers

JWT token handling and authorization flow

Syncing frontend state with backend persistence

Handling protected routes and auth redirects

🔮 Planned Enhancements

Filters (budget, duration)

User profiles

Likes / bookmarks

Map integration

Cloud deployment (Vercel + Render)

👨‍💻 Developer

Bathula Koushik Yadav
B.Tech CSE — IIIT Jabalpur

💻 Full-Stack Development

🤖 AI / ML Enthusiast

🧠 Strong in DSA & system fundamentals

🔗 LinkedIn: https://www.linkedin.com/in/bathula-koushik-93b099325

📧 Email: bathulskoushikyadav@gmail.com

⭐ Why Recruiters Care

RoadWise demonstrates the ability to:

Build and integrate frontend + backend

Design real-world data models

Implement secure authentication

Debug production-level issues

Think in terms of user experience and system design
