export class GetAllHistoriesDTO
{
    public readonly username: string;

    constructor(username: string)
    {
        this.username = username;
    }
}