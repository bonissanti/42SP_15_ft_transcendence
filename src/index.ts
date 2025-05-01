import fastify, {FastifyRequest} from 'fastify'
import {UserController} from "./Presentation/Controllers/UserController.js";
import {CreateUserDTO} from "./Domain/DTO/Command/CreateUserDTO.js";
import prisma from "@prisma";
import {EditUserDTO} from "./Domain/DTO/Command/EditUserDTO.js";
import {DeleteUserDTO} from "./Domain/DTO/Command/DeleteUserDTO.js";
import {GetUserDTO} from "./Domain/DTO/Query/GetUserDTO.js";


const server = fastify()

const opts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
                username: { type: 'string' },
                profilePic: { type: ['string', 'null'] },
                lastLogin: {
                    anyOf: [
                        { type: 'string', format: 'date-time' },
                        { type: 'null' },
                    ]
                },
            },
            required: ['email', 'password', 'username'],
            additionalProperties: false,
        }
    }
}



async function main()
{
    const userController = new UserController();

    server.post('/user', opts, async (request: FastifyRequest<{ Body: CreateUserDTO }>, reply) =>
        userController.CreateUser(request, reply))

    server.put('/user', opts, async (request: FastifyRequest<{ Body: EditUserDTO }>, reply) =>
        userController.EditUser(request, reply))

    server.delete('/user', async (request: FastifyRequest<{ Body: DeleteUserDTO }>, reply) =>
        userController.DeleteUser(request, reply))

    server.get('/user', async (request: FastifyRequest<{ Querystring: GetUserDTO }>, reply) =>
        userController.GetUser(request, reply))

    // server.post('/login', async (request: FastifyRequest<{ Body: UserSessionDTO }>, reply)=>
    //     userController.LoginUser(request, reply))

    // server.post('/logout', async (request: FastifyRequest<{ Body: UserSessionDTO }>, reply) =>
    //     userController.LogoutUser(request, reply))

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