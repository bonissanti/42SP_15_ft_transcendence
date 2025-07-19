import {TournamentController} from "../../Controllers/TournamentController";
import {authenticateJWT} from "../../Middleware/AuthMiddleware";
import {FastifyReply, FastifyRequest} from "fastify";
import {CreateTournamentDTO} from "../../../Application/DTO/ToCommand/CreateTournamentDTO";
import {EditTournamentDTO} from "../../../Application/DTO/ToCommand/EditTournamentDTO";
import {DeleteTournamentDTO} from "../../../Application/DTO/ToCommand/DeleteTournamentDTO";
import {GetTournamentDTO} from "../../../Application/DTO/ToQuery/GetTournamentDTO";
import {GetAllTournamentsDTO} from "../../../Application/DTO/ToQuery/GetAllTournamentsDTO";

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

export const TournamentRoutes = async (server: any, tournamentController: TournamentController) =>
{
    server.post('/tournament', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: CreateTournamentDTO }>, reply: FastifyReply) => {
        return await tournamentController.CreateTournament(request, reply);
    });

    server.put('/tournament', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: EditTournamentDTO }>, reply: FastifyReply) => {
        await tournamentController.EditTournament(request, reply);
    });

    server.delete('/tournament', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: DeleteTournamentDTO }>, reply: FastifyReply) => {
        await tournamentController.DeleteTournament(request, reply);
    });

    server.get('/tournament/:uuid', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: GetTournamentDTO }>, reply: FastifyReply) => {
        await tournamentController.GetTournament(request, reply);
    });

    server.get('/tournament/', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Querystring: GetAllTournamentsDTO }>, reply: FastifyReply) => {
        await tournamentController.GetAllTournaments(request, reply);
    });
}
