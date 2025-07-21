import * as bcrypt from "bcrypt";

export class EmailVO
{
    private static readonly Salt: number = 10;
    private static emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    private readonly Email: string;

    private constructor(rawEmail: string)
    {
        this.Email = rawEmail;
    }

    public static ValidEmail(rawEmail: string): boolean
    {
        rawEmail = this.NormalizeEmail(rawEmail);

        return this.emailRegex.test(rawEmail);
    }

    public static NormalizeEmail(rawEmail: string) : string
    {
        rawEmail.toLowerCase();
        rawEmail.trim();
        return rawEmail;
    }

    public static async AddEmailWithHash(rawEmail: string): Promise<EmailVO>
    {
        rawEmail = this.NormalizeEmail(rawEmail);

        const salt: string = await bcrypt.genSalt(this.Salt);

        const hashedEmail = await bcrypt.hash(rawEmail, salt);

        return new EmailVO(hashedEmail);
    }

    public static AddEmail(rawEmail: string): EmailVO
    {
        rawEmail = this.NormalizeEmail(rawEmail);

        return new EmailVO(rawEmail);
    }

    public getEmail() : string
    {
        return this.Email;
    }
}