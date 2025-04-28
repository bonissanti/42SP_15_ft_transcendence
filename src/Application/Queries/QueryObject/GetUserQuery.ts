export class GetUserQuery
{
    public readonly Uuid: string;
    public readonly Username: string;

    constructor(uuid: string, username: string)
    {
        this.Uuid = uuid;
        this.Username = username;
    }
}