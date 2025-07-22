import redis from "redis";

export class TokenBlacklistService
{
    private static redisClient = redis.createClient();
    private static readonly BLACKLIST_PREFIX = "blacklisted_token:";

    static async initialize()
    {
        await this.redisClient.connect();
    }

    static disconnect()
    {
        this.redisClient.destroy();
    }

    static async blacklistToken(token: string, expirationInSeconds?: number): Promise<void>
    {
        const key = this.BLACKLIST_PREFIX + token;

        if (expirationInSeconds)
            await this.redisClient.set(key, "1", { PX: expirationInSeconds });
        else
            await this.redisClient.set(key, "1");
    }

    static async isTokenBlacklisted(token: string): Promise<boolean>
    {
        const key = this.BLACKLIST_PREFIX + token;
        const result = await this.redisClient.get(key);
        return result !== null;
    }
}