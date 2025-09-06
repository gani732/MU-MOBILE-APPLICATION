import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import assignmentRoutes from "./routes/assignments";
import announcementRoutes from "./routes/announcements";
import attendanceRoutes from "./routes/attendance";
import './config/firebase'; // Initialize Firebase

const app = express();

// Configure CORS
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mahindra Uni Connect API" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/attendance", attendanceRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
