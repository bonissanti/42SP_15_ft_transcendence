import redis from "redis";

export class TokenBlacklistService {
    private static redisClient = redis.createClient();
    private static readonly BLACKLIST_PREFIX = "blacklisted_token:";
    private static isConnected = false;
    private static inMemoryBlacklist: Map<string, number> = new Map();

    static async initialize() {
        try {
            await this.redisClient.connect();
            this.isConnected = true;
        } catch (error) {
            this.isConnected = false;
        }
    }

    static disconnect() {
        if (this.isConnected) {
            this.redisClient.destroy();
        }
        this.inMemoryBlacklist.clear();
    }

    static async blacklistToken(token: string, expirationInSeconds?: number): Promise<void> {
        if (this.isConnected) {
            try {
                const key = this.BLACKLIST_PREFIX + token;
                if (expirationInSeconds) {
                    await this.redisClient.set(key, "1", { PX: expirationInSeconds * 1000 });
                } else {
                    await this.redisClient.set(key, "1");
                }
                return;
            } catch (error) {
                console.error("Erro ao adicionar token à blacklist Redis:", error);
            }
        }
        
        const expiryTime = expirationInSeconds 
            ? Date.now() + (expirationInSeconds * 1000)
            : Date.now() + (24 * 60 * 60 * 1000);
        this.inMemoryBlacklist.set(token, expiryTime);
    }

    static async isTokenBlacklisted(token: string): Promise<boolean> {
        if (this.isConnected) {
            try {
                const key = this.BLACKLIST_PREFIX + token;
                const result = await this.redisClient.get(key);
                return result !== null;
            } catch (error) {
                console.error("Erro ao verificar blacklist Redis:", error);
            }
        }
        
        const expiry = this.inMemoryBlacklist.get(token);
        if (!expiry) return false;
        
        if (expiry <= Date.now()) {
            this.inMemoryBlacklist.delete(token);
            return false;
        }
        
        return true;
    }
}