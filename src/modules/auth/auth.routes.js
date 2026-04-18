const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API pour l'authentification des utilisateurs
 */
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Inscription utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               telephone:
 *                 type: string
 *               role:
 *                type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post("/register", controller.register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 */    
router.post("/login", controller.login);
/**
 * @swagger
 * /api/auth/login-admin:
 *   post:
 *     summary: Connexion admin (interface web uniquement)
 *     description: Seuls les utilisateurs avec le rôle ADMIN peuvent se connecter via cette route. Les autres rôles recevront une erreur 403.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       403:
 *         description: Accès refusé - rôle non autorisé
 */
router.post("/login-admin", controller.loginAdmin);
/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Demander un réinitialisation de mot de passe
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email envoyé
 */
router.post("/forgot-password", controller.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Réinitialiser le mot de passe
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mot de passe mis à jour
 */
router.post("/reset-password", controller.resetPassword);
/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Vérifier le code OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - code
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code vérifié
 */
router.post("/verify-otp", controller.verifyOTP);
/**
 * @swagger
 * /api/auth/resend-otp:
 *   post:
 *     summary: Renvoyer le code OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code OTP renvoyé
 */
router.post("/resend-otp", controller.resendOTP);
module.exports = router;