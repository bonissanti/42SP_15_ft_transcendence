import fastify, {FastifyRequest} from 'fastify'
import fastifyJwt from "@fastify/jwt";
import {UserController} from "./Presentation/Controllers/UserController.js";
import {CreateUserDTO} from "./Domain/DTO/Command/CreateUserDTO.js";
import prisma from "@prisma";
import {EditUserDTO} from "./Domain/DTO/Command/EditUserDTO.js";
import {DeleteUserDTO} from "./Domain/DTO/Command/DeleteUserDTO.js";
import {GetUserDTO} from "./Domain/DTO/Query/GetUserDTO.js";
import {UserSessionDTO} from "./Domain/DTO/Command/UserSessionDTO.js";
import {UserSessionController} from "./Presentation/Controllers/UserSessionController.js";
import {authenticateJWT} from "./Presentation/Middleware/AuthMiddleware.js";

const server = fastify()

server.register(fastifyJwt, {
    secret: 'secret'
})

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
    const userSessionController = new UserSessionController();

    server.post('/user', opts, async (request: FastifyRequest<{ Body: CreateUserDTO }>, reply) =>
        await userController.CreateUser(request, reply))

    server.put('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: EditUserDTO }>, reply) =>
        await userController.EditUser(request, reply))

    server.delete('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: DeleteUserDTO }>, reply) =>
        await userController.DeleteUser(request, reply))

    server.get('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: GetUserDTO }>, reply) =>
        await userController.GetUser(request, reply))

    server.post('/login', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: UserSessionDTO }>, reply)=> {
        const result = await userSessionController.LoginUser(request, reply)

        if (result.isSucess)
        {
            const token = server.jwt.sign({ uuid: request.body.uuid, isAuthenticated: true })
            return reply.send({ token: token })
        }
        return result;
    })

    server.post('/logout', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: UserSessionDTO }>, reply)=>
        userSessionController.LogoutUser(request, reply))



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