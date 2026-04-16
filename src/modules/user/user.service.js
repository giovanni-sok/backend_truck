const prisma = require("../../config/prisma");
const transporter = require("../../utils/mailer");
const approvedTemplate = require("../../templates/approved.template");

exports.approveDriver = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  // 🔥 Vérifier que c'est un chauffeur
  if (user.role !== "CHAUFFEUR") {
    throw new Error("Ce compte n'est pas un chauffeur");
  }

  // 🔥 Déjà approuvé → on stop ici
  if (user.isApproved) {
    return "Utilisateur déjà approuvé";
  }

  // ✅ Update
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      isApproved: true,
    },
  });

  // 📧 Email seulement si nouvellement approuvé
 await transporter.sendMail({
  to: user.email,
  subject: "Compte approuvé",
  html: approvedTemplate(user.prenom),
});

  return updatedUser;
};