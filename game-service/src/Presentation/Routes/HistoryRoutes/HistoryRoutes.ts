import {FastifyReply, FastifyRequest} from "fastify";
import {authenticateJWT} from "../../Middleware/AuthMiddleware";
import {CreateHistoryDTO} from "../../../Application/DTO/ToCommand/CreateHistoryDTO";
import {HistoryController} from "../../Controllers/HistoryController";

export const HistoryRoutes = async (server: any, historyController: HistoryController) =>
{
    server.post('/history', async (request: FastifyRequest<{ Body: CreateHistoryDTO }>, reply: FastifyReply) =>{
        return await historyController.CreateHistory(request, reply);
    });

    server.get('/history', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: { username: string }}>, reply: FastifyReply) =>{
        return await historyController.GetAllHistories(request, reply);
    });
}