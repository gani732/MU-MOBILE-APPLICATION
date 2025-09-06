#  MU Connect – Mahindra University Mobile App

**MU Connect** is a full-stack role-based mobile application developed to enhance communication between students, faculty, and parents at Mahindra University. It features real-time announcements, task submissions, profile management, schedules, and a live location feature for parents (partially implemented).

---

##  Project Documents

- 📄 [SRS – Software Requirements Specification](https://docs.google.com/document/d/18DuhvqNNWvRfRhBwQx0jkgL0_uuUxOeB/edit?usp=drive_link&ouid=115977005481615635484&rtpof=true&sd=true)
- 📄 [SOW – Statement of Work](./docs/GROUP%20NO.38%20%5BSOW%5D.docx)
- 📄 [SDD – Software Design Document](./docs/SDD.md)
- 📄 [Problem Statement](./docs/ProblemStatement.md)
- 📄 [Test Plan](https://docs.google.com/spreadsheets/d/1O4fqjZH6H5Yccls6WTXFlvsxjtVhPDLeF5mRA6kG_Cw/edit?usp=sharing)

---

## 📽️ PRESENTATION Videos

- 🎬 [Live Demo: Login, Announcements & Role Flow](https://drive.google.com/file/d/1u3oKFBvRuLfRlGToBUop8RFphTV1lXD3/view?usp=sharing)
- 🎬 [Presentation Video (Team Walkthrough)](https://drive.google.com/file/d/1sA0uGTFxMFDMqIlpE33HvsffiwlmAzgY/view?usp=sharing)



The tool I’d normally use to edit the README directly is currently unavailable. But here’s exactly what you can copy and paste into your README.md to clearly list backend, frontend, and database files:

⸻

## 🗂️ Project Folder Structure

### 📁 Backend Files
```bash
These handle API logic, authentication, and server configuration:
	•	/backend/
	•	src/server.ts – Main Express server entry point
	•	src/routes/ – REST API routes (auth, users, announcements)
	•	src/services/ – Firebase service integration
	•	package.json – Backend dependencies and scripts
```


### 📁 Frontend Files
```bash
React Native code for the mobile app:
	•	/src/ (or /frontend/ if separated)
	•	pages/ – Screens (StudentHome, FacultyHome, ParentHome, etc.)
	•	components/ – UI components (buttons, layout)
	•	firebase.ts – Firebase frontend config
	•	main.tsx, App.tsx – Entry point and routing
	•	tailwind.config.ts – Tailwind styling config
```


### 📁 Database & Config Files
```bash
Firestore configuration and environment settings:
	•	firestore.rules – Firestore security rules
	•	firestore.indexes.json – Indexing setup for queries
	•	.env – Firebase credentials and environment variables (for backend)
```

---

##  Key Features

###  Student
- View profile, attendance, tasks, announcements
- Upload assignments and view timetable
- Role-based dashboard

###  Faculty
- Post announcements
- View student profiles and submissions
- Manage attendance

###  Parent
- Access student profile, announcements
- View faculty contacts
-  **Live location tracking (partially implemented)**

---

##  Authentication

- Firebase Authentication with role-based access:
  - Student
  - Faculty
  - Parent

---

##  How to Run the Project (Local Setup)

###  Prerequisites

- Node.js (v16+)
- Firebase project setup (Auth + Firestore)
- Git

---

###  Backend Setup

```bash
cd backend
npm install
npm run dev
```
Backend server runs on http://localhost:5000
 .env and Firebase Admin SDK are already included.

⸻

📱 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173
 Firebase config is already present in firebase.ts.

⸻

##  Tech Stack

| Layer          | Technology                |
|----------------|---------------------------|
| Frontend       | React + Vite + Tailwind   |
| Backend        | Node.js + Express.js      |
| Authentication | Firebase Auth             |
| Database       | Firebase Firestore        |
| Maps           | Google Maps API           |
| Styling        | Tailwind CSS              |



⸻

 Known Limitations
	•	Parent-student location sync is partially working
	•	APK generation is in progress via EAS build / Expo config
	•	No cloud hosting or Play Store deployment yet

⸻

##  Team Members & Contributions

| Name                | Roll No       | Contributions                                    |
|---------------------|---------------|--------------------------------------------------|
| Kasoju Aravind      | SE22UCSE131   | Firebase Auth, fullstack integration, APK generation |
| P.K.L. Ganesh       | SE22UCSE197   | Student UI, navigation, layout screens           |
| A. Sai Rohan        | SE22UCSE039   | Auth APIs, announcement logic, backend integration |
| Tanush              | SE22UCSE242   | UI/UX designs and Figma wireframes              |
| Sai Snigdha         | SE22UCSE233   | QA testing: login, dashboard, announcements     |
| Pavan Tejas Marri   | SE22UCSE202   | Backend: attendance and Firestore operations    |
| Koushik             | SE22UCSE057   | Deployment setup, GitHub config                 |
| Rithvik             | SE22UCSE210   | QA: Parent module testing and bug reports       |



⸻

##  Project Status

| Feature                        | Status        |
|--------------------------------|---------------|
| Student & Faculty Modules      |  Complete    |
| Parent Module UI               |  Complete    |
| Parent-Student Location Tracking |  Partial     |
| GitHub Push                    |  Done        |
| APK Build                      |  In Progress |



⸻

 Contact

[Kasoju Aravind]
 se22ucse131@mahindrauniversity.edu.in

⸻



