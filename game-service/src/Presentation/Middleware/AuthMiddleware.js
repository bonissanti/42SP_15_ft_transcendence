"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const authenticateJWT = async (request, reply) => {
    try {
        let token = request.cookies?.token;
        if (!token) {
            const authHeader = request.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        if (!token) {
            return reply.code(401).send({ message: 'Unauthorized: No token provided' });
        }
        request.user = await request.server.jwt.verify(token);
    }
    catch (err) {
        reply.status(401).send({ message: 'Invalid token' });
    }
};
exports.authenticateJWT = authenticateJWT;
