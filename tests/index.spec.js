import app from "../src/app.js";
import request from "supertest";

describe("GET /tasks", () => {
  test("should return 200 ok", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.statusCode).toBe(200);
  });

  test("should return an array", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /tasks", () => {
  describe("when the request body is valid", () => {
    const task = {
      title: "Test",
      description: "Test description",
    };

    test("should return 200 ok", async () => {
      const response = await request(app).post("/tasks").send(task);
      expect(response.statusCode).toBe(200);
    });

    test("should have a content-tupe: application/json in header", async () => {
      const response = await request(app).post("/tasks").send(task);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should return task ID", async () => {
      const response = await request(app).post("/tasks").send(task);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("when the request body is invalid", () => {
    test("should return 400 bad request", async () => {
      const fields = [
        {},
        { title: "test title" },
        { description: "test Description" },
        { title: "", description: "" },
      ];

      for (const body of fields) {
        const response = await request(app).post("/tasks").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
