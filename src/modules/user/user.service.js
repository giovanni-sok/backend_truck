const prisma = require("../../config/prisma");
const transporter = require("../../utils/mailer");
const approvedTemplate = require("../../templates/approved.template");
const bcrypt = require("bcrypt");

/**
 * Lister tous les utilisateurs (avec filtres optionnels)
 */
exports.getAllUsers = async (filters = {}) => {
  const { role, isActive, search } = filters;
  
  const where = {};
  if (role) where.role = role;
  if (isActive !== undefined) where.isActive = isActive === 'true';
  if (search) {
    where.OR = [
      { nom: { contains: search, mode: 'insensitive' } },
      { prenom: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  return await prisma.user.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      email: true,
      nom: true,
      prenom: true,
      telephone: true,
      role: true,
      isActive: true,
      isApproved: true,
      createdAt: true,
    }
  });
};

/**
 * Récupérer un utilisateur par son ID
 */
exports.getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) throw new Error("Utilisateur introuvable");
  
  // Supprimer le mot de passe avant de renvoyer
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Créer un nouvel utilisateur (Admin creating users)
 */
exports.createUser = async (userData) => {
  const { email, password, telephone, nom, prenom, role } = userData;

  // Vérifier si l'email ou le téléphone existe déjà
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { telephone }]
    }
  });

  if (existing) throw new Error("Email ou numéro de téléphone déjà utilisé");

  const hashedPassword = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      telephone,
      nom,
      prenom,
      role: role || 'CLIENT',
      isActive: true,
      isVerified: true, // Créé par admin -> considéré vérifié
    }
  });
};

/**
 * Mettre à jour un utilisateur
 */
exports.updateUser = async (id, updateData) => {
  const { password, ...data } = updateData;

  // Si le mot de passe est fourni, on le hash
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  return await prisma.user.update({
    where: { id },
    data
  });
};

/**
 * Suppression (ou désactivation) d'un utilisateur
 */
exports.deleteUser = async (id) => {
  // Ici on fait une suppression réelle, mais on pourrait faire un soft delete via isActive: false
  return await prisma.user.delete({
    where: { id }
  });
};

/**
 * Approuver un chauffeur (Logique spécifique)
 */
exports.approveDriver = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) throw new Error("Utilisateur introuvable");
  if (user.role !== "CHAUFFEUR") throw new Error("Ce compte n'est pas un chauffeur");
  if (user.isApproved) return "Utilisateur déjà approuvé";

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { isApproved: true },
  });

  await transporter.sendMail({
    to: user.email,
    subject: "Compte approuvé",
    html: approvedTemplate(user.prenom),
  });

  return updatedUser;
};