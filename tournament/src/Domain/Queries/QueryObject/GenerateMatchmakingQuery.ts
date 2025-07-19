import {GenerateMatchmakingDTO} from "../../../Application/DTO/ToCommand/GenerateMatchmakingDTO";

export class GenerateMatchmakingQuery
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

    public static fromDTO(dto: GenerateMatchmakingDTO): GenerateMatchmakingQuery
    {
        return new GenerateMatchmakingQuery(dto.username, dto.wins, dto.totalGames);
    }
}