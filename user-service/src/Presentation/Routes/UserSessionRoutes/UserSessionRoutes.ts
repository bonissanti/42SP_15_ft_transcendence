import { FastifyRequest, FastifyReply } from 'fastify';
import { UserSessionController } from '../../Controllers/UserSessionController.js';
import { UserRepository } from '../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js';
import { verifyGoogleCredential, findOrCreateUser, handleAuthError } from './GoogleAuthHelpers.js';
import {UserSessionDTO} from "../../../Application/DTO/ToCommand/UserSessionDTO.js";
import {authenticateJWT} from "../../Middleware/AuthMiddleware.js";

export const UserSessionRoutes = async (server: any, userSessionController: UserSessionController, userRepository: UserRepository): Promise<void> => {
    server.post('/login', async (request: FastifyRequest<{ Body: UserSessionDTO}>, reply: FastifyReply) => {
        return userSessionController.LoginUser(request, reply);
    });

    server.post('/logout', { preHandler: authenticateJWT }, async (request: FastifyRequest<{ Body: UserSessionDTO}>, reply: FastifyReply) => {
        return userSessionController.LogoutUser(request, reply);
    });

    server.post('/auth/google', async (request: FastifyRequest<{ Body: { credential?: string } }>, reply: FastifyReply) => {
        try {
            const { credential } = request.body;
            if (!credential) {
                return reply.status(400).send({ message: 'Credential not provided from frontend.' });
            }

            const googlePayload = await verifyGoogleCredential(credential, server);
            const user = await findOrCreateUser(googlePayload, userRepository, server);

            if (!user) {
                return reply.status(500).send({ message: "Failed to process user in game-service-bkp." });
            }

            const token = server.jwt.sign({ uuid: user.uuid, isAuthenticated: true }, { expiresIn: '1d' });
            
            reply.setCookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 3600
            });
            
            
            return reply.send({ 
                message: 'Authentication successful.', 
                user: { uuid: user.uuid },
                token: token,
            });

        } catch (error: any) {
            return handleAuthError(error, server, reply);
        }
    });
};