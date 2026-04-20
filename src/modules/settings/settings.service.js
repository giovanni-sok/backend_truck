const prisma = require('../../config/prisma');

/**
 * Récupérer les paramètres (Singleton ID=1)
 */
exports.getSettings = async () => {
  let settings = await prisma.settings.findUnique({ where: { id: 1 } });
  
  if (!settings) {
    // Création par défaut si n'existe pas
    settings = await prisma.settings.create({
      data: { id: 1, basePrice: 2000, kmPrice: 500, commissionRate: 15 }
    });
  }
  
  return settings;
};

/**
 * Mettre à jour les paramètres
 */
exports.updateSettings = async (data) => {
  return await prisma.settings.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data }
  });
};
