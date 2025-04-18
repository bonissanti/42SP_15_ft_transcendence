import {UserController} from "./Presentation/Controllers/UserController";
import {FastifyInstance} from "fastify";
import {CreateUserDTO} from "./Domain/DTO/Command/CreateUserDTO";

export const userRoutes = (server: FastifyInstance): void => {
    const userController = new UserController();

    server.post<{ Body: CreateUserDTO; }>('/createUser', async (request, reply) =>
        userController.CreateUser(request, reply))
}

