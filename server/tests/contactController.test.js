const request = require('supertest');
const express = require('express');
const contactRoutes = require('../routes/contactRoutes');

jest.mock("../models/contact");
const Contact = require("../models/contact");

jest.mock("../middleware/middlewareLogin", () => (req, res, next) => {
  req.user = { _id: "user123" }; 
  next();
});

const app = express();
app.use(express.json());
app.use("/", contactRoutes);

const mockUserId = 'user123';

describe("Contact API" , () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("GET /contacts - should return contacts of the user", async () => {
    const mockContacts = [{ name: "Alice", user: mockUserId }];
    Contact.find.mockResolvedValue(mockContacts);

    const res = await request(app).get("/contacts");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockContacts);
    expect(Contact.find).toHaveBeenCalledWith({ user: mockUserId });
  });

  it("POST /contacts - should create a new contact", async () => {
    const newContact = { name: "Bob", user: mockUserId };
  
    Contact.mockImplementation(() => ({
      ...newContact,
      save: jest.fn().mockResolvedValue(newContact),
    }));
  
    const res = await request(app)
      .post("/contacts")
      .send({ name: "Bob" });
  
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject(newContact);
  });

  it("PATCH /contacts/:id - should update a contact", async () => {
    const updatedContact = { _id: "1", name: "Updated", user: mockUserId };
    Contact.findOneAndUpdate.mockResolvedValue(updatedContact);

    const res = await request(app)
      .patch("/contacts/1")
      .send({ name: "Updated" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(updatedContact);
    expect(Contact.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "1", user: mockUserId },
      { name: "Updated" },
      { new: true }
    );
  });

  it("PATCH /contacts/:id - should return 404 if contact not found", async () => {
    Contact.findOneAndUpdate.mockResolvedValue(null);

    const res = await request(app)
      .patch("/contacts/999")
      .send({ name: "Updated" });

    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Contact non trouvé" });
  });

  it("DELETE /contacts/:id - should delete a contact", async () => {
    Contact.findOneAndDelete.mockResolvedValue({ _id: "1", user: mockUserId });

    const res = await request(app).delete("/contacts/1");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Contact supprimé" });
  });

  it("DELETE /contacts/:id - should return 404 if contact not found", async () => {
    Contact.findOneAndDelete.mockResolvedValue(null);

    const res = await request(app).delete("/contacts/999");
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: "Contact non trouvé" });
  });
});
