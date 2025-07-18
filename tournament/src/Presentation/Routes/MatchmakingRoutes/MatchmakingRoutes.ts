import {authenticateJWT} from "../../Middleware/AuthMiddleware";
import {FastifyReply, FastifyRequest} from "fastify";

export const MatchmakingRoutes = async (server: any, matchmakingController: MatchmakingController) =>
{
    server.post('/matchmaking', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: GenerateMatchmakingDTO }>, reply: FastifyReply) => {
        await matchmakingController.GenerateMatchmaking(request, reply);
    })
}