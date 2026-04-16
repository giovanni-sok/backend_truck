const approvedTemplate = (prenom) => {
  return `
  <div style="font-family: Arial; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:30px; text-align:center;">
      
      <h2 style="color:#4CAF50;">Compte approuvé 🎉</h2>

      <p>Bonjour <strong>${prenom}</strong>,</p>

      <p>
        Votre compte chauffeur a été validé. 
        Vous pouvez maintenant accéder à toutes les fonctionnalités.
      </p>

      <div style="margin:30px;">
        <a href="#" style="background:#4CAF50; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px;">
          Accéder à mon compte
        </a>
      </div>

      <p style="font-size:12px; color:#999;">
        Merci de faire partie de notre plateforme.
      </p>

    </div>
  </div>
  `;
};

module.exports = approvedTemplate;