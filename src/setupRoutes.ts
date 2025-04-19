import {UserController} from "./Presentation/Controllers/UserController.js";
import {FastifyInstance} from "fastify";
import {CreateUserDTO} from "./Domain/DTO/Command/CreateUserDTO.js";

export const userRoutes = (server: FastifyInstance): void => {
    const userController = new UserController();

    server.post<{ Body: CreateUserDTO; }>('/createUser', async (request, reply) =>
        userController.CreateUser(request, reply))
}

