import {UserSessionController} from "../../Controllers/UserSessionController.js";
import {authenticateJWT} from "../../Middleware/AuthMiddleware.js";
import {FastifyReply, FastifyRequest} from "fastify";
import {UserSessionDTO} from "../../../Domain/DTO/Command/UserSessionDTO.js";

export const UserSessionRoutes = async (server: any, userSessionController: UserSessionController): Promise<void> => {

    server.post('/login', async (request: FastifyRequest<{ Body: UserSessionDTO }>, reply: FastifyReply)=> {
        const result = await userSessionController.LoginUser(request, reply)

        if (result.isSucess)
        {
            const token = server.jwt.sign({ uuid: request.body.uuid, isAuthenticated: true })
            return reply.send({ token: token })
        }
        return result;
    })

    server.post('/logout', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: UserSessionDTO }>, reply: FastifyReply)=>
        userSessionController.LogoutUser(request, reply))
}