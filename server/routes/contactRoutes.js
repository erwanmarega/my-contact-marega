const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/middlewareLogin");
const contactController = require("../controllers/contactController");

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Gestion des contacts
 */

router.get("/contacts", authMiddleware, contactController.getContacts);
router.post("/contacts", authMiddleware, contactController.createContact);
router.patch("/contacts/:id", authMiddleware, contactController.updateContact);
router.delete("/contacts/:id", authMiddleware, contactController.deleteContact);

module.exports = router;
