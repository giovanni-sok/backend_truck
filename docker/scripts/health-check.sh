#!/bin/bash
set -e

APP_URL="https://backend-gettruck.totonlionel.com"
MAX_RETRIES=10
WAIT_SECONDS=5

echo "🏥 Vérification de la santé de l'application..."

for i in $(seq 1 $MAX_RETRIES); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${APP_URL}/health" || echo "000")

  if [ "$STATUS" -eq 200 ]; then
    echo "✅ L'application répond correctement (HTTP ${STATUS})"
    exit 0
  fi

  echo "⏳ Tentative ${i}/${MAX_RETRIES} — HTTP ${STATUS}, nouvelle tentative dans ${WAIT_SECONDS}s..."
  sleep $WAIT_SECONDS
done

echo "❌ L'application ne répond pas après ${MAX_RETRIES} tentatives"
docker compose logs --tail=50 app
exit 1