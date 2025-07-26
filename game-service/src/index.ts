import helmet from "@fastify/helmet";
import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import {fastifyCors} from "@fastify/cors";

import prisma from "./Infrastructure/Service/PrismaService";
import { TournamentRoutes } from "./Presentation/Routes/TournamentRoutes/TournamentRoutes";
import { TournamentController } from "./Presentation/Controllers/TournamentController";
import { HistoryController } from "./Presentation/Controllers/HistoryController";
import { HistoryRoutes } from "./Presentation/Routes/HistoryRoutes/HistoryRoutes";
import { MatchmakingController } from "./Presentation/Controllers/MatchmakingController";
import { MatchmakingRoutes } from "./Presentation/Routes/MatchmakingRoutes/MatchmakingRoutes";
import { setupWebSocket } from './game/websockets';

async function main() {
    const server = fastify();

    server.register(fastifyJwt, {
        secret: process.env.JWT_SECRET || 'transcendence'
    });

    server.register(helmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://accounts.google.com"],
                frameSrc: ["'self'", "https://accounts.google.com"],
                connectSrc: ["'self'", "https://accounts.google.com"]
            }
        }
    });

    server.register(fastifyCors, {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    });

    const tournamentController = new TournamentController();
    const historyController = new HistoryController();
    const matchmakingController = new MatchmakingController();

    await TournamentRoutes(server, tournamentController);
    await HistoryRoutes(server, historyController);
    await MatchmakingRoutes(server, matchmakingController);

    server.setErrorHandler((async (error: any, request: any, reply: any) => {
        console.log("Error: ", error);
    }));

    setupWebSocket(server);

    try {
        const address = await server.listen({ port: 3001 });
        console.log(`HTTP and WebSocket Server listening on ${address}`);
    } catch (err) {
        console.log("Failed to start server: ", err, "");
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();