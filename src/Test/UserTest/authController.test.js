import request from "supertest";
import app from "../../index.js";   // ✅ FIXED PATH

describe("Auth Controller", () => {

  it("POST /api/auth/login should respond", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        userType: "Admin",
        email: "admin@gmail.com",
        password: "admin123"
      });

    expect(res.statusCode).toBe(200);
  });

});