import {FastifyReply, FastifyRequest} from "fastify";
import {CreateUserDTO} from "../../../Domain/DTO/Command/CreateUserDTO.js";
import {authenticateJWT} from "../../Middleware/AuthMiddleware.js";
import {EditUserDTO} from "../../../Domain/DTO/Command/EditUserDTO.js";
import {DeleteUserDTO} from "../../../Domain/DTO/Command/DeleteUserDTO.js";
import {GetUserDTO} from "../../../Domain/DTO/Query/GetUserDTO.js";
import {UserController} from "../../Controllers/UserController.js";

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

export const UserRoutes = async (server: any, userController: UserController) => {

    server.post('/user', opts, async (request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) =>
        await userController.CreateUser(request, reply))

    server.put('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: EditUserDTO }>, reply: FastifyReply) =>
        await userController.EditUser(request, reply))

    server.delete('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: DeleteUserDTO }>, reply: FastifyReply) =>
        await userController.DeleteUser(request, reply))

    server.get('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: GetUserDTO }>, reply: FastifyReply) =>
        await userController.GetUser(request, reply))

}