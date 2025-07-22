import {TokenBlacklistService} from "../../Application/Services/Concrete/TokenBlacklistService.js";
import {JWTPayload} from "./JWTPayload.js";

// declare module 'fastify'{
//     interface FastifyRequest{
//         user?: JWTPayload;
//     }
// }

export const authenticateJWT = async (request: any, reply: any): Promise<void> =>
{
    try
    {
        const token = request.cookies.token;

        if (!token)
            return reply.code(401).send({ message: 'Unauthorized: No token provided' });

        if (await TokenBlacklistService.isTokenBlacklisted(token))
            return reply.code(401).send({ message: 'Unauthorized: Token has been revoked' });

        request.user = request.server.jwt.verify(token);
    }
    catch (err)
    {
        reply.status(401).send({ message: 'Invalid token - AuthenticateJWT' });
    }
}