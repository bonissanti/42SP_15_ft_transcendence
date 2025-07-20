export class VerifyIfUserExistsByUsernameQuery
{
    constructor (public readonly username: string){}

    public static fromQuery(query: VerifyIfUserExistsByUsernameQuery): VerifyIfUserExistsByUsernameQuery
    {
        return new VerifyIfUserExistsByUsernameQuery(query.username);
    }
}