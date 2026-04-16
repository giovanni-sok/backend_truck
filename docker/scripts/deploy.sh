#!/bin/bash
set -e

# ─── Chargement du .env ───────────────────────────────────
ENV_FILE="/opt/backend-gettruck/.env"

if [ -f "$ENV_FILE" ]; then
  set -a
  source "$ENV_FILE"
  set +a
else
  echo "❌ Fichier .env introuvable : $ENV_FILE"
  exit 1
fi

# ─── Validation ──────────────────────────────────────────
if [ -z "$DOCKERHUB_USERNAME" ]; then
  echo "❌ DOCKERHUB_USERNAME est vide — vérifier le .env"
  exit 1
fi

# ─── Variables ───────────────────────────────────────────
IMAGE_NAME="${DOCKERHUB_USERNAME}/backend-gettruck"
IMAGE_TAG="${IMAGE_TAG:-latest}"

echo "📦 Pull de l'image : ${IMAGE_NAME}:${IMAGE_TAG}"

# ─── Pull de la nouvelle image ────────────────────────────
docker pull "${IMAGE_NAME}:${IMAGE_TAG}"

# ─── Arrêt des conteneurs existants ──────────────────────
echo "🛑 Arrêt des conteneurs..."
docker compose down --remove-orphans || true

# ─── Lancement avec la nouvelle image ────────────────────
echo "▶️  Démarrage des conteneurs..."
IMAGE_TAG="${IMAGE_TAG}" docker compose up -d

# ─── Migrations Prisma ────────────────────────────────────
echo "🗄️  Exécution des migrations Prisma..."
docker compose exec -T app npx prisma migrate deploy

# ─── Nettoyage des anciennes images ──────────────────────
echo "🧹 Nettoyage des images non utilisées..."
docker image prune -f

echo "✅ Déploiement terminé avec succès !"