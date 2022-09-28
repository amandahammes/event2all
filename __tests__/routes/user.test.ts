import app from "../../src/app";
import request from "supertest";
import { AppDataSource } from "../../src/datasource";

const randomstring = (Math.random() + 1).toString(36).substring(7);
var token = "";

beforeAll(async () => {
  await AppDataSource.initialize();
  const response = await request(app).post("/login").send({
    "email": "bob2@gmail.com",
    "password": "1234",
  });
  token = response.body.token;
});

afterAll(() => {
  AppDataSource.destroy();
});

describe("users route tests", () => {
  /* test("create user", async () => {
    await request(app)
      .post("/user")
      .send({
        name: randomstring,
        email: randomstring + "@teste.com",
        password: "123456"
      })
      .expect(201);
  });

  test("create user with password length lass then 5 digits", async () => {
    await request(app)
      .post("/user")
      .send({
        name: randomstring,
        email: randomstring + "B" + "@teste.com",
        password: "123"
      })
      .expect(400);
  });

  test("create user email already exist", async () => {
    await request(app)
      .post("/user")
      .send({
        name: randomstring,
        email: "bob2@gmail.com",
        password: "123456"
      })
      .expect(409);
  }); */

  test("edit user", async () => {
    await request(app)
      .put("/user/1")
      .send({
        name: "editedtest"
      })
      .set("auth", token)
      .expect(204);
  });
  test("edit user same email", async () => {
    await request(app)
      .put("/user/1")
      .send({
        email: "bob2@gmail.com"
      })
      .set("auth", token)
      .expect(409);
  });

  /* test("fail edit user, incorrect token", async () => {
    await request(app)
      .put("/user/1")
      .send({
        name: "editedtest",
      })
      .set("Authorization", "tokenIncorrect")
      .expect(401);
  }); */
});
