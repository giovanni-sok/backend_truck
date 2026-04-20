const settingsService = require('./settings.service');

exports.getSettings = async (req, res) => {
  try {
    const settings = await settingsService.getSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await settingsService.updateSettings(req.body);
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
