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
app.use("/api/students", studentRoutes);

// Login route
app.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;  // ✅ CHANGE: username → email
    
    console.log("Login attempt:", email);

    // ✅ CHANGE: shital_1 → shital@gmail.com
    if (email === "shital@gmail.com" && password === "shital123") {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const startServer = async () => {
  try {
    await connection();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();