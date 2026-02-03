// Login controller
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log("Login attempt:", username);

    // Temporary hardcoded check (replace with database later)
    if (username === "shital_1" && password === "password123") {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Register controller
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log("Register attempt:", username);

    // Add registration logic here
    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
};