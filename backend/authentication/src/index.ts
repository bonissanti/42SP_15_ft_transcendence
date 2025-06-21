import fastify from 'fastify'
import fastifyJwt from "@fastify/jwt";
import {UserController} from "./Presentation/Controllers/UserController.js";
import prisma from "@prisma";
import {UserSessionController} from "./Presentation/Controllers/UserSessionController.js";
import {UserRoutes} from "./Presentation/Routes/UserRoutes/UserRoutes.js";
import {UserSessionRoutes} from "./Presentation/Routes/UserSessionRoutes/UserSessionRoutes.js";

const server = fastify()

server.register(fastifyJwt, {
    secret: 'secret'
})

async function main()
{
    const userController = new UserController();
    const userSessionController = new UserSessionController();

    await UserRoutes(server, userController);
    await UserSessionRoutes(server, userSessionController);
    // await UserAuth0controller(server, userAuth0Controller);

    //Todo: Criar endpoints de criar, editar e deletar para auth0

    server.setErrorHandler(async (error, request, reply) => {
        console.log("Internal server error: ", error.message, "")
        reply.status(500).send(error.message)
    })

    try
    {
        const address = await server.listen({port : 8080});
        console.log(`Server listening at ${address}`)
    }
    catch (err)
    {
        console.error("Failed to start server: ", err, "")
        await prisma.$disconnect();
        process.exit(1)
    }
}

main();