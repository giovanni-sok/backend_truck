const app = require("./app");
const prisma = require("./config/prisma");
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 5000;

// Fonction pour initialiser l'admin par défaut
async function initializeAdmin() {
  try {
    const adminExists = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("Admin@123", 10);
      await prisma.user.create({
        data: {
          email: "admin@gettruck.com",
          password: hashedPassword,
          nom: "Admin",
          prenom: "Gettruck",
          telephone: "+33600000000",
          role: "ADMIN",
          isVerified: true,
          isApproved: true,
        },
      });
      console.log("✓ Admin créé avec succès");
    }
  } catch (error) {
    console.error("Erreur initialisation admin :", error);
  }
}

// Initialiser l'admin et démarrer le serveur
initializeAdmin().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server lancé sur http://localhost:${PORT}`);
  });
});