const prisma = require("../../config/prisma");
const bcrypt = require("bcrypt");
const generateResetToken = require("../../utils/generateResetToken");
const generateOTP = require("../../utils/generateOTP");
const transporter = require("../../utils/mailer");
const otpTemplate = require("../../templates/otp.template");
const resetTemplate = require("../../templates/reset.template");
const resendOtpTemplate = require("../../templates/resendOtp.template");

exports.register = async ({ email, password,nom,prenom,telephone,role }) => {
  // vérifier si user existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Cet Utilisateur existe déjà");
  }
const otp = generateOTP();
const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 min
const hashedPassword = await bcrypt.hash(password, 10);

  const user= prisma.user.create({
    data: {
      nom,
      prenom,
      telephone,
      role: role || "CLIENT",
      verificationCode: otp,
      verificationExpires: expires,
      email,
      password: hashedPassword,
      isApproved: role === "CHAUFFEUR" ? false : true,
    },
  });

  try {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Code de vérification",
    html: otpTemplate(user.prenom, otp),
  });

  console.log("Email envoyé");
} catch (error) {
  console.log("Erreur email :", error);
}
return user;
};

exports.login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Utilisateur introuvable");
  if (!user.isVerified) {
  throw new Error("Veuillez vérifier votre compte");
  }
  if (user.role === "CHAUFFEUR" && !user.isApproved) {
    throw new Error("Compte en attente de validation par l'administrateur");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw new Error("Mot de passe incorrect");

  return user;
};


// 1. DEMANDE RESET
exports.forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Utilisateur introuvable");
  }

  const token = generateResetToken();
  const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 min

  await prisma.user.update({
    where: { email },
    data: {
      resetToken: token,
      resetExpires: expires,
    },
  });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

 await transporter.sendMail({
  to: user.email,
  subject: "Restauration de mot de passe",
  html: resetTemplate(user.prenom, resetLink),
});

  return "Email envoyé";
};

// 2. RESET PASSWORD
exports.resetPassword = async (token, newPassword) => {
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new Error("Token invalide ou expiré");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetExpires: null,
    },
  });

  return "Mot de passe mis à jour";
};
exports.verifyOTP = async (email, code) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Utilisateur introuvable");

  if (user.isVerified) {
    throw new Error("Compte déjà vérifié");
  }

  if (
    user.verificationCode !== code ||
    user.verificationExpires < new Date()
  ) {
    throw new Error("Code invalide ou expiré");
  }

  await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
      verificationCode: null,
      verificationExpires: null,
    },
  });

  return "Compte vérifié avec succès";
};

exports.resendOTP = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("Utilisateur introuvable");

  if (user.isVerified) {
    throw new Error("Compte déjà vérifié");
  }

  // 🔥 Anti-spam (1 minute)
  if (
    user.lastOtpSentAt &&
    Date.now() - new Date(user.lastOtpSentAt).getTime() < 60000
  ) {
    throw new Error("Attends 1 minute avant de redemander un code");
  }

  const otp = generateOTP();
  const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 min

  await prisma.user.update({
    where: { email },
    data: {
      verificationCode: otp,
      verificationExpires: expires,
      lastOtpSentAt: new Date(),
    },
  });

  // ✅ ENVOI EMAIL
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Nouveau code de vérification",
    html: resendOtpTemplate(user.prenom, otp),
  });

  return "Nouveau code envoyé";
};