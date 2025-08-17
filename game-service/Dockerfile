FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --registry https://registry.npmjs.org/ --no-optional

COPY . .

ARG DATABASE_GAME_URL
ARG JWT_SECRET
ARG BACKEND_API_URL
ARG NODE_TLS_REJECT_UNAUTHORIZED

ENV DATABASE_GAME_URL=${DATABASE_GAME_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV BACKEND_API_URL=${BACKEND_API_URL}
ENV NODE_TLS_REJECT_UNAUTHORIZED=${NODE_TLS_REJECT_UNAUTHORIZED}

RUN npx prisma generate

RUN npm run build

FROM node:18

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/entrypoint.sh ./

COPY --from=build /usr/src/app/prisma ./prisma

EXPOSE 3001

#Prisma Studio
EXPOSE 5556

ENTRYPOINT ["./entrypoint.sh"]

CMD ["npm", "run", "dev"]

