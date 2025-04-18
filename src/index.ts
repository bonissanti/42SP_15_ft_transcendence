import fastify from 'fastify'
import prisma from "./Infrastructure/Client/PrismaClient";

const server = fastify()

server.get('/', async (request, reply) => {
    return { message: "Fucker"}
})

server.get('/ping', async (request, reply) => {
    return 'pong\n';
});

const runServer = async () => {
    try
    {
        await server.listen({port: 8080})
        console.log('Server listening at port 8080')
        await server.ready()
    }
    catch (err)
    {
        console.error('Error starting server:', err);
        await prisma.$disconnect();
        process.exit(1);
    }
}

runServer();
