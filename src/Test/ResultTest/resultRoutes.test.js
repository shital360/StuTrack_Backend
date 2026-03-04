import request from "supertest";
import app from "../../../app.js";
import { sequelize } from "../../../Database/db.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Result Routes Test", () => {

  it("GET /api/results should return 200", async () => {
    const res = await request(app).get("/api/results");
    expect(res.statusCode).toBe(200);
  });

  it("POST /api/results should return 200 or 201", async () => {
    const res = await request(app)
      .post("/api/results")
      .send({
        studentName: "Ram",
        subject: "Math",
        marks: 85,
      });
    expect([200, 201]).toContain(res.statusCode);
  });

  it("GET /api/results/:id should return 200", async () => {
    const res = await request(app).get("/api/results/1");
    expect(res.statusCode).toBe(200);
  });

  it("PUT /api/results/:id should return 200", async () => {
    const res = await request(app)
      .put("/api/results/1")
      .send({ marks: 90 });
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /api/results/:id should return 200", async () => {
    const res = await request(app).delete("/api/results/1");
    expect(res.statusCode).toBe(200);
  });

  it("GET /api/results/invalid should return 404", async () => {
    const res = await request(app).get("/api/results/99999");
    expect(res.statusCode).toBe(404);
  });

});