import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import jwt from 'jsonwebtoken';

export interface IAuthOptions extends FastifyPluginOptions {
  GOOGLE_CLIENT_ID: string;
  JWT_SECRET: string;
}

async function authRoutesPlugin(server: FastifyInstance, options: IAuthOptions & { prefix?: string }) {
  console.log("✅ authRoutes plugin carregado com sucesso");
  console.log("Body do plugin:", options);
  const googleClient = new OAuth2Client(options.GOOGLE_CLIENT_ID);

  server.post<{ Body: { credential?: string } }>('/auth/google', async (request, reply) => {
    const { credential } = request.body;

    if (!credential) {
      return reply.code(400).send({ error: 'Credential not provided' });
    }

    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: options.GOOGLE_CLIENT_ID,
      });

      const payload: TokenPayload | undefined = ticket.getPayload();

      if (!payload) {
        return reply.code(401).send({ error: 'Invalid Google token' });
      }
      const { exp, ...payloadWithoutExp } = payload;

      const jwtToken = jwt.sign(payloadWithoutExp, options.JWT_SECRET, { expiresIn: '1h' });

      return reply.send({
        token: jwtToken,
        user: payload,
      });

    } catch (error) {
      console.error(error);
      return reply.code(500).send({ error: 'Authentication failed' });
    }
  });
}

export const authRoutes = fp(authRoutesPlugin);
