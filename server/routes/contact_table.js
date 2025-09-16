const express = require("express");
const Contact = require("../models/contact");
const authMiddleware = require("../middleware/middlewareLogin");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f4c2e5a1234b
 *         name:
 *           type: string
 *           example: Jean Dupont
 *         email:
 *           type: string
 *           example: jean.dupont@email.com
 *         phone:
 *           type: string
 *           example: "+33 6 12 34 56 78"
 *         user:
 *           type: string
 *           description: ID de l'utilisateur propriétaire
 *     ContactInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           example: Jean Dupont
 *         email:
 *           type: string
 *           example: jean@email.com
 *         phone:
 *           type: string
 *           example: "+33 6 12 34 56 78"
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */



/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des contacts
 */

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Récupère tous les contacts de l'utilisateur connecté
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 */
router.get("/contacts", authMiddleware, async (req, res) => {
  const contacts = await Contact.find({ user: req.user._id });
  res.json(contacts);
});

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Ajoute un nouveau contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 */
router.post("/contacts", authMiddleware, async (req, res) => {
  const newContact = new Contact({ ...req.body, user: req.user._id });
  await newContact.save();
  res.status(201).json(newContact);
});

/**
 * @swagger
 * /contacts/{id}:
 *   patch:
 *     summary: Met à jour un contact existant
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       200:
 *         description: Contact mis à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact non trouvé
 */
router.patch("/contacts/:id", authMiddleware, async (req, res) => {
  const updated = await Contact.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Contact non trouvé" });
  res.json(updated);
});

/**
 * @swagger
 * /contacts/{id}:
 *   delete:
 *     summary: Supprime un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé
 *       404:
 *         description: Contact non trouvé
 */
router.delete("/contacts/:id", authMiddleware, async (req, res) => {
  const deleted = await Contact.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!deleted) return res.status(404).json({ error: "Contact non trouvé" });
  res.json({ message: "Contact supprimé" });
});

module.exports = router;
