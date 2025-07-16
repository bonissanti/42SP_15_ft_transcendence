import fastifyJwt from "@fastify/jwt";
import prisma from "@prisma";
import fastify from "fastify";
import {TournamentRoutes} from "./Presentation/Routes/TournamentRoutes/TournamentRoutes";
import {TournamentController} from "./Presentation/Controllers/TournamentController";
import {HistoryController} from "./Presentation/Controllers/HistoryController";
import {HistoryRoutes} from "./Presentation/Routes/HistoryRoutes/HistoryRoutes";

const server = fastify();

server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'transcendence'
});

async function main()
{
    const tournamentController = new TournamentController();
    const historyController = new HistoryController();

    await TournamentRoutes(server, tournamentController);
    await HistoryRoutes(server, historyController);

    server.setErrorHandler((async (error, request, reply) => {
        console.log("erro aqui?");
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