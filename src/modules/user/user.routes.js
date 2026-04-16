const express = require("express");
const router = express.Router();
const controller = require("./user.controller");
const authenticate = require("../../middlewares/authenticate");
const authorize = require("../../middlewares/authorize");
/**
 * @swagger
 * tags:
 *   name: User
 *   description: API pour la gestion des utilisateurs
 */
/** 
 *  @swagger
 * /api/users/approve/{id}:
 *   put:
 *     summary: Approuver un chauffeur
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du chauffeur à approuver
 *     responses:
 *       200:
 *         description: Chauffeur approuvé avec succès
 *       400:
 *         description: Erreur lors de l'approbation du chauffeur
 *       401:
 *         description: Token non fourni ou invalide
 *       403:
 *         description: Accès interdit - Rôle admin requis
 */

router.put("/approve/:id", authenticate, authorize("ADMIN"), controller.approveDriver);
module.exports = router;