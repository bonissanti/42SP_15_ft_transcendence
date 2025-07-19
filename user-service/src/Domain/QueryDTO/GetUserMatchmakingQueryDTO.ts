export class GetUserMatchmakingQueryDTO
{
    public readonly uuid: string;
    public readonly email: string;
    public readonly username: string;
    public readonly profilePic: string | null;
    public readonly matchesPlayed: number;
    public readonly wins: number;
    public readonly loses: number;
    public readonly winRatio: number;

    constructor(uuid: string, email: string, username: string, profilePic: string | null, matchesPlayed: number, wins: number, loses: number, winRatio: number)
    {
        this.uuid = uuid;
        this.email = email;
        this.username = username;
        this.profilePic = profilePic;
        this.matchesPlayed = matchesPlayed;
        this.wins = wins;
        this.loses = loses;
        this.winRatio = winRatio;
    }
}