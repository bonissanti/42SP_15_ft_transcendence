# Estágio 1: Builder - Instala dependências e compila o código
FROM node:24.3.0-alpine3.21 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Estágio 2: Production - Instala apenas as dependências de produção e roda o código compilado
FROM node:24.3.0-alpine3.21

WORKDIR /app

# Copia as dependências de produção
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copia o código compilado do estágio anterior
COPY --from=builder /app/dist ./dist

# Expõe a porta que o serviço vai usar
EXPOSE 3000

# Comando para iniciar o servidor em produção
CMD ["npm", "start"]