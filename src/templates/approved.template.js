const approvedTemplate = (prenom) => {
  return `
  <div style="background:#f0f4f8; padding:32px 16px; font-family: Arial, sans-serif;">
    <div style="max-width:560px; margin:auto; background:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #e2e8f0;">

      <!-- Header -->
      <div style="background:#0f1b2d; padding:28px 40px; text-align:center;">
        <table cellpadding="0" cellspacing="0" style="margin:auto;">
          <tr>
            <td style="padding-right:10px; vertical-align:middle;">
              <!-- Remplace ce SVG par ton vrai logo -->
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

        <!-- Icône succès -->
        <div style="text-align:center; margin-bottom:28px;">
          <div style="width:60px; height:60px; background:#e8f5e9; border-radius:50%;
                      display:inline-flex; align-items:center; justify-content:center;
                      border:2px solid #a5d6a7; margin-bottom:14px;">
            ✓
          </div>
          <p style="font-size:11px; font-weight:600; letter-spacing:2px; color:#718096;
                    text-transform:uppercase; margin:0 0 8px;">Compte validé</p>
          <h1 style="font-size:22px; font-weight:700; color:#1a202c; margin:0;">
            Bienvenue à bord, <span style="color:#1565c0;">${prenom}</span>
          </h1>
        </div>

        <!-- Message principal -->
        <div style="background:#f7fafc; border-radius:12px; padding:20px 24px;
                    margin-bottom:28px; border-left:3px solid #1565c0;">
          <p style="font-size:14px; line-height:1.7; color:#4a5568; margin:0;">
            Votre dossier chauffeur a été examiné et
            <strong style="color:#1a202c;">officiellement approuvé</strong>.
            Vous avez désormais accès à l'ensemble des fonctionnalités de la plateforme.
          </p>
        </div>

        <!-- 3 features -->
        <table cellpadding="0" cellspacing="0" style="width:100%; margin-bottom:28px;">
          <tr>
            <td style="width:33%; text-align:center; padding:14px 8px;
                        background:#f7fafc; border-radius:10px; border:1px solid #e2e8f0;">
              <p style="font-size:20px; margin:0 0 6px;">📅</p>
              <p style="font-size:11px; color:#718096; margin:0;">Réservations</p>
            </td>
            <td style="width:4px;"></td>
            <td style="width:33%; text-align:center; padding:14px 8px;
                        background:#f7fafc; border-radius:10px; border:1px solid #e2e8f0;">
              <p style="font-size:20px; margin:0 0 6px;">🕐</p>
              <p style="font-size:11px; color:#718096; margin:0;">Historique</p>
            </td>
            <td style="width:4px;"></td>
            <td style="width:33%; text-align:center; padding:14px 8px;
                        background:#f7fafc; border-radius:10px; border:1px solid #e2e8f0;">
              <p style="font-size:20px; margin:0 0 6px;">⭐</p>
              <p style="font-size:11px; color:#718096; margin:0;">Évaluations</p>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <div style="text-align:center; margin-bottom:32px;">
          <a href="https://ton-site.com/dashboard"
             style="display:inline-block; background:#1565c0; color:#ffffff;
                    font-size:14px; font-weight:600; padding:14px 36px;
                    border-radius:8px; text-decoration:none; letter-spacing:0.3px;">
            Accéder à mon espace
          </a>
        </div>

        <!-- Support -->
        <div style="border-top:1px solid #e2e8f0; padding-top:20px; text-align:center;">
          <p style="font-size:12px; color:#718096; margin:0 0 4px;">
            Une question ? Contactez notre support
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

module.exports = approvedTemplate;