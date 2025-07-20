export const authenticateJWT = async (request: any, reply: any): Promise<void> =>
{
    try
    {
        await request.jwtVerify();
    }
    catch (err)
    {
        reply.status(401).send({ message: '' });
    }
}

const jwt_secret = 'my-jwt';

const generateToken = (userId: number): string => {
    return jwt.sign({ userId }, jwt_secret, { expiresIn: '1h' });
}