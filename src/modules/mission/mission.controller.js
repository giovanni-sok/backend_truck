const missionService = require('./mission.service');

exports.createMission = async (req, res) => {
  try {
    const mission = await missionService.createMission(req.body);
    res.status(201).json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptMission = async (req, res) => {
  try {
    const { chauffeurId } = req.body;
    const mission = await missionService.acceptMission(parseInt(req.params.id), chauffeurId);
    res.json(mission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const mission = await missionService.updateStatus(parseInt(req.params.id), status);
    res.json(mission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllMissions = async (req, res) => {
  try {
    const missions = await missionService.getAllMissions();
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
