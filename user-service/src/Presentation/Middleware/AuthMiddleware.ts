export const authenticateJWT = async (request: any, reply: any): Promise<void> => {
    try {
        await request.jwtVerify();
        
        if (request.url === '/users/me' && request.user && request.user.uuid) {
            request.query = request.query || {};
            request.query.uuid = request.user.uuid;
        }
    } catch (err) {
        reply.status(401).send({ message: 'Token inválido ou expirado' });
    }
}