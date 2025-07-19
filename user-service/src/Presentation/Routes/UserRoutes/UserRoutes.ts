import {FastifyReply, FastifyRequest} from "fastify";
import {CreateUserDTO} from "../../../Application/DTO/ToCommand/CreateUserDTO.js";
import {authenticateJWT} from "../../Middleware/AuthMiddleware.js";
import {EditUserDTO} from "../../../Application/DTO/ToCommand/EditUserDTO.js";
import {DeleteUserDTO} from "../../../Application/DTO/ToCommand/DeleteUserDTO.js";
import {GetUserDTO} from "../../../Application/DTO/ToQuery/GetUserDTO.js";
import {UserController} from "../../Controllers/UserController.js";
import {UpdateStatsDTO} from "../../../Application/DTO/ToCommand/UpdateStatsDTO.js";

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

const optsChecker = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                uuids: {type: 'array', items: {type: 'string'}},
            },
            required: ['uuids'],
            additionalProperties: false,
        }
    }
}

export const UserRoutes = async (server: any, userController: UserController) => {
    
    server.post('/user', opts, async (request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) => {
        await userController.CreateUser(request, reply);
    });

    server.put('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: EditUserDTO }>, reply: FastifyReply) => {
        await userController.EditUser(request, reply);
    });

    server.delete('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: DeleteUserDTO }>, reply: FastifyReply) => {
        await userController.DeleteUser(request, reply);
    });

    server.get('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: GetUserDTO }>, reply: FastifyReply) => {
        await userController.GetUser(request, reply);
    });

    server.get('/users/exists', optsChecker, async (request: FastifyRequest<{ Querystring: { uuids: string[] }}>, reply: FastifyReply) => {
        await userController.VerifyIfUsersExists(request, reply);
    })

    server.get('/users/:uuid', userController.findOne.bind(userController));

    server.get('/users/me', { preHandler: authenticateJWT }, async (request: FastifyRequest <{ Querystring: GetUserDTO }>, reply: FastifyReply) => {
        if (!request || !request.query.uuid) {
            return reply.status(400).send({ message: "UUID do usuário inválido." });
        }
        await userController.GetUser(request, reply);
    });

    server.put('/updateStats', { preHandler: authenticateJWT }, async (request: FastifyRequest <{ Body: UpdateStatsDTO }>,  reply: FastifyReply) => {
        await userController.UpdateStats(request, reply);
    });
}