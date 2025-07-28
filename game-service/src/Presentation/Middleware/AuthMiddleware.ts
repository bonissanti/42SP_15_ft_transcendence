export const authenticateJWT = async (request: any, reply: any): Promise<void> => {
    try {
        
        let token = request.cookies?.token;
        
        if (!token) {
            const authHeader = request.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
                console.log('Token from header:', token);
            } else {
                console.log('No token in header');
            }
        } else {
            console.log('Token from cookie:', token);
        }

        if (!token) {
            console.log('No token found!');
            return reply.code(401).send({ message: 'Unauthorized: No token provided' });
        }

        request.user = await request.server.jwt.verify(token);
        console.log('Request headers:', request.headers);
        console.log('Request cookies:', request.cookies);
        console.log('Token found:', token);
        console.log('Decoded token:', request.user);
        
    } catch (err) {
        console.error('JWT verification error:', err);
        reply.status(401).send({ message: 'Invalid token' });
    }
}