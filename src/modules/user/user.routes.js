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
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lister les utilisateurs (Admin uniquement)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [ADMIN, CLIENT, CHAUFFEUR]
 *         description: Filtrer par rôle
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filtrer par statut d'activité
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche par nom, prénom ou email
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée
 *       403:
 *         description: Accès interdit
 */
router.get("/", authenticate, authorize("ADMIN"), controller.listUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Détails d'un utilisateur (Admin uniquement)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur introuvable
 */
router.get("/:id", authenticate, authorize("ADMIN"), controller.getUser);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer un utilisateur (Admin uniquement)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, nom, prenom, telephone]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               nom: { type: string }
 *               prenom: { type: string }
 *               telephone: { type: string }
 *               role: { type: string, enum: [CLIENT, CHAUFFEUR, ADMIN] }
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Données invalides ou utilisateur existant
 */
router.post("/", authenticate, authorize("ADMIN"), controller.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Mettre à jour un utilisateur (Admin uniquement)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *               nom: { type: string }
 *               prenom: { type: string }
 *               telephone: { type: string }
 *               role: { type: string, enum: [CLIENT, CHAUFFEUR, ADMIN] }
 *               isActive: { type: boolean }
 *               isApproved: { type: boolean }
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       400:
 *         description: Erreur lors de la mise à jour
 */
router.patch("/:id", authenticate, authorize("ADMIN"), controller.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur (Admin uniquement)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       400:
 *         description: Erreur lors de la suppression
 */
router.delete("/:id", authenticate, authorize("ADMIN"), controller.deleteUser);

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