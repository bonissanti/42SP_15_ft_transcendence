import { FastifyRequest, FastifyReply } from 'fastify';
import { UserSessionController } from '../../Controllers/UserSessionController.js';
import { UserRepository } from '../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js';
import { verifyGoogleCredential, findOrCreateUser, handleAuthError } from './GoogleAuthHelpers.js';
import {UserSessionDTO} from "../../../Domain/DTO/Command/UserSessionDTO";

export const UserSessionRoutes = async (server: any, userSessionController: UserSessionController, userRepository: UserRepository): Promise<void> => {
    server.post('/login', async (request: FastifyRequest<{ Body: UserSessionDTO}>, reply: FastifyReply) => {
        return userSessionController.LoginUser(request, reply);
    });

    server.post('/logout', async (request: FastifyRequest<{ Body: UserSessionDTO}>, reply: FastifyReply) => {
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
                return reply.status(500).send({ message: "Failed to process user in backend." });
            }

            const token = server.jwt.sign({ uuid: user.uuid, isAuthenticated: true });
            return reply.send({ token });

        } catch (error: any) {
            return handleAuthError(error, server, reply);
        }
    });
};