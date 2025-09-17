const request = require("supertest");
const express = require("express");
const loginRoutes = require("../routes/loginRoutes");

jest.mock("../models/user");
const User = require("../models/user");

jest.mock("bcrypt");
const bcrypt = require("bcrypt");

jest.mock("../services/generateToken");
const { createSecretToken } = require("../services/generateToken");

const app = express();
app.use(express.json());
app.use("/", loginRoutes);

describe("Login API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST /login - should return 400 if fields are missing", async () => {
    const res = await request(app).post("/login").send({ email: "" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Tous les champs sont obligatoires" });
  });

  it("POST /login - should return 400 if user not found", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/login")
      .send({ email: "test@email.com", password: "pass" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Email ou mot de passe incorrect" });
  });

  it("POST /login - should return 400 if password is invalid", async () => {
    User.findOne.mockResolvedValue({ email: "test@email.com", password: "hashedpass" });
    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .post("/login")
      .send({ email: "test@email.com", password: "wrongpass" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Email ou mot de passe incorrect" });
  });

  it("POST /login - should return token if login successful", async () => {
    const mockUser = { _id: "user123", email: "test@email.com", password: "hashedpass" };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    createSecretToken.mockReturnValue("fake-jwt-token");

    const res = await request(app)
      .post("/login")
      .send({ email: "test@email.com", password: "correctpass" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ token: "fake-jwt-token" });

    expect(createSecretToken).toHaveBeenCalledWith(mockUser._id);
  });

  it("POST /login - should return 500 on server error", async () => {
    User.findOne.mockRejectedValue(new Error("DB crash"));

    const res = await request(app)
      .post("/login")
      .send({ email: "test@email.com", password: "any" });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: "Erreur serveur" });
  });
});
