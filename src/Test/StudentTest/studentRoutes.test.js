import request from "supertest";
import app from "../../index.js";   // ✅ FIXED PATH

describe("Student Routes", () => {

  it("GET /api/students should return 200", async () => {
    const res = await request(app).get("/api/students");
    expect(res.statusCode).toBe(200);
  });

});