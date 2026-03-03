export const login = async (req, res) => {
  try {
    const { userType, rollNumber, email, password } = req.body;

    if (userType === "Student") {
      const students = [
        { rollNumber: "1", name: "Ram Sharma",     class: "10", section: "A", email: "ram@student.com" },
        { rollNumber: "2", name: "Sita Thapa",     class: "10", section: "A", email: "sita@student.com" },
        { rollNumber: "3", name: "Hari Karki",     class: "10", section: "B", email: "hari@student.com" },
        { rollNumber: "4", name: "Gita Bhandari",  class: "9",  section: "A", email: "gita@student.com" },
        { rollNumber: "5", name: "Krishna Poudel", class: "9",  section: "B", email: "krishna@student.com" },
      ];

      if (!rollNumber) {
        return res.json({ success: false, message: "Please enter roll number" });
      }

      const student = students.find(s => s.rollNumber === rollNumber.toString());

      if (student) {
        return res.json({
          success: true,
          message: "Login successful",
          user: {
            id: student.rollNumber,
            name: student.name,
            rollNumber: student.rollNumber,
            class: student.class,
            section: student.section,
            email: student.email,
          },
          role: "student",
          redirect: "/student/dashboard",
        });
      } else {
        return res.json({ success: false, message: "Invalid roll number" });
      }
    }

    else if (userType === "Admin") {
      if (!email || !password) {
        return res.json({ success: false, message: "Please enter email and password" });
      }

      if (email === "admin@gmail.com" && password === "admin123") {
        return res.json({
          success: true,
          message: "Login successful",
          user: { email: email, name: "Admin" },
          role: "admin",
          redirect: "/admin/dashboard",
        });
      } else {
        return res.json({ success: false, message: "Invalid email or password" });
      }
    }

    else {
      return res.json({ success: false, message: "Invalid user type selected" });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export const register = async (req, res) => {
  try {
    const { userType, name, email, password, rollNumber } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all required fields" });
    }
    res.json({ success: true, message: "Registration successful! Please login.", user: { name, email, userType } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed." });
  }
};

export const logout = async (req, res) => {
  try {
    res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Logout failed" });
  }
};