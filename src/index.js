import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(express.json());

/* ===============================
   IMPORTANT: Match test routes
================================ */
app.use("/api/students", studentRoutes);

/* ===============================
   AUTH LOGIN
================================ */
app.post("/api/auth/login", (req, res) => {
  const { userType, email, password, rollNumber } = req.body;

  // ADMIN LOGIN
  if (userType === "Admin") {
    if (email === "admin@gmail.com" && password === "admin123") {
      return res.json({
        success: true,
        role: "admin",
        user: { name: "Admin", email },
        redirect: "/admin/dashboard"
      });
    }
    return res.json({
      success: false,
      message: "Invalid email or password"
    });
  }

  // STUDENT LOGIN
  if (userType === "Student") {
    if (!rollNumber) {
      return res.json({
        success: false,
        message: "Please enter roll number"
      });
    }

    const students = [
      { rollNumber: "1", name: "Ram Sharma", class: "9", section: "A" },
      { rollNumber: "2", name: "Sita Thapa", class: "9", section: "A" },
      { rollNumber: "3", name: "Hari Karki", class: "9", section: "B" },
      { rollNumber: "4", name: "Gita Bhandari", class: "9", section: "B" }
    ];

    const student = students.find(
      s => s.rollNumber === rollNumber.toString()
    );

    if (student) {
      return res.json({
        success: true,
        role: "student",
        user: student,
        redirect: "/student/dashboard"
      });
    }

    return res.json({
      success: false,
      message: "Invalid roll number"
    });
  }

  return res.json({
    success: false,
    message: "Invalid user type selected"
  });
});

/* ===============================
   ROOT
================================ */
app.get("/", (req, res) => {
  res.send("StuTrack Server Running");
});

/* ===============================
   EXPORT FOR JEST
================================ */
export default app;

/* ===============================
   START SERVER ONLY IF NOT TEST
================================ */
if (process.env.NODE_ENV !== "test") {
  const PORT = 5000;

  const startServer = async () => {
    try {
      await connection();
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
    }
  };

  startServer();
}