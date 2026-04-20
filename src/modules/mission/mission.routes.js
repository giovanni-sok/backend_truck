const express = require('express');
const router = express.Router();
const missionController = require('./mission.controller');

router.get('/', missionController.getAllMissions);
router.post('/', missionController.createMission);
router.patch('/:id/accept', missionController.acceptMission);
router.patch('/:id/status', missionController.updateStatus);

module.exports = router;
