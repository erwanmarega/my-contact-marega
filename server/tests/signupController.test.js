const request = require('supertest');
const express = require('express');
const signupRoutes = require('../routes/signupRoutes');

jest.mock("../models/user");
const User = require("../models/user");

jest.mock("../services/generateToken", () => ({
  createSecretToken: jest.fn(() => "mockedToken"),
}));

const bcrypt = require("bcrypt");
jest.mock("bcrypt");

const app = express();
app.use(express.json());
app.use("/", signupRoutes);

describe("Signup API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("POST /signup - should return 400 if fields are missing", async () => {
    const res = await request(app).post("/signup").send({ email: "a@test.com" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Tous les champs sont obligatoires" });
  });

  it("POST /signup - should return 400 if passwords do not match", async () => {
    const res = await request(app).post("/signup").send({
      email: "a@test.com",
      password: "123",
      confirmPassword: "456",
      phone: "0101010101",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Les mots de passe ne correspondent pas" });
  });

  it("POST /signup - should return 400 if user already exists", async () => {
    User.findOne.mockResolvedValue({ email: "a@test.com" });
    const res = await request(app).post("/signup").send({
      email: "a@test.com",
      password: "123",
      confirmPassword: "123",
      phone: "0101010101",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ message: "Un compte avec cet email existe déjà" });
  });

  it("POST /signup - should create a new user", async () => {
    User.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue("hashedPassword");
    const newUser = { _id: "1", email: "a@test.com", phone: "0101010101", password: "hashedPassword" };
    User.create.mockResolvedValue(newUser);

    const res = await request(app).post("/signup").send({
      email: "a@test.com",
      password: "123",
      confirmPassword: "123",
      phone: "0101010101",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(newUser);
  });

  it("POST /signup - should return 500 on server error", async () => {
    User.findOne.mockRejectedValue(new Error("DB crash"));

    const res = await request(app).post("/signup").send({
      email: "a@test.com",
      password: "123",
      confirmPassword: "123",
      phone: "0101010101",
    });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: "Erreur serveur" });
  });
});
 