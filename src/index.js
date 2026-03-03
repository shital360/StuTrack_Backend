import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));
app.use(express.json());

app.use("/students", studentRoutes);

app.post("/api/auth/login", (req, res) => {
  const { userType, email, password, rollNumber } = req.body;
  console.log("LOGIN HIT:", userType, email, rollNumber);

  if (userType === "Admin") {
    if (email === "admin@gmail.com" && password === "admin123") {
      return res.json({ success: true, message: "Login successful", user: { email, name: "Admin" }, role: "admin" });
    }
    return res.json({ success: false, message: "Invalid credentials" });
  }

  if (userType === "Student") {
    const students = [
      { rollNumber: "1", name: "Ram Sharma" },
      { rollNumber: "2", name: "Sita Thapa" },
      { rollNumber: "3", name: "Hari Karki" },
      { rollNumber: "4", name: "Gita Bhandari" },
      { rollNumber: "5", name: "Krishna Poudel" },
    ];
    const student = students.find(s => s.rollNumber === rollNumber?.toString());
    if (student) {
      return res.json({ success: true, message: "Login successful", user: { rollNumber: student.rollNumber, name: student.name }, role: "student" });
    }
    return res.json({ success: false, message: "Invalid roll number" });
  }

  return res.json({ success: false, message: "Invalid user type" });
});

app.get("/seed", async (req, res) => {
  try {
    const Student = (await import("./Model/Student.js")).default;
    await Student.sync({ force: true });
    await Student.bulkCreate([
      { rollNo: "1", name: "Ram Sharma",   className: "10", email: "ram@example.com",  attendance: "85%", results: { Math: 85, Science: 90, English: 78, Nepali: 88, Social: 82 } },
      { rollNo: "2", name: "Sita Thapa",   className: "10", email: "sita@example.com", attendance: "92%", results: { Math: 92, Science: 88, English: 85, Nepali: 90, Social: 87 } },
      { rollNo: "3", name: "Hari Koirala", className: "10", email: "hari@example.com", attendance: "88%", results: { Math: 78, Science: 82, English: 80, Nepali: 85, Social: 79 } },
    ]);
    res.json({ success: true, message: "3 students added successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("✅ StuTrack Server is running!");
});

const startServer = async () => {
  try {
    await connection();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();