import { FastifyInstance, FastifyReply } from 'fastify';
import { UserRepository } from '../../../Infrastructure/Persistence/Repositories/Concrete/UserRepository.js';
import { User } from '../../../Domain/Entities/Concrete/User.js';
import { EmailVO } from '../../../Domain/ValueObjects/EmailVO.js';
import { PasswordHashVO } from '../../../Domain/ValueObjects/PasswordHashVO.js';
import crypto from 'crypto';
import fetch from 'node-fetch';

type GooglePayload = {
    sub: string;
    email: string;
    name?: string;
    picture?: string;
};

export async function verifyGoogleCredential(credential: string, server: FastifyInstance): Promise<GooglePayload> {
    const authServiceUrl = 'http://auth-service:3000/auth/google';

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
        throw new Error('Invalid payload from auth service.');
    }

    return googlePayload;
}

export async function findOrCreateUser(payload: GooglePayload, userRepository: UserRepository, server: FastifyInstance) {
    let user = await userRepository.prisma.user.findUnique({ where: { auth0Id: payload.sub } });
    if (user) return user;

    user = await userRepository.prisma.user.findUnique({ where: { email: payload.email } });
    if (user) {
        return userRepository.prisma.user.update({
            where: { email: payload.email },
            data: {
                auth0Id: payload.sub,
                profilePic: user.profilePic || payload.picture || null
            },
        });
    }

    return await createNewUserFromGoogle(payload, userRepository);
}

async function createNewUserFromGoogle(payload: GooglePayload, userRepository: UserRepository) {
    const emailVO = EmailVO.AddEmail(payload.email);

    let username = (payload.name || payload.email.split('@')[0]);
    if (await userRepository.VerifyIfUserExistsByUsername(username)) {
        username = `${username}_${payload.sub.slice(0, 4)}`;
    }

    const randomPassword = crypto.randomBytes(16).toString('hex');
    const passwordHash = await PasswordHashVO.Create(randomPassword);

    const userEntity = new User(emailVO, passwordHash, username, payload.picture || null, new Date(), true, 0, 0, 0);
    userEntity.ChangeAuth0Id(payload.sub);

    await userRepository.Create(userEntity);
    return userRepository.prisma.user.findUnique({ where: { uuid: userEntity.Uuid } });
}

export function handleAuthError(error: any, server: FastifyInstance, reply: FastifyReply) {
    console.error("ERRO DETALHADO NO FLUXO DE AUTENTICAÇÃO:", error);
    server.log.error({
        message: "Error during Google auth flow",
        errorMessage: error.message,
        errorStack: error.stack,
    });

    if (error.code === 'P2002') {
        return reply.status(409).send({ message: 'User data conflicts with an existing account.' });
    }

    return reply.status(500).send({ message: error.message || 'Authentication flow failed.' });
}