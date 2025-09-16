const Contact = require("../models/contact");

exports.getContacts = async (req, res) => {
  const contacts = await Contact.find({ user: req.user._id });
  res.json(contacts);
};

exports.createContact = async (req, res) => {
  const newContact = new Contact({ ...req.body, user: req.user._id });
  await newContact.save();
  res.status(201).json(newContact);
};

exports.updateContact = async (req, res) => {
  const updated = await Contact.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Contact non trouvé" });
  res.json(updated);
};

exports.deleteContact = async (req, res) => {
  const deleted = await Contact.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deleted) return res.status(404).json({ error: "Contact non trouvé" });
  res.json({ message: "Contact supprimé" });
};
