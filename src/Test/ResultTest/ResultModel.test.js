import { sequelize } from "../../Database/db.js";
import { Result } from "../../Model/Result.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Result Model - Validation Tests", () => {

  it("should create a valid result successfully", async () => {
    const result = await Result.create({
      studentId: 1,
      semester: "Fall 2024",
      gpa: 3.8,
      result_file: "result1.pdf",
    });

    expect(result.id).toBeDefined();
    expect(result.studentId).toBe(1);
    expect(result.semester).toBe("Fall 2024");
    expect(result.gpa).toBe(3.8);
    expect(result.result_file).toBe("result1.pdf");
  });

  it("should fail without studentId (NOT NULL constraint)", async () => {
    let err;
    try {
      await Result.create({
        semester: "Spring 2024",
        gpa: 3.5,
      });
    } catch (e) {
      err = e;
    }
    expect(err).toBeDefined();
    expect(err.name).toBe("SequelizeValidationError");
  });

  it("should create result without optional fields", async () => {
    const result = await Result.create({
      studentId: 2,
    });

    expect(result.id).toBeDefined();
    expect(result.studentId).toBe(2);
  });

  it("should create result with gpa only", async () => {
    const result = await Result.create({
      studentId: 3,
      gpa: 2.9,
    });

    expect(result.id).toBeDefined();
    expect(result.gpa).toBe(2.9);
  });

  it("should create multiple results for same studentId", async () => {
    const result1 = await Result.create({
      studentId: 4,
      semester: "Fall 2023",
      gpa: 3.2,
    });

    const result2 = await Result.create({
      studentId: 4,
      semester: "Spring 2024",
      gpa: 3.6,
    });

    expect(result1.id).toBeDefined();
    expect(result2.id).toBeDefined();
    expect(result1.studentId).toBe(result2.studentId);
  });

});