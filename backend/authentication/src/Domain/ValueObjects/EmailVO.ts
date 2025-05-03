export class EmailVO
{
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