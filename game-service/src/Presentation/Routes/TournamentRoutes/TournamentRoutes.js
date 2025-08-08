"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentRoutes = void 0;
const AuthMiddleware_1 = require("../../Middleware/AuthMiddleware");
const opts = {
    schema: {
        body: {
            type: 'object',
            properties: {
                tournamentName: { type: 'string' },
                player1Username: { type: 'string' },
                player2Username: { type: 'string' },
                player3Username: { type: 'string' },
                player4Username: { type: 'string' },
            },
            required: ['tournamentName', 'player1Username', 'player2Username', 'player3Username', 'player4Username'],
            additionalProperties: false,
        }
    }
};
const TournamentRoutes = async (server, tournamentController) => {
    server.post('/tournament', { preHandler: AuthMiddleware_1.authenticateJWT }, async (request, reply) => {
        return await tournamentController.CreateTournament(request, reply);
    });
    server.put('/tournament', { preHandler: AuthMiddleware_1.authenticateJWT }, async (request, reply) => {
        return await tournamentController.EditTournament(request, reply);
    });
    server.delete('/tournament', { preHandler: AuthMiddleware_1.authenticateJWT }, async (request, reply) => {
        return await tournamentController.DeleteTournament(request, reply);
    });
    server.get('/tournament/:uuid', { preHandler: AuthMiddleware_1.authenticateJWT }, async (request, reply) => {
        return await tournamentController.GetTournament(request, reply);
    });
    server.get('/tournament/', { preHandler: AuthMiddleware_1.authenticateJWT }, async (request, reply) => {
        return await tournamentController.GetAllTournaments(request, reply);
    });
};
exports.TournamentRoutes = TournamentRoutes;
