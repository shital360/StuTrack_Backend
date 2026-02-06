// authController.js

// Login controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("=== LOGIN DEBUG ===");
    console.log("Received email:", email);
    console.log("Received password:", password);
    console.log("Expected email:", "shital@gmail.com");
    console.log("Expected password:", "shital123");
    console.log("==================");

    // Temporary hardcoded check
    if (email === "shital@gmail.com" && password === "shital123") {
      console.log("✅ LOGIN SUCCESS");
      return res.json({ 
        success: true, 
        message: "Login successful",
        user: { email: email }
      });
    } else {
      console.log("❌ LOGIN FAILED");
      return res.json({ 
        success: false, 
        message: "Invalid credentials" 
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};

// Register controller
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("Register attempt:", email);

    res.json({ 
      success: true, 
      message: "User registered successfully" 
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Registration failed" 
    });
  }
};