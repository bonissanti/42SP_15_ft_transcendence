import fastify, { FastifyInstance } from 'fastify';
import fastifyJwt from "@fastify/jwt";

import { UserController } from "./Presentation/Controllers/UserController.js";
import { UserSessionController } from "./Presentation/Controllers/UserSessionController.js";
import { UserRoutes } from "./Presentation/Routes/UserRoutes/UserRoutes.js";
import { UserSessionRoutes } from "./Presentation/Routes/UserSessionRoutes/UserSessionRoutes.js";

import { PrismaClient } from '@prisma/client';
import { UserRepository } from './Infrastructure/Persistence/Repositories/Concrete/UserRepository.js';
import { CreateUserService } from './Application/Services/Concrete/CreateUserService.js';
import { EditUserService } from './Application/Services/Concrete/EditUserService.js';
import { DeleteUserService } from './Application/Services/Concrete/DeleteUserService.js';
import { GetUserService } from './Application/Services/Concrete/GetUserService.js';
import { NotificationError } from './Shared/Errors/NotificationError.js';
import { LoginUserService } from './Application/Services/Concrete/LoginUserService.js';
import { LogoutUserService } from './Application/Services/Concrete/LogoutUserService.js';
import {VerificationService} from "./Application/Services/Concrete/VerificationService.js";

declare module 'fastify' {
  export interface FastifyInstance {
    userRepository: UserRepository;
  }
}

const server: FastifyInstance = fastify();

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'transcendence' 
});

server.get('/', async (request, reply) => {
  return 'Rodando!';
});

server.get('/health', async (request, reply) => {
  return { status: 'ok', time: new Date() };
});

async function main() {
  const prisma = new PrismaClient();
  const userRepository = new UserRepository(prisma);
  const notificationError = new NotificationError();

  server.decorate('userRepository', userRepository);

  const createUserService = new CreateUserService(userRepository, notificationError);
  const editUserService = new EditUserService(userRepository, notificationError);
  const deleteUserService = new DeleteUserService(userRepository, notificationError);
  const getUserService = new GetUserService(userRepository, notificationError);
  const verificationService = new VerificationService(userRepository, notificationError);
  const loginUserService = new LoginUserService(userRepository, notificationError);
  const logoutUserService = new LogoutUserService(userRepository, notificationError);

  const userController = new UserController(
    createUserService,
    editUserService,
    deleteUserService,
    getUserService,
    userRepository,
    verificationService
  );

  const userSessionController = new UserSessionController(
    loginUserService,
    logoutUserService
  );

  await UserRoutes(server, userController);
  await UserSessionRoutes(server, userSessionController, userRepository);

  server.setErrorHandler(async (error, request, reply) => {
    console.error("Internal server error:", error);
    reply.status(500).send({ message: "Ocorreu um erro interno." });
  });

  try {
    const address = await server.listen({ port: 8080, host: '0.0.0.0' });
    console.log(`Server listening at ${address}`);
  } catch (err) {
    console.error("Falha ao iniciar o servidor:", err);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
