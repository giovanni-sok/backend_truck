const prisma = require('../../config/prisma');
const { getIO } = require('../../config/socket');
const settingsService = require('../settings/settings.service');

/**
 * Calcul distance à vol d'oiseau (Haversine)
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Créer une mission
 */
exports.createMission = async (missionData) => {
  const { clientId, pickupLat, pickupLng, deliveryLat, deliveryLng } = missionData;
  
  // 1. Calcul distance
  const distance = calculateDistance(pickupLat, pickupLng, deliveryLat, deliveryLng);
  
  // 2. Récupérer settings pour prix
  const settings = await settingsService.getSettings();
  const estimatedPrice = settings.basePrice + (distance * settings.kmPrice);
  
  // 3. Créer en DB
  const mission = await prisma.mission.create({
    data: {
      ...missionData,
      distance,
      estimatedPrice,
      status: 'PENDING'
    },
    include: { client: true }
  });

  // 4. Alerter les chauffeurs proches via Socket.io
  const io = getIO();
  io.to('CHAUFFEUR').emit('mission:new', mission);
  
  return mission;
};

/**
 * Accepter une mission (Premier arrivé premier servi)
 */
exports.acceptMission = async (missionId, chauffeurId) => {
  // Vérifier si mission toujours dispo
  const mission = await prisma.mission.findUnique({ where: { id: missionId } });
  
  if (!mission || mission.status !== 'PENDING') {
    throw new Error("Cette mission n'est plus disponible.");
  }

  const updatedMission = await prisma.mission.update({
    where: { id: missionId },
    data: {
      chauffeurId,
      status: 'ACCEPTED',
      acceptedAt: new Date()
    },
    include: { client: true, chauffeur: true }
  });

  // Notifier le client et l'admin
  const io = getIO();
  io.emit(`mission:${missionId}:status`, updatedMission);
  io.emit('mission:update', updatedMission); // Pour le dashboard admin

  return updatedMission;
};

/**
 * Mettre à jour le statut
 */
exports.updateStatus = async (missionId, status) => {
  const updateData = { status };
  
  if (status === 'STARTED') updateData.startedAt = new Date();
  if (status === 'COMPLETED') {
    updateData.completedAt = new Date();
    // On pourrait figer le finalPrice ici
    const mission = await prisma.mission.findUnique({ where: { id: missionId } });
    updateData.finalPrice = mission.estimatedPrice;
  }

  const updatedMission = await prisma.mission.update({
    where: { id: missionId },
    data: updateData,
    include: { client: true, chauffeur: true }
  });

  const io = getIO();
  io.emit(`mission:${missionId}:status`, updatedMission);
  io.emit('mission:update', updatedMission);

  return updatedMission;
};

/**
 * Liste globale (Admin)
 */
exports.getAllMissions = async () => {
  return await prisma.mission.findMany({
    include: { client: true, chauffeur: true },
    orderBy: { createdAt: 'desc' }
  });
};
