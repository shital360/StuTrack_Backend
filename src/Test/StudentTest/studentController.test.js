import request from "supertest";
import app from "../../index.js";   // ✅ FIXED PATH

describe("Student Controller", () => {

  it("GET /api/students should respond", async () => {
    const res = await request(app).get("/api/students");
    expect(res.statusCode).toBe(200);
  });

});