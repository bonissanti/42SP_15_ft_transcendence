export class PasswordHashVO
{
    public readonly passwordHash: string;

    constructor (rawPassword: string)
    {
        this.passwordHash = rawPassword;
    }

    //Todo: converter password para hash
}