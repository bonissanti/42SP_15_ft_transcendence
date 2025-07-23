import helmet from "@fastify/helmet";
import fastifyJwt from "@fastify/jwt";
import {fastifyCors} from "@fastify/cors";

import prisma from "./Infrastructure/Service/PrismaService";
import fastify from "fastify";
import {TournamentRoutes} from "./Presentation/Routes/TournamentRoutes/TournamentRoutes";
import {TournamentController} from "./Presentation/Controllers/TournamentController";
import {HistoryController} from "./Presentation/Controllers/HistoryController";
import {HistoryRoutes} from "./Presentation/Routes/HistoryRoutes/HistoryRoutes";
import {MatchmakingController} from "./Presentation/Controllers/MatchmakingController";
import {MatchmakingRoutes} from "./Presentation/Routes/MatchmakingRoutes/MatchmakingRoutes";

const server = fastify();

server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'transcendence'
});

server.register(helmet,
    {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                script: ["'self'"]
            }
        }
    });

server.register(fastifyCors, {
    origin: ['http://localhost:5173'],
    credentials: true
});

async function main()
{
    const tournamentController = new TournamentController();
    const historyController = new HistoryController();
    const matchmakingController = new MatchmakingController();

    await TournamentRoutes(server, tournamentController);
    await HistoryRoutes(server, historyController);
    await MatchmakingRoutes(server, matchmakingController);

    server.setErrorHandler((async (error, request, reply) => {
        console.log("Error: ", error);
    }));

    try
    {
        const address = await server.listen({ port: 8081 });
        console.log(`Server listening on ${address}`);
    }
    catch (err)
    {
        console.log("Failed to start server: ", err, "");
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();