import fastify, {FastifyRequest} from 'fastify'
import {UserController} from "./Presentation/Controllers/UserController.js";
import {CreateUserDTO} from "./Domain/DTO/Command/CreateUserDTO.js";
import prisma from "@prisma";
import {EditUserDTO} from "./Domain/DTO/Command/EditUserDTO.js";


const server = fastify()

server.get('/', async (request, reply) => {
    return { message: "Fucker"}
})

server.get('/ping', async (request, reply) => {
    return 'pong\n';
});

const opts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
                username: { type: 'string' },
                profilePic: { type: ['string', 'null'] },
            },
            required: ['email', 'password', 'username'],
            additionalProperties: false,
        }
    }
}



async function main()
{
    const userController = new UserController();

    server.post('/user', opts, (request: FastifyRequest<{ Body: CreateUserDTO }>, reply) =>
        userController.CreateUser(request, reply))

    server.put('/user/:username', opts, (request: FastifyRequest<{ Body: EditUserDTO }>, reply) =>
        userController.EditUser(request, reply))

    server.delete('/user/:username', (request: FastifyRequest<{ Body: string }>, reply) =>
        userController.DeleteUser(request, reply))

    //TODO: Criar login
    // server.post('/login', opts, (request: FastifyRequest<{ Body: CreateUserDTO }>, reply) =>
    //     userController.CreateUser(request, reply))

    //TODO: criar logout

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