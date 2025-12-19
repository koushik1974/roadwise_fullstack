# 🌍 RoadWise — Full-Stack Travel Experience Platform

RoadWise is a **full-stack web application** that enables users to **discover** and **visually create** travel experiences using an interactive, node-based editor.

> The project focuses on solving real-world travel planning problems by combining **visual planning**, **structured backend storage**, and **secure authentication**.
> 
> The main motivation behind this project was my personal experience while planning trips.
When I wanted to visit a place, I often relied on friends or searched the internet, but I rarely found a clear, complete travel plan that matched my budget and duration of stay.
To solve this, I built RoadWise, a web application where authenticated users can share structured travel experiences, enabling others to make informed decisions and plan trips more efficiently.
---

## 📌 Problem Statement

Planning a trip using existing platforms is often fragmented and inefficient:

- Travel information is scattered across blogs, videos, and review sites
- Most platforms focus only on **booking**, not on real travel experiences
- Users struggle to understand:
  - How a trip is structured
  - The actual flow between places
  - Whether a plan fits their budget and duration
- There is no intuitive way to **visually represent** or reuse travel plans created by others

As a result, travelers spend significant time researching but still lack clarity and confidence.

---

## 💡 Solution — How RoadWise Solves This

**RoadWise** provides a **visual, experience-driven travel planning platform** where users can both **discover** and **create** structured travel plans.

### 🔍 Experience Discovery
- Search trips by **city**
- View real user-shared experiences with:
  - Budget
  - Number of days
  - Mode of travel
- Enables quick comparison of practical, real-world trips

### 🧭 Visual Experience Builder
- Interactive **drag-and-drop editor**
- Users can add and arrange:
  - Hotels / Inns (with food preference)
  - Beaches
  - Temples
  - Hill stations
  - Rivers / Lakes
- Locations are connected using **curved dotted paths**
- Converts abstract travel ideas into a **clear visual journey**

### 🗂️ Structured Backend Storage
- Experiences are stored as structured data:
  - Nodes → places (type, position, metadata)
  - Connections → movement between places
- Enables accurate reconstruction, reuse, and searching

### 🔐 Trust & Security
- JWT-based authentication
- Only logged-in users can add experiences
- Each experience is linked to its creator

---

## 🚀 Key Highlights

- Full-stack application using **React + Node.js**
- Secure **JWT authentication**
- Interactive drag-and-drop UI
- Graph-like data modeling in **MongoDB**
- RESTful API design
- Real-world debugging and dependency handling

---

## 🧩 Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes

### 🔍 Travel Search
- City-based search
- Budget, days, and travel mode display

### 🧭 Add Experience (Core Feature)
- Visual node-based editor
- Persistent backend storage
- Clean and responsive UI

---

## 🖼️ Application Screenshots

<details>
<summary>Click to view screenshots</summary>

### Home Page
![Home](<img width="1920" height="1080" alt="Screenshot (123)" src="https://github.com/user-attachments/assets/a6b6a559-4cd3-4b7c-bed7-68636a8ade8b" />)

### Login Page
![Login](<img width="1920" height="1080" alt="Screenshot (122)" src="https://github.com/user-attachments/assets/9509cba1-1344-4664-a4f1-c333e78b5870" />)

### Search Results
![Search](<img width="1920" height="1080" alt="Screenshot (124)" src="https://github.com/user-attachments/assets/3f315722-93f3-4683-82b5-2d607ec694b4" />)

### Search Results detailed
![Search](<img width="1920" height="1058" alt="screencapture-localhost-5173-trip-6943d65795b50b016b37babc-2025-12-19-10_24_26" src="https://github.com/user-attachments/assets/08ea0004-cac9-44fd-b5a0-616644f4409f" />)

### Add Experience Editor
![Editor](<img width="1920" height="1617" alt="screencapture-localhost-5173-add-2025-12-18-15_54_12" src="https://github.com/user-attachments/assets/f970ff05-4d17-4e68-ba7a-511ad164fe6b" />)


</details>

---

## 🏗️ Tech Stack

### Frontend
```bash
- React.js
- Vite
- React Router
- JavaScript (ES6+)
- CSS
- React Hot Toast
```
### Backend
```bash
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs
```
---

## 📁 Project Structure

```bash
roadwise/
├── roadwise-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── assets/
│   ├── public/
│   └── vite.config.js
│
├── roadwise-backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── app.js
│
└── screenshots/
```


## ⚡ Quick Start

Backend
```bash
cd roadwise-backend
npm install
node app.js
```

### Backend runs on:
```bash
http://localhost:5000
```
### Frontend
```bash
cd roadwise-frontend
npm install
npm run dev
```

### Frontend runs on:
```
http://localhost:3000
```
## ⚙️ Environment Variables

### Create a .env file inside roadwise-backend/:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/roadwise
JWT_SECRET=your_jwt_secret
PORT=5000
```
## 🔌 API Endpoints
```bash
POST /api/auth/register
POST /api/auth/login
GET  /api/travel/search?city=Goa
POST /api/travel/add        (Protected)
```
## 🧠 Engineering Highlights

-Designed REST APIs with authentication & authorization

-Implemented protected frontend routes using JWT

-Modeled graph-structured travel data in MongoDB

-Synced interactive UI state with backend persistence

-Debugged real-world dependency and environment issues

## 🔮 Future Enhancements

-Budget & duration filters

-User profiles

-Likes & bookmarks

-Map integration

Cloud deployment (Vercel + Render)
