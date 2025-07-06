# Estágio 1: Construção (Build)
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos, incluindo o prisma/schema.prisma
COPY . .

# --- LINHA CRÍTICA ADICIONADA ---
# Gera o Prisma Client usando o schema que acabamos de copiar
RUN npx prisma generate

# Compila o TypeScript para JavaScript
RUN npm run build

# Estágio 2: Imagem Final (Produção)
FROM node:18

WORKDIR /usr/src/app

# Copia apenas os artefatos necessários do estágio de build
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./

# --- IMPORTANTE ---
# Copia o schema.prisma E o client gerado para a imagem final
COPY --from=build /usr/src/app/prisma ./prisma

# A porta do serviço de autenticação é 3000, não 8080
EXPOSE 3000

# O comando de start deve ser o do authentication, não o do backend
CMD [ "npm", "start" ]