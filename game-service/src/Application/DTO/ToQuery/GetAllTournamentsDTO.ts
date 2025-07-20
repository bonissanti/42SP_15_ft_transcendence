export class GetAllTournamentsDTO
{
    public readonly username: string;

    constructor(username: string)
    {
        this.username = username;
    }
}