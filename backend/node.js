const fastify = require('fastify')();

fastify.get('/', async (request, reply) => {
  return { message: 'Hello, World!' };
});

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
