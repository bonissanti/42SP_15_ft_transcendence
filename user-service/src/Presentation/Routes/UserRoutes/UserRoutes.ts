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

const optsUsernamesChecker = {
  schema: {
    querystring: {
      type: 'object',
      required: ['usernames'],
      properties: {
        usernames: { type: 'array', items: { type: 'string' } }
      }
    }
  }
};

const updateStatsOpts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                player1Username: { type: 'string' },
                player1Points: { type: 'number' },
                player2Username: { type: 'string' },
                player2Points: { type: 'number' },
                player3Username: { type: ['string', 'null'] },
                player3Points: { type: ['number', 'null'] },
                player4Username: { type: ['string', 'null'] },
                player4Points: { type: ['number', 'null'] },
            },
            required: ['player1Username', 'player1Points', 'player2Username', 'player2Points'],
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

    server.get('/users/exists/uuids', optsChecker, async (request: FastifyRequest<{ Querystring: { uuids: (string | null)[] }}>, reply: FastifyReply) => {
        await userController.VerifyIfUsersExistsByUuids(request, reply);
    })

    server.get('/users/exists/usernames', optsUsernamesChecker, async (request: FastifyRequest<{ Querystring: { usernames: (string | null)[] }}>, reply: FastifyReply) => {
        await userController.VerifyIfUsersExistsByUsernames(request, reply);
    })

    server.get('/users/exists/:username', { preHandler: authenticateJWT }, async (request: FastifyRequest <{ Querystring: { username: string }}>, reply: FastifyReply) => {
        await userController.VerifyIfUserExistsByUsername(request, reply);
    })

    server.get('/users/:uuid', userController.findOne.bind(userController));

    server.get('/users/me', { preHandler: authenticateJWT }, async (request: FastifyRequest, reply: FastifyReply) => {
        const userPayload = request.user as { uuid: string };
        
        if (!userPayload || !userPayload.uuid) {
            return reply.status(400).send({ message: "UUID do usuário inválido." });
        }

        const getUserDTO = new GetUserDTO(userPayload.uuid);
        
        const modifiedRequest = {
            ...request,
            query: getUserDTO
        } as FastifyRequest<{ Querystring: GetUserDTO }>;

        await userController.GetUser(modifiedRequest, reply);
    });

    server.put('/users/me/status', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: { isOnline: boolean } }>, reply: FastifyReply) => {
        const userPayload = request.user as { uuid: string };
        const { isOnline } = request.body;

        if (!userPayload || !userPayload.uuid) {
            return reply.status(400).send({ message: "UUID do usuário inválido." });
        }

        await userController.UpdateUserStatus(userPayload.uuid, isOnline, reply);
    });

    server.get('/users', { preHandler: authenticateJWT }, async (request: FastifyRequest, reply: FastifyReply) => {
        await userController.GetAllUsers(request, reply);
    });

    server.put('/updateStats', updateStatsOpts, async (request: FastifyRequest <{ Body: UpdateStatsDTO }>,  reply: FastifyReply) => {
        await userController.UpdateStats(request, reply);
    });
}