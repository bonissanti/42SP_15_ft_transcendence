import * as bcrypt from "bcrypt";

export class PasswordHashVO
{
    private static readonly Salt: number = 10;
    private readonly PasswordHash: string;

    public constructor(passwordHash: string) {
        this.PasswordHash = passwordHash;
    }

    public static async Create(rawPassword: string): Promise<PasswordHashVO>
    {
        const salt: string = await bcrypt.genSalt(this.Salt);

        const hashedPassword = await bcrypt.hash(rawPassword, salt);

        return new PasswordHashVO(hashedPassword)
    }

    public static async Validate(rawPassword: string, passwordHash: string) : Promise<boolean>
    {
        return await bcrypt.compare(rawPassword, passwordHash);
    }

    public static ValidPassword(rawPassword: string) : boolean
    {
        if (rawPassword.length < 8 || rawPassword.length > 30)
            return false;
        return true;
    }

    public getPasswordHash(): string
    {
        return this.PasswordHash;
    }
}