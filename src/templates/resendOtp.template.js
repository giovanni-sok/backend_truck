const resendOtpTemplate = (prenom, otp) => {
  return `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; padding:30px; text-align:center;">
      
      <h2 style="color:#333;">Vérification de votre compte</h2>
      
      <p>Bonjour <strong>${prenom}</strong>,</p>
      <p>Voici votre code de vérification :</p>

      <div style="font-size:32px; letter-spacing:8px; margin:20px 0; font-weight:bold; color:#4CAF50;">
        ${otp}
      </div>

      <p>Ce code expire dans 10 minutes.</p>

      <p style="font-size:12px; color:#999;">
        Si vous n'avez pas demandé ce code, ignorez ce message.
      </p>

    </div>
  </div>
  `;
};

module.exports = resendOtpTemplate;
