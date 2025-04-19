import fastify, {FastifyRequest} from 'fastify'
import {UserController} from "./Presentation/Controllers/UserController.js";
import {CreateUserDTO} from "./Domain/DTO/Command/CreateUserDTO.js";
import prisma from "@prisma";


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
    try
    {
        const userController = new UserController();

        server.post('/user', opts, (request: FastifyRequest<{ Body: CreateUserDTO }>, reply) =>
            userController.CreateUser(request, reply))

        const address = await server.listen({port : 8080});
        console.log(`Server listening at ${address}`)
    }
    catch (err)
    {
        console.error(err)
        await prisma.$disconnect();
        process.exit(1)
    }
}

main();