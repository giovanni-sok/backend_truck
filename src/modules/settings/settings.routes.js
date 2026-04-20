const express = require('express');
const router = express.Router();
const settingsController = require('./settings.controller');
// Idéalement on ajouterait un middleware isAdmin ici
// const { isAdmin } = require('../../middleware/auth');

router.get('/', settingsController.getSettings);
router.patch('/', settingsController.updateSettings);

module.exports = router;
