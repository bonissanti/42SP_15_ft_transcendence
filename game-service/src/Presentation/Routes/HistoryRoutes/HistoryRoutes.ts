import {FastifyReply, FastifyRequest} from "fastify";
import {authenticateJWT} from "../../Middleware/AuthMiddleware";
import {CreateHistoryDTO} from "../../../Application/DTO/ToCommand/CreateHistoryDTO";
import {HistoryController} from "../../Controllers/HistoryController";

export const HistoryRoutes = async (server: any, historyController: HistoryController) =>
{
    server.post('/history', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: CreateHistoryDTO }>, reply: FastifyReply) =>{
        console.log('Creating history with request:', request.body);
        const response = await historyController.CreateHistory(request, reply);
        console.log('History created:', response);
        return response;
    });

    server.get('/history', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: { username: string }}>, reply: FastifyReply) =>{
        await historyController.GetAllHistories(request, reply);
    });

    server.get('/test', { preHandler: authenticateJWT }, async (request: FastifyRequest, reply: FastifyReply) => {
        if( request.user) {
            console.log('Authenticated user:', request.user);
            return reply.send({ message: 'Test route accessed successfully', user: request.user });
        }
        console.log('No authenticated user found in request');
        return reply.status(401).send({ message: 'Unauthorized: No user found' });
    });
};