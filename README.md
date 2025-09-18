# Poll System

A full-stack polling application built with React (frontend) and Node.js/Express + Prisma/PostgreSQL (backend). Users can create polls, vote, and view results in real time.

## Features

- User registration (by username, no password)
- Create polls with 2–8 options
- Vote in polls (one vote per poll per user)
- View poll results with live vote counts
- Shareable poll links for public voting

---

## Tech Stack

- **Frontend:** React, Zustand, Axios, React Router, Tailwind CSS, Vite
- **Backend:** Node.js, Express, Prisma ORM, PostgreSQL

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/ZingerMarat/poll_system_interview_project.git
cd poll_system_interview_project
```

#### 2. Install dependencies

```bash
cd server
npm install
cd ../client
npm install
```

#### 3. Configure environment variables

Create a `.env` file in the `server/` directory:

```
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

#### 4. Run database migrations

```bash
cd server
npx prisma migrate deploy
```

#### 5. Start the backend

```bash
npm run start
```

#### 6. Start the frontend

```bash
cd ../client
npm run dev
```

Frontend will be available at [http://localhost:5173](http://localhost:5173)  
Backend API runs at [http://localhost:3000/api](http://localhost:3000/api)

---

## API Endpoints

All endpoints are prefixed with `/api`.

### User

#### Create or Get User

- **POST** `/api/users`
- **Body:** `{ "username": "string" }`
- **Response:** User object

---

### Polls

#### Create Poll

- **POST** `/api/polls`
- **Body:**
  ```json
  {
    "creatorId": 1,
    "question": "Your question?",
    "options": ["Option 1", "Option 2", "..."]
  }
  ```
- **Response:** Poll object with options

#### Vote on Poll

- **POST** `/api/polls/:id/vote`
- **Body:**
  ```json
  {
    "userId": 1,
    "optionId": 2
  }
  ```
- **Response:** Vote object
- **Errors:**
  - `userId must be provided`
  - `optionId must be provided`
  - `User has already voted`

#### Get Polls by User

- **GET** `/api/polls/user/:userId`
- **Response:** Array of polls created by the user (with options and votes)

#### Get Poll by ID

- **GET** `/api/polls/:pollId`
- **Response:** Poll object (with options and votes)

---

## Database Schema (Prisma)

- **User:** id, username, createdAt
- **Poll:** id, question, creatorId, createdAt
- **Option:** id, text, pollId, createdAt
- **Vote:** id, userId, optionId, createdAt

---
