import express from "express";
import cors from "cors";
import { connection } from "./Database/db.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/students", studentRoutes);

// Admin Login route
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("🔐 Admin login attempt:", email);

    if (email === "shital@gmail.com" && password === "shital123") {
      res.json({ success: true, message: "Login successful", user: { email } });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ TEMPORARY ROUTE - Database मा Students Add गर्न (काम सकेपछि delete गर्नुहोस्)
app.get("/seed", async (req, res) => {
  try {
    const Student = (await import("./Model/Student.js")).default;
    
    // Clear old students
    await Student.sync({ force: true });
    console.log("🗑️  Cleared old students table");
    
    // Insert new students
    await Student.bulkCreate([
      {
        rollNo: "1",
        name: "Ram Sharma",
        className: "10",
        email: "ram@example.com",
        attendance: "85%",
        results: { Math: 85, Science: 90, English: 78, Nepali: 88, Social: 82 }
      },
      {
        rollNo: "2",
        name: "Sita Thapa",
        className: "10",
        email: "sita@example.com",
        attendance: "92%",
        results: { Math: 92, Science: 88, English: 85, Nepali: 90, Social: 87 }
      },
      {
        rollNo: "3",
        name: "Hari Koirala",
        className: "10",
        email: "hari@example.com",
        attendance: "88%",
        results: { Math: 78, Science: 82, English: 80, Nepali: 85, Social: 79 }
      }
    ]);
    
    console.log("✅ 3 students added successfully!");
    
    res.json({ 
      success: true, 
      message: "3 students added successfully!",
      students: ["Roll: 1 - Ram Sharma", "Roll: 2 - Sita Thapa", "Roll: 3 - Hari Koirala"]
    });
  } catch (error) {
    console.error("❌ Error seeding database:", error);
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