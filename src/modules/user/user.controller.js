const service = require("./user.service");

/**
 * Lister les utilisateurs
 */
exports.listUsers = async (req, res) => {
  try {
    const users = await service.getAllUsers(req.query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Récupérer un utilisateur
 */
exports.getUser = async (req, res) => {
  try {
    const user = await service.getUserById(Number(req.params.id));
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/**
 * Créer un utilisateur (Admin)
 */
exports.createUser = async (req, res) => {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Mettre à jour un utilisateur
 */
exports.updateUser = async (req, res) => {
  try {
    const user = await service.updateUser(Number(req.params.id), req.body);
    res.json({ message: "Utilisateur mis à jour", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Supprimer un utilisateur
 */
exports.deleteUser = async (req, res) => {
  try {
    await service.deleteUser(Number(req.params.id));
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * Approuver un chauffeur
 */
exports.approveDriver = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.approveDriver(Number(id));
    res.json({ message: "Chauffeur validé", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};