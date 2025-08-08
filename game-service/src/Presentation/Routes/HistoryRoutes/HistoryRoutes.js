"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryRoutes = void 0;
const AuthMiddleware_1 = require("../../Middleware/AuthMiddleware");
const HistoryRoutes = async (server, historyController) => {
    server.post('/history', async (request, reply) => {
        return await historyController.CreateHistory(request, reply);
    });
    server.get('/history', { preHandler: AuthMiddleware_1.authenticateJWT }, async (request, reply) => {
        return await historyController.GetAllHistories(request, reply);
    });
    server.get('/test', { preHandler: AuthMiddleware_1.authenticateJWT }, async (request, reply) => {
        if (request.user) {
            console.log('Authenticated user:', request.user);
            return reply.send({ message: 'Test route accessed successfully', user: request.user });
        }
        console.log('No authenticated user found in request');
        return reply.status(401).send({ message: 'Unauthorized: No user found' });
    });
};
exports.HistoryRoutes = HistoryRoutes;
