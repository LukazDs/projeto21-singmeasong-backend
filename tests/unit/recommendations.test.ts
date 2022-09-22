import st from "supertest";
import app from "../../src/app";

describe("Teste inicial", () => {
  it("teste", async () => {
    const result = await st(app).get("/recommendations/");
    expect(result.body).toBe([]);
  });
});
