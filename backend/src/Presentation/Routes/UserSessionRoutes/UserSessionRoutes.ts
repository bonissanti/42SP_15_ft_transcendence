import { FastifyRequest, FastifyReply } from 'fastify';
import { UserSessionController } from '../../Controllers/UserSessionController.js';
import { UserRepository } from '../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js';
import { User } from '../../../Domain/Entities/Concrete/User.js';
import { EmailVO } from '../../../Domain/ValueObjects/EmailVO.js';
import { PasswordHashVO } from '../../../Domain/ValueObjects/PasswordHashVO.js';
import crypto from 'crypto';
import fetch from 'node-fetch';

export const UserSessionRoutes = async (server: any, userSessionController: UserSessionController, userRepository: UserRepository): Promise<void> => {
    server.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        return userSessionController.Login(server, request, reply);
    });

    server.post('/logout', async (request: FastifyRequest, reply: FastifyReply) => {
        return userSessionController.Logout(server, request, reply);
    });

    server.post('/auth/google', async (request: FastifyRequest<{ Body: { credential?: string } }>, reply: FastifyReply) => {
        console.log("🔄 RECEBENDO CREDENCIAL DO FRONTEND:", request.body);
        const { credential } = request.body;
        if (!credential) {
            return reply.status(400).send({ message: 'Credential not provided from frontend.' });
        }

        try {
            const authServiceUrl = 'http://authentication:3000/auth/google';

            const authResponse = await fetch(authServiceUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential }),
            });

            if (!authResponse.ok) {
                const errorBody = await authResponse.json();
                server.log.error("Auth service verification failed:", errorBody);
                throw new Error(errorBody.message || 'Auth service verification failed');
            }

            const { user: googlePayload } = await authResponse.json();

            if (!googlePayload || !googlePayload.sub || !googlePayload.email) {
                return reply.status(400).send({ message: 'Invalid payload from auth service.' });
            }

            let user = await userRepository.prisma.user.findUnique({ where: { auth0Id: googlePayload.sub } });

            if (!user) {
                user = await userRepository.prisma.user.findUnique({ where: { email: googlePayload.email } });

                if (user) {
                    user = await userRepository.prisma.user.update({
                        where: { email: googlePayload.email },
                        data: { 
                            auth0Id: googlePayload.sub,
                            profilePic: user.profilePic || googlePayload.picture || null
                        },
                    });
                }
            }

            if (!user) {
                const emailVO = EmailVO.AddEmail(googlePayload.email);
                
                let username = (googlePayload.name || googlePayload.email.split('@')[0]);
                if (await userRepository.VerifyIfUserExistsByUsername(username)) {
                    username = `${username}_${googlePayload.sub.slice(0, 4)}`;
                }

                const randomPassword = crypto.randomBytes(16).toString('hex');
                const passwordHash = await PasswordHashVO.Create(randomPassword);

                const userEntity = new User(emailVO, passwordHash, username, googlePayload.picture || null, new Date(), 0, 0, 0);
                userEntity.ChangeAuth0Id(googlePayload.sub);
                
                await userRepository.Create(userEntity);
                user = await userRepository.prisma.user.findUnique({ where: { uuid: userEntity.Uuid } });
            }

            if (!user) {
                return reply.status(500).send({ message: "Failed to process user in backend." });
            }

            const token = server.jwt.sign({ uuid: user.uuid, isAuthenticated: true });
            console.log("🔑 TOKEN GERADO PARA UUID:", user.uuid);
            return reply.send({ token: token });

        } catch (error: any) {
            console.error("ERRO DETALHADO NO FLUXO DE AUTENTICAÇÃO:", error);

            server.log.error({
                message: "Error during Google auth flow",
                errorMessage: error.message,
                errorStack: error.stack,
                errorName: error.name,
                errorCode: error.code,
                errorMeta: error.meta,
            });

            if (error.code === 'P2002') {
                return reply.status(409).send({ message: 'User data conflicts with an existing account.' });
            }

            return reply.status(500).send({ message: 'Authentication flow failed.' });
        }
    });
};
