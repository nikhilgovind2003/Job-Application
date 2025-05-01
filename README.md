# Job-Application:
# 🧑‍💼 Job Board Application

A full-stack Job Board Application built using the **MERN stack** (MongoDB, Express, React, Node.js) where users can register, log in, and post jobs. Authenticated users can also apply to jobs with a short cover letter.

---

## 🔧 Tech Stack

- **Frontend**: React (with Hooks), React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens), bcrypt for password hashing
- **State Management**: Context API (Bonus: Can be replaced/enhanced with Redux)

---

## 🔐 Authentication Features

- User registration and login
- JWT-based authentication
- Passwords are hashed with bcrypt
- Protected routes for job creation, update, deletion, and applications

---

## 💼 Job Features

- Create, Read, Update, and Delete (CRUD) job listings
- Job model includes:
  - `title`
  - `description`
  - `company`
  - `location`
  - `salary`
  - `createdBy` (User ID)
- Only job creators can edit or delete their own jobs

---

## 📝 Application Features

- Logged-in users can apply to jobs by submitting a short **cover letter**
- Job creators can view all applications for the jobs they’ve posted
- Application model includes:
  - `jobId`
  - `applicantId`
  - `coverLetter`

---

## 📄 Frontend Pages

- **Home**: View all job listings
- **Register/Login**: User authentication
- **Create Job**: Post a new job (Protected route)
- **My Jobs**: View, edit, or delete jobs posted by the logged-in user
- **Job Details**: View job and apply if logged in

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/job-board-app.git
cd job-board-app

