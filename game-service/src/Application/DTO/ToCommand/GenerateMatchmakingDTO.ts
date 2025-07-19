export class GenerateMatchmakingDTO
{
    public readonly username: string;
    public readonly wins: number;
    public readonly totalGames: number;

    constructor(username: string, wins: number, totalGames: number)
    {
        this.username = username;
        this.wins = wins;
        this.totalGames = totalGames;
    }
}