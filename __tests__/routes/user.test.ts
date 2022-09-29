import { User } from "./../../src/entities/User";
import app from "../../src/app";
import request from "supertest";
import { AppDataSource } from "../../src/datasource";

const randomstring = (Math.random() + 1).toString(36).substring(7);
let token = "";

beforeAll(async () => {
  await AppDataSource.initialize();
  const response = await request(app).post("/login").send({
    email: "bob2@gmail.com",
    password: "1234",
  });
  token = response.body.token;
});

afterAll(() => {
  AppDataSource.getRepository(User).clear;
});

/* afterEach(async () => {

  // Fetch all the entities
  const entities = AppDataSource.entityMetadatas;

  for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
  }
}); */

describe("users route tests", () => {

  test("edit user", async () => {
    await request(app)
      .put("/user/1")
      .send({
        name: "editedtest",
      })
      .set("auth", token)
      .expect(204);
  });

  test("edit user same email", async () => {
    await request(app)
      .put("/user/1")
      .send({
        email: "bob2@gmail.com",
      })
      .set("auth", token)
      .expect(409);
  });

  test("fail edit user, incorrect token", async () => {
    await request(app)
      .put("/user/1")
      .send({
        name: "editedtest",
      })
      .set("auth", "tokenIncorrect")
      .expect(401);
  });
});
