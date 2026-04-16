const service = require("./user.service");
exports.approveDriver = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await service.approveDriver(Number(id));

    res.json({ message: "Chauffeur validé", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};