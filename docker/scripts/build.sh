#!/bin/bash
set -e

# ─── Variables ───────────────────────────────────────────
IMAGE_NAME="${DOCKERHUB_USERNAME}/backend-gettruck"
IMAGE_TAG="${IMAGE_TAG:-latest}"
FULL_IMAGE="${IMAGE_NAME}:${IMAGE_TAG}"

echo "🔨 Build de l'image Docker : ${FULL_IMAGE}"

# ─── Build ───────────────────────────────────────────────
docker build \
  --no-cache \
  -t "${FULL_IMAGE}" \
  -t "${IMAGE_NAME}:latest" \
  .

echo "✅ Build terminé"

# ─── Push vers DockerHub ──────────────────────────────────
echo "🚀 Push vers DockerHub..."
docker push "${FULL_IMAGE}"
docker push "${IMAGE_NAME}:latest"

echo "✅ Push terminé : ${FULL_IMAGE}"