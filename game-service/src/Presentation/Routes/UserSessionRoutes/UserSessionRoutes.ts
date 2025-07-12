import { FastifyRequest, FastifyReply } from 'fastify';
import { UserSessionController } from '../../Controllers/UserSessionController.js';
import { UserRepository } from '../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js';
import { User } from '../../../Domain/Entities/Concrete/User.js';
import { EmailVO } from '../../../Domain/ValueObjects/EmailVO.js';
import { PasswordHashVO } from '../../../Domain/ValueObjects/PasswordHashVO.js';
import crypto from 'crypto';
import fetch from 'node-fetch';
import { verifyGoogleCredential, findOrCreateUser, handleAuthError } from './GoogleAuthHelpers.js';

export const UserSessionRoutes = async (server: any, userSessionController: UserSessionController, userRepository: UserRepository): Promise<void> => {
    server.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        return userSessionController.Login(server, request, reply);
    });

    server.post('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
        return userSessionController.Logout(server, request, reply);
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
                return reply.status(500).send({ message: "Failed to process user in game-service." });
            }

            const token = server.jwt.sign({ uuid: user.uuid, isAuthenticated: true });
            return reply.send({ token });

        } catch (error: any) {
            return handleAuthError(error, server, reply);
        }
    });
};