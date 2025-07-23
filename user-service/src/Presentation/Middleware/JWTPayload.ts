export interface JWTPayload
{
    userId: string;
    isAuthenticated: boolean;
    iat?: number; //issuedAt
    exp?: number; //expiresAt
}