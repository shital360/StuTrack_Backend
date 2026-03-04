import request from "supertest";
import app from "../../../app.js";
import { sequelize } from "../../../Database/db.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Result Controller Test", () => {

  it("GET /api/results should return 200", async () => {
    const res = await request(app).get("/api/results");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("POST /api/results should create result", async () => {
    const res = await request(app)
      .post("/api/results")
      .send({
        studentId: 1,
        subject: "Math",
        marks: 85,
        grade: "A"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("GET /api/results/:id should return result", async () => {
    const res = await request(app).get("/api/results/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("PUT /api/results/:id should update result", async () => {
    const res = await request(app)
      .put("/api/results/1")
      .send({ marks: 90, grade: "A+" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it("DELETE /api/results/:id should delete result", async () => {
    const res = await request(app).delete("/api/results/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

});