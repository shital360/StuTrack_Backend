import Student from "../Model/Student.js";

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    console.log(`✅ Found ${students.length} students`);
    res.json(students);
  } catch (error) {
    console.error("❌ Error fetching students:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByPk(id);
    
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    
    res.json(student);
  } catch (error) {
    console.error("❌ Error fetching student:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ NEW: Get student by Roll Number (Frontend needs this!)
export const getStudentByRoll = async (req, res) => {
  try {
    const { rollNo } = req.params;
    
    console.log('🔍 Searching for student with roll:', rollNo);
    
    const student = await Student.findOne({ where: { rollNo } });
    
    if (!student) {
      console.log('❌ Student not found');
      return res.status(404).json({ 
        success: false,
        message: "Student not found" 
      });
    }
    
    console.log('✅ Student found:', student.name);
    res.json(student);
  } catch (error) {
    console.error("❌ Error fetching student:", error);
    res.status(500).json({ 
      success: false,
      message: "Server error" 
    });
  }
};

// Create student
export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    console.log('✅ Student created:', student.name);
    res.json({ success: true, message: "Student created", data: student });
  } catch (error) {
    console.error("❌ Error creating student:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Student.update(req.body, { where: { id } });
    
    if (!updated) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    
    const student = await Student.findByPk(id);
    res.json({ success: true, message: "Student updated", data: student });
  } catch (error) {
    console.error("❌ Error updating student:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.destroy({ where: { id } });
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    
    res.json({ success: true, message: "Student deleted" });
  } catch (error) {
    console.error("❌ Error deleting student:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};