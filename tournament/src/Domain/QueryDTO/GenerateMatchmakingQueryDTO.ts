export class GenerateMatchmakingQueryDTO
{
    public readonly uuid: string;
    public readonly username: string;
    public readonly wins: number;
    public readonly profilePic?: string;

    constructor(uuid: string, username: string, wins: number, profilePic?: string)
    {
        this.uuid = uuid;
        this.username = username;
        this.wins = wins;
        this.profilePic = profilePic;
    }
}