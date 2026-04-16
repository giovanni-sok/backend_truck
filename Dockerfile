FROM node:20-alpine
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
EXPOSE 3000
 
# Lancer l'application
CMD ["node", "src/server.js"]