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
    
    server.post('/user', opts, async (request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply) => {
        console.log("LOG: Requisição recebida em /api/user"); // <--- ADICIONAR LOG
        await userController.CreateUser(request, reply);
    });

    server.put('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: EditUserDTO }>, reply: FastifyReply) => {
        console.log("LOG: Requisição recebida em /api/user"); // <--- ADICIONAR LOG
        await userController.EditUser(request, reply);
    });

    server.delete('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: DeleteUserDTO }>, reply: FastifyReply) => {
        console.log("LOG: Requisição recebida em /api/user"); // <--- ADICIONAR LOG
        await userController.DeleteUser(request, reply);
    });

    server.get('/user', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: GetUserDTO }>, reply: FastifyReply) => {
        console.log("LOG: Requisição recebida em /api/user"); // <--- ADICIONAR LOG
        await userController.GetUser(request, reply);
    });

    server.get('/users/:uuid', userController.findOne.bind(userController));

    server.get('/users/me', { preHandler: authenticateJWT }, async (request: FastifyRequest, reply: FastifyReply) => {
        console.log("LOG: Requisição recebida em /api/users/me"); // <--- ADICIONAR LOG
        const userPayload = request.user as { uuid: string };
        console.log("LOG: Payload do usuário (JWT):", userPayload); // <--- ADICIONAR LOG
        
        if (!userPayload || !userPayload.uuid) {
            console.error("LOG: UUID do usuário não encontrado no token JWT."); // <--- ADICIONAR LOG
            return reply.status(400).send({ message: "UUID do usuário inválido." });
        }
        
        const userDTO = new GetUserDTO(userPayload.uuid); 
        const result = await userController.getUserService.Execute(userDTO, reply);
        return userController.handleResult(result, reply, userController.notificationError);
    });

}