export class GetAllHistoryDTO
{
    public readonly username: string;

    constructor(username: string)
    {
        this.username = username;
    }
}