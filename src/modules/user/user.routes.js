const express = require("express");
const router = express.Router();
const controller = require("./user.controller");
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
 */

router.put("/approve/:id", controller.approveDriver);
module.exports = router;