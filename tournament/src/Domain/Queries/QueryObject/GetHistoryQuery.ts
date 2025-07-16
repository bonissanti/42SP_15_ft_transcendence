export class GetHistoryQuery
{
    public readonly username: string;

    constructor(username: string)
    {
        this.username = username;
    }
}