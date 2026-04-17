const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Vérifier si un admin existe déjà
  const adminExists = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (adminExists) {
    console.log("✓ Un admin existe déjà");
    return;
  }

  // Créer l'admin par défaut
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "workai2105@gmail.com",
      password: hashedPassword,
      nom: "Super",
      prenom: "Admin",
      telephone: "+2290191793100",
      role: "ADMIN",
      isVerified: true,
      isApproved: true,
    },
  });

  console.log("✓ Admin créé avec succès :", admin.email);
}

main()
  .catch((error) => {
    console.error("Erreur seed :", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
