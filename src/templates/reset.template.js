const resetTemplate = (prenom, link) => {
  return `
  <div style="font-family: Arial; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:30px;">
      
      <h2>Réinitialisation du mot de passe</h2>

      <p>Bonjour <strong>${prenom}</strong>,</p>

      <p>Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe :</p>

      <div style="text-align:center; margin:30px;">
        <a href="${link}" style="background:#2196F3; color:#fff; padding:12px 20px; text-decoration:none; border-radius:5px;">
          Réinitialiser mon mot de passe
        </a>
      </div>

      <p style="font-size:12px; color:#999;">
        Ce lien expire dans 30 minutes.
      </p>

    </div>
  </div>
  `;
};

module.exports = resetTemplate;