import {FastifyReply, FastifyRequest} from "fastify";
import {authenticateJWT} from "../../Middleware/AuthMiddleware";
import {CreateHistoryDTO} from "../../../Application/DTO/ToCommand/CreateHistoryDTO";
import {HistoryController} from "../../Controllers/HistoryController";

const opts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                tournamentName: {type: 'string'},
                player1Uuid: {type: 'string'},
                player2Uuid: {type: 'string'},
                player3Uuid: {type: 'string'},
                player4Uuid: {type: 'string'},
            },
            required: ['tournamentName', 'player1Uuid', 'player2Uuid', 'player3Uuid', 'player4Uuid'],
            additionalProperties: false,
        }
    }
}

export const HistoryRoutes = async (server: any, historyController: HistoryController) =>
{
    server.post('/history', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: CreateHistoryDTO }>, reply: FastifyReply) =>{
        await historyController.CreateHistory(request, reply);
    });

    server.get('/history/', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: { username: string }}>, reply: FastifyReply) =>{
        await historyController.GetAllHistories(request, reply);
    });
}