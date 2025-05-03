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