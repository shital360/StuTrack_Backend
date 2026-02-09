import { connection } from "./Database/db.js";
import Student from "./Model/Student.js";

const students = [
  {
    rollNo: "1",
    name: "Ram Sharma",
    className: "10",
    email: "ram@example.com",
    attendance: "85%",
    results: {
      Math: 85,
      Science: 90,
      English: 78,
      Nepali: 88,
      Social: 82
    }
  },
  {
    rollNo: "2",
    name: "Sita Thapa",
    className: "10",
    email: "sita@example.com",
    attendance: "92%",
    results: {
      Math: 92,
      Science: 88,
      English: 85,
      Nepali: 90,
      Social: 87
    }
  },
  {
    rollNo: "3",
    name: "Hari Koirala",
    className: "10",
    email: "hari@example.com",
    attendance: "88%",
    results: {
      Math: 78,
      Science: 82,
      English: 80,
      Nepali: 85,
      Social: 79
    }
  }
];

const seedDB = async () => {
  try {
    await connection();
    console.log('✅ Database connected');
    
    // Sync database (create tables if they don't exist)
    await Student.sync({ force: true });  // ⚠️ WARNING: This drops the table!
    console.log('🗑️  Cleared old students table');
    
    // Insert students
    await Student.bulkCreate(students);
    console.log('✅ 3 Students added successfully!');
    
    console.log('\n📚 Students in database:');
    students.forEach(s => {
      console.log(`   • Roll: ${s.rollNo} - ${s.name} (Class ${s.className})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();