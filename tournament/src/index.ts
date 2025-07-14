import fastifyJwt from "@fastify/jwt";
import prisma from "@prisma";
import fastify from "fastify";
import {TournamentRoutes} from "./Presentation/Routes/TournamentRoutes/TournamentRoutes";
import {TournamentController} from "./Presentation/Controllers/TournamentController";

const server = fastify();

server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'transcendence'
});

async function main()
{
    const tournamentController = new TournamentController();

    await TournamentRoutes(server, tournamentController);

    server.setErrorHandler((async (error, request, reply) => {
        console.log("Internal server error: ", error.message, "")
        reply.status(500).send({message: error.message})
    }));

    try
    {
        const address = await server.listen({ port: 8081, host: '0.0.0.0' });
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