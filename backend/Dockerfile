FROM node:18-alpine

RUN apk add --no-cache curl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma 

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 8080

#Debug
EXPOSE 9229

#Prisma Studio
EXPOSE 5555

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "dev"]