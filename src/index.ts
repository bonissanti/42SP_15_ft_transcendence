import fastify from 'fastify'
import { PrismaClient } from '../prisma/generated/prisma'
import {userRoutes} from "./setupRoutes";

const server = fastify()
const prisma = new PrismaClient()

server.get('/', async (request, reply) => {
    return { message: "Fucker"}
})

server.get('/ping', async (request, reply) => {
    return 'pong\n';
});

server.post('/user', async (request, reply) => {
    return 'creating a new user\n';
})

// userRoutes(server);


async function main()
{
    try
    {
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