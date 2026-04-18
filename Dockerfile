FROM node:20-alpine

# Installer OpenSSL (requis par Prisma)
RUN apk add --no-cache openssl

# Répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm ci --only=production

# Générer le client Prisma
RUN npx prisma generate

# Copier le reste du code source
COPY src ./src

# Exposer le port de l'app
EXPOSE 6500

CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]