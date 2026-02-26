
export const login = async (req, res) => {
  try {
    const { userType, rollNumber, email, password } = req.body;
    
    console.log("=== LOGIN DEBUG ===");
    console.log("User Type:", userType);
    console.log("Roll Number:", rollNumber);
    console.log("Email:", email);
    console.log("Password:", password ? "***" : "Not provided");
    console.log("==================");

   
    if (userType === "Student") {
     
      const students = [
        { 
          rollNumber: "1", 
          name: "Ram Sharma", 
          class: "10",
          section: "A",
          email: "ram@student.com"
        },
        { 
          rollNumber: "2", 
          name: "Sita Thapa", 
          class: "10",
          section: "A",
          email: "sita@student.com"
        },
        { 
          rollNumber: "3", 
          name: "Hari Karki", 
          class: "10",
          section: "B",
          email: "hari@student.com"
        },
        { 
          rollNumber: "4", 
          name: "Gita Bhandari", 
          class: "9",
          section: "A",
          email: "gita@student.com"
        },
        { 
          rollNumber: "5", 
          name: "Krishna Poudel", 
          class: "9",
          section: "B",
          email: "krishna@student.com"
        }
      ];

      if (!rollNumber) {
        console.log("❌ Roll number not provided");
        return res.json({ 
          success: false, 
          message: "Please enter roll number" 
        });
      }

   
      const student = students.find(s => s.rollNumber === rollNumber.toString());

      if (student) {
        console.log("✅ STUDENT LOGIN SUCCESS");
        console.log("Student found:", student.name);
        return res.json({ 
          success: true, 
          message: "Login successful",
          user: {
            id: student.rollNumber,
            name: student.name,
            rollNumber: student.rollNumber,
            class: student.class,
            section: student.section,
            email: student.email
          },
          role: "student",
          redirect: "/student/dashboard"
        });
      } else {
        console.log("❌ INVALID ROLL NUMBER:", rollNumber);
        return res.json({ 
          success: false, 
          message: "Invalid roll number" 
        });
      }
    }

    else if (userType === "Admin") {
     
      if (!email || !password) {
        console.log("❌ Email or password not provided");
        return res.json({ 
          success: false, 
          message: "Please enter email and password" 
        });
      }

      
      const adminCredentials = {
        email: "admin@gmail.com",
        password: "adminl123",
        name: "Admin"
      };

      if (email === adminCredentials.email && password === adminCredentials.password) {
        console.log("✅ ADMIN LOGIN SUCCESS");
        return res.json({ 
          success: true, 
          message: "Login successful",
          user: { 
            email: email,
            name: adminCredentials.name
          },
          role: "admin",
          redirect: "/admin/dashboard"
        });
      } else {
        console.log("❌ INVALID ADMIN CREDENTIALS");
        return res.json({ 
          success: false, 
          message: "Invalid email or password" 
        });
      }
    }

    // ==========================================
    // TEACHER LOGIN
    // ==========================================
    else if (userType === "Teacher") {
      // Hardcoded teachers for testing
      const teachers = [
        { 
          id: "T001", 
          name: "Ramesh Adhikari", 
          email: "ramesh@teacher.com",
          password: "teacher123",
          subject: "Mathematics"
        },
        { 
          id: "T002", 
          name: "Sunita Sharma", 
          email: "sunita@teacher.com",
          password: "teacher123",
          subject: "Science"
        }
      ];

      if (!email || !password) {
        console.log("❌ Email or password not provided");
        return res.json({ 
          success: false, 
          message: "Please enter email and password" 
        });
      }

      const teacher = teachers.find(t => t.email === email && t.password === password);

      if (teacher) {
        console.log("✅ TEACHER LOGIN SUCCESS");
        return res.json({ 
          success: true, 
          message: "Login successful",
          user: {
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            subject: teacher.subject
          },
          role: "teacher",
          redirect: "/teacher/dashboard"
        });
      } else {
        console.log("❌ INVALID TEACHER CREDENTIALS");
        return res.json({ 
          success: false, 
          message: "Invalid email or password" 
        });
      }
    }

    // ==========================================
    // INVALID USER TYPE
    // ==========================================
    else {
      console.log("❌ INVALID USER TYPE:", userType);
      return res.json({ 
        success: false, 
        message: "Invalid user type selected" 
      });
    }

  } catch (error) {
    console.error("❌ LOGIN ERROR:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error. Please try again later." 
    });
  }
};

// ==========================================
// REGISTER CONTROLLER
// ==========================================
export const register = async (req, res) => {
  try {
    const { userType, name, email, password, rollNumber, className, section } = req.body;
    
    console.log("=== REGISTER DEBUG ===");
    console.log("User Type:", userType);
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Roll Number:", rollNumber);
    console.log("=====================");

    // Validation
    if (!name || !email || !password) {
      return res.json({ 
        success: false, 
        message: "Please fill all required fields" 
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.json({ 
        success: false, 
        message: "Invalid email format" 
      });
    }

    // Password length validation
    if (password.length < 6) {
      return res.json({ 
        success: false, 
        message: "Password must be at least 6 characters" 
      });
    }

    // Student-specific validation
    if (userType === "Student" && !rollNumber) {
      return res.json({ 
        success: false, 
        message: "Roll number is required for students" 
      });
    }

    // TODO: Save to database
    // const newUser = await User.create({ ... });

    console.log("✅ REGISTRATION SUCCESS");
    res.json({ 
      success: true, 
      message: "Registration successful! Please login.",
      user: {
        name: name,
        email: email,
        userType: userType
      }
    });

  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);
    res.status(500).json({ 
      success: false, 
      message: "Registration failed. Please try again." 
    });
  }
};

// ==========================================
// LOGOUT CONTROLLER
// ==========================================
export const logout = async (req, res) => {
  try {
    // TODO: Clear session/token
    console.log("✅ LOGOUT SUCCESS");
    res.json({ 
      success: true, 
      message: "Logged out successfully" 
    });
  } catch (error) {
    console.error("❌ LOGOUT ERROR:", error);
    res.status(500).json({ 
      success: false, 
      message: "Logout failed" 
    });
  }
};