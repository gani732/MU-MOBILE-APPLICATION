# Software Design Document (SDD)

##  System Architecture

###  High-Level Architecture
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Mobile    │     │   Backend   │     │  Firebase   │
│    App      │◄───►│   Server    │◄───►│  Services   │
└─────────────┘     └─────────────┘     └─────────────┘
      ▲                    ▲                    ▲
      │                    │                    │
      ▼                    ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Offline   │     │   Redis     │     │  Cloud      │
│   Storage   │     │   Cache     │     │  Storage    │
└─────────────┘     └─────────────┘     └─────────────┘
```



## 1. Introduction

MU Connect is a role-based mobile application developed for Mahindra University to enhance communication between students, faculty, and parents. The app supports features like real-time announcements, task submissions, attendance tracking, profile management, and GPS-based student location tracking (partially implemented).

### 1.1 Purpose

This document outlines the software design of MU Connect, acting as a technical reference for developers, testers, and academic stakeholders.

### 1.2 Scope

MU Connect provides three interfaces:
	•	Students: Task submission, announcements, attendance view
	•	Faculty: Post announcements, manage attendance, review tasks
	•	Parents: View student information, announcements, and GPS-based tracking (partially complete)

### 1.3 Acronyms
	•	MU – Mahindra University
	•	GPS – Global Positioning System
	•	JWT – JSON Web Token
	•	API – Application Programming Interface

### 1.4 References
	•	Firebase Documentation
	•	React Native + Vite Docs
	•	Google Maps API
	•	IEEE 830 SRS Specification

⸻

## 2. Use Case View

| Use Case ID | Description                    | Actor            |
|-------------|--------------------------------|------------------|
| UC1         | Role-based login               | All Users        |
| UC2         | View announcements             | Student, Parent  |
| UC3         | Post announcements             | Faculty          |
| UC4         | Upload assignment              | Student          |
| UC5         | Manage attendance              | Faculty          |
| UC6         | View child’s info and location | Parent           |



⸻

## 3. Design Overview

### 3.1 Design Goals
	•	Easy and secure access to academic data
	•	Role-specific dashboards
	•	Real-time data using Firebase
	•	Modular backend and frontend separation

### 3.2 Assumptions
	•	App runs on internet-enabled smartphones
	•	Firebase Auth handles authentication
	•	Users belong to Mahindra University

### 3.3 Key Design Modules
	•	Authentication Module – Login, role-based redirection
	•	Announcements Module – Post, view, and filter updates
	•	Student Module – Upload tasks, view attendance
	•	Faculty Module – Assignments, announcements, attendance
	•	Parent Module – View student info, receive notifications
	•	Location Module – Partial GPS tracking using Maps API

⸻

## 4. Logical View

### 4.1 Frontend Structure (React Native + Vite)

/src
  /components/
    /student
    /faculty
    /parent
  /screens/
    Login, Dashboard, Profile, Submissions
  /services/
    firebase.ts, api.ts
  /navigation/
    AppRoutes.tsx
  /store/
    authSlice.ts, locationSlice.ts

### 4.2 Backend Structure (Node.js + Express)

/backend
  /routes/
    auth.js, announcements.js, students.js
  /services/
    authService.js, announcementService.js
  /middleware/
    checkAuth.js



⸻

## 5. Data View

### 5.1 Firestore Collections


| Collection    | Description                              |
|---------------|------------------------------------------|
| users         | Profile info and roles                   |
| announcements | University-wide or filtered messages     |
| tasks         | Assignment uploads                       |
| attendance    | Daily presence data                      |
| location      | GPS updates from student device          |

### 5.2 Sample Data Schema

interface User {
  id: string;
  email: string;
  role: 'student' | 'faculty' | 'parent';
  profile: {
    name: string;
    department?: string;
    studentId?: string;
  };
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  author: string;
  targetAudience: string[];
  timestamp: Date;
}

interface Location {
  userId: string;
  lat: number;
  lon: number;
  timestamp: Date;
}



⸻

## 6. Exception Handling
	•	🔒 Login Failure → “Invalid credentials”
	•	📡 Location Fetch Error → “Location unavailable”
	•	🚫 File Upload Error → “Unsupported format or file too large”
	•	🌐 No Internet → “Connection error. Please retry”

⸻

## 7. Configurable Parameters

| Parameter                | Description                      | File               |
|--------------------------|----------------------------------|--------------------|
| FIREBASE_API_KEY         | Firebase service key             | .env (frontend)    |
| GOOGLE_MAPS_API_KEY      | Location services                | .env (frontend)    |
| JWT Expiry               | Session timeout for auth         | Backend config     |
| Location Polling Interval| Frequency of location updates    | Location service   |



⸻

## 8. Quality of Service

### 8.1 Availability
	•	99.9% uptime with Firebase infrastructure
	•	Node.js backend deployed locally (Render-ready)

### 8.2 Security
	•	Role-based access control
	•	AES-256 encryption for data at rest
	•	Firebase Auth with token-based validation

### 8.3 Performance
	•	App load time: < 2 seconds
	•	Notifications: < 1 second
	•	Data sync: Firestore real-time listener

### 8.4 Maintainability
	•	Modular architecture
	•	Redux Toolkit for predictable state
	•	Documented API and components

⸻

## 9. Contributors

| Name                | Role                          |
|---------------------|-------------------------------|
| Kasoju Aravind      | Project Lead, Backend & Auth  |
| P.K.L. Ganesh       | Frontend & Student UI         |
| A. Sai Rohan        | Backend APIs                  |
| Tanush              | UI/UX Design                  |
| Sai Snigdha         | QA Tester                     |
| Pavan Tejas Marri   | Attendance Logic, Backend     |
| Koushik             | GitHub Deployment Setup       |
| Rithvik             | QA (Parent Module)            |



⸻
