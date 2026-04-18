const service = require("./auth.service");
const generateToken = require("../../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const user = await service.register(req.body);
    const token = generateToken(user);

    res.status(201).json({
      message: "Inscription réussie",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await service.login(req.body);
    const token = generateToken(user);

    res.json({
      message: "Connexion réussie",
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LOGIN ADMIN — réservé à l'interface web admin
exports.loginAdmin = async (req, res) => {
  try {
    const user = await service.loginAdmin(req.body);
    const token = generateToken(user);

    res.json({
      message: "Connexion réussie",
      user,
      token,
    });
  } catch (err) {
    // Renvoyer 403 si c'est un refus d'accès
    const status = err.message.includes("Accès refusé") ? 403 : 400;
    res.status(status).json({ message: err.message });
  }
};
// DEMANDE RESET
exports.forgotPassword = async (req, res) => {
  try {
    const message = await service.forgotPassword(req.body.email);
    res.json({ message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const message = await service.resetPassword(token, password);

    res.json({ message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.verifyOTP = async (req, res) => {
  try {
    const { email, code } = req.body;

    const message = await service.verifyOTP(email, code);

    res.json({ message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const message = await service.resendOTP(email);

    res.json({ message });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};