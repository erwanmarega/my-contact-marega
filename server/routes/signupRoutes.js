const express = require("express");
const router = express.Router();
const signupController = require("../controllers/signupController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jean Dupont
 *               email:
 *                 type: string
 *                 example: jean.dupont@email.com
 *               password:
 *                 type: string
 *                 example: motdepasse123
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 64f4c2e5a1234b
 *                 name:
 *                   type: string
 *                   example: Jean Dupont
 *                 email:
 *                   type: string
 *                   example: jean.dupont@email.com
 *       400:
 *         description: Données invalides ou utilisateur déjà existant
 *       500:
 *         description: Erreur serveur
 */
router.post("/signup", signupController.signup);

module.exports = router;
