const fastify = require('fastify')({ logger: true });
const path = require('path');
const fastifyStatic = require('@fastify/static');

const PORT = 8080;

fastify.register(fastifyStatic, {
  root: path.join(__dirname),
});

fastify.get('/pong', async (request, reply) => {
  return reply.sendFile('src/pong/pong.html');
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
