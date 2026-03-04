import { sequelize } from "../../Database/db.js";
import Student from "../../Model/Student.js";

beforeAll(async () => {
  await sequelize.sync({ force: true }); // fresh test DB
});

afterAll(async () => {
  await sequelize.close();
});

describe("Student Model - Validation Tests", () => {

  // ✅ Valid student
  it("should create a valid student successfully", async () => {
    const student = await Student.create({
      rollNo: "001",
      name: "Ram Bahadur",
      email: "ram@gmail.com",
      className: "Grade 10",
    });

    expect(student.id).toBeDefined();
    expect(student.rollNo).toBe("001");
    expect(student.name).toBe("Ram Bahadur");
    expect(student.className).toBe("Grade 10");
  });

  // ✅ Default values check
  it("should set default attendance as 0%", async () => {
    const student = await Student.create({
      rollNo: "002",
      name: "Sita Kumari",
      className: "Grade 9",
    });

    expect(student.attendance).toBe("0%");
    expect(student.results).toEqual({});
  });

  // ✅ Email optional
  it("should create student without email (allowNull: true)", async () => {
    const student = await Student.create({
      rollNo: "003",
      name: "Hari Prasad",
      className: "Grade 8",
      // email chhaina - huncha
    });

    expect(student.id).toBeDefined();
    expect(student.email).toBeNull();
  });

  // ❌ Missing rollNo
  it("should fail without rollNo (allowNull: false)", async () => {
    let err;
    try {
      await Student.create({
        name: "No Roll",
        className: "Grade 7",
      });
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
    expect(err.name).toBe("SequelizeValidationError");
  });

  // ❌ Missing name
  it("should fail without name (allowNull: false)", async () => {
    let err;
    try {
      await Student.create({
        rollNo: "004",
        className: "Grade 7",
      });
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });

  // ❌ Missing className
  it("should fail without className (allowNull: false)", async () => {
    let err;
    try {
      await Student.create({
        rollNo: "005",
        name: "Some Student",
      });
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
  });

  // ❌ Duplicate rollNo
  it("should fail on duplicate rollNo (unique: true)", async () => {
    let err;
    try {
      await Student.create({
        rollNo: "001", // already exists
        name: "Duplicate",
        className: "Grade 10",
      });
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
    expect(err.name).toBe("SequelizeUniqueConstraintError");
  });

  // ✅ JSON results field
  it("should save results as JSON object", async () => {
    const student = await Student.create({
      rollNo: "006",
      name: "Gita Sharma",
      className: "Grade 10",
      results: { math: "A", science: "B+" },
    });

    expect(student.results).toEqual({ math: "A", science: "B+" });
  });

});