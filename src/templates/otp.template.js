const otpTemplate = (prenom, otp) => {
  const digits = String(otp).split('');

  const digitBoxes = digits.map(d => `
    <td style="padding: 0 5px;">
      <div style="width:44px; height:54px; background:#e3f0fb; border:1.5px solid #90caf9;
                  border-radius:10px; text-align:center; line-height:54px;
                  font-size:22px; font-weight:600; color:#1565c0;">
        ${d}
      </div>
    </td>
  `).join('');

  return `
  <div style="font-family: Arial, sans-serif; background:#f0f4f8; padding:32px 16px;">
    <div style="max-width:560px; margin:auto; background:#ffffff;
                border-radius:16px; overflow:hidden; border:1px solid #e2e8f0;">

      <!-- Header -->
      <div style="background:#0f1b2d; padding:28px 40px; text-align:center;">
        <table cellpadding="0" cellspacing="0" style="margin:auto;">
          <tr>
            <td style="padding-right:10px; vertical-align:middle;">
              <img src="../assets/images/logo.png" alt="Logo" width="32" height="32"
                   style="display:block; border-radius:8px;" />
            </td>
            <td style="vertical-align:middle;">
              <span style="font-size:20px; font-weight:600; color:#e8f4fd; letter-spacing:0.5px;">
                DriveConnect
              </span>
            </td>
          </tr>
        </table>
      </div>

      <!-- Barre décorative -->
      <div style="height:4px; background:linear-gradient(90deg,#1565c0,#42a5f5,#1565c0);"></div>

      <!-- Body -->
      <div style="padding:40px 40px 32px;">

        <!-- Icône + titre -->
        <div style="text-align:center; margin-bottom:28px;">
          <div style="width:60px; height:60px; background:#e3f0fb; border-radius:50%;
                      display:inline-flex; align-items:center; justify-content:center;
                      border:2px solid #90caf9; margin-bottom:14px; font-size:24px;">
            🔒
          </div>
          <p style="font-size:11px; font-weight:600; letter-spacing:2px; color:#718096;
                    text-transform:uppercase; margin:0 0 8px;">Vérification</p>
          <h1 style="font-size:22px; font-weight:700; color:#1a202c; margin:0;">
            Bonjour, <span style="color:#1565c0;">${prenom}</span>
          </h1>
        </div>

        <!-- Message -->
        <div style="background:#f7fafc; border-radius:12px; padding:20px 24px;
                    margin-bottom:28px; border-left:3px solid #1565c0;">
          <p style="font-size:14px; line-height:1.7; color:#4a5568; margin:0;">
            Voici votre code de vérification à usage unique. Il est strictement
            <strong style="color:#1a202c;">personnel et confidentiel</strong>.
          </p>
        </div>

        <!-- Chiffres OTP -->
        <div style="text-align:center; margin-bottom:16px;">
          <table cellpadding="0" cellspacing="0" style="margin:auto 0 16px;">
            <tr>${digitBoxes}</tr>
          </table>
        </div>

        <!-- Badge expiration -->
        <div style="text-align:center; margin-bottom:28px;">
          <span style="display:inline-block; background:#f7fafc; border:1px solid #e2e8f0;
                       border-radius:20px; padding:8px 16px; font-size:12px; color:#718096;">
            ⏱ Expire dans <strong style="color:#1a202c;">10 minutes</strong>
          </span>
        </div>

        <div style="border-top:1px solid #e2e8f0; margin-bottom:20px;"></div>

        <!-- Avertissement -->
        <div style="background:#fff8e1; border-radius:10px; padding:14px 18px;
                    border-left:3px solid #f59e0b; margin-bottom:28px;">
          <p style="font-size:12px; color:#92660a; margin:0; line-height:1.6;">
            Si vous n'avez pas demandé ce code, ignorez ce message
            et sécurisez votre compte immédiatement.
          </p>
        </div>

        <!-- Support -->
        <div style="border-top:1px solid #e2e8f0; padding-top:20px; text-align:center;">
          <p style="font-size:12px; color:#718096; margin:0 0 4px;">
            Besoin d'aide ? Contactez le support
          </p>
          <p style="font-size:12px; color:#1565c0; margin:0;">support@driveconnect.com</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f7fafc; padding:16px 40px;
                  border-top:1px solid #e2e8f0; text-align:center;">
        <p style="font-size:11px; color:#a0aec0; margin:0;">
          © 2025 DriveConnect · Tous droits réservés
        </p>
      </div>

    </div>
  </div>
  `;
};

module.exports = otpTemplate;