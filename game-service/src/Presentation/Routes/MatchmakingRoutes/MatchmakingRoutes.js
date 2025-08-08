"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingRoutes = void 0;
const AuthMiddleware_1 = require("../../Middleware/AuthMiddleware");
const opts = {
    schema: {
        Querystring: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                wins: { type: 'number' },
                totalGames: { type: 'number' },
            },
            required: ['username', 'wins', 'totalGames'],
            additionalProperties: false,
        }
    }
};
const MatchmakingRoutes = async (server, matchmakingController) => {
    server.get('/matchmaking', { preHandler: AuthMiddleware_1.authenticateJWT }, async (request, reply) => {
        return await matchmakingController.GenerateMatchmaking(request, reply);
    });
};
exports.MatchmakingRoutes = MatchmakingRoutes;
