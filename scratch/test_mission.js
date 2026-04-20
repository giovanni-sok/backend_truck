const axios = require('axios');

const API_URL = 'http://localhost:6500/api';

async function runTest() {
  try {
    console.log('🚀 Démarrage du test de mission...');

    // 1. Configurer les prix dans Settings
    console.log('⚙️ Configuration des tarifs...');
    await axios.patch(`${API_URL}/settings`, {
      basePrice: 2500,
      kmPrice: 600,
      commissionRate: 15
    });

    // 2. Créer une mission (Test Client -> Driver)
    console.log('📦 Création d\'une mission...');
    const missionRes = await axios.post(`${API_URL}/missions`, {
      clientId: 1, // Assurez-vous que l'ID 1 existe (l'admin par défaut)
      pickupAddr: 'Port de Cotonou',
      pickupLat: 6.3536,
      pickupLng: 2.4390,
      deliveryAddr: 'Université d\'Abomey-Calavi',
      deliveryLat: 6.4486,
      deliveryLng: 2.3364
    });

    const mission = missionRes.data;
    console.log(`✅ Mission créée: ID #${mission.id}`);
    console.log(`📏 Distance calculée: ${mission.distance.toFixed(2)} km`);
    console.log(`💰 Prix estimé: ${mission.estimatedPrice} CFA`);

    // 3. Simuler acceptation par un chauffeur (on utilise l'ID 1 pour le test si pas d'autre user)
    console.log('🤝 Acceptation de la mission par un chauffeur...');
    const acceptRes = await axios.patch(`${API_URL}/missions/${mission.id}/accept`, {
      chauffeurId: 1 
    });
    console.log(`✅ Mission acceptée. Statut: ${acceptRes.data.status}`);

    // 4. Démarrer la mission
    console.log('🚛 Démarrage du transport...');
    await axios.patch(`${API_URL}/missions/${mission.id}/status`, {
      status: 'STARTED'
    });

    // 5. Terminer la mission
    console.log('🏁 Livraison terminée !');
    const finalRes = await axios.patch(`${API_URL}/missions/${mission.id}/status`, {
      status: 'COMPLETED'
    });
    console.log(`✅ Mission terminée. Prix final: ${finalRes.data.finalPrice} CFA`);

  } catch (error) {
    console.error('❌ Erreur pendant le test:', error.response?.data || error.message);
  }
}

runTest();
