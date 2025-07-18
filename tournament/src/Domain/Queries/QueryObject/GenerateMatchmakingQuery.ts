import {GenerateMatchmakingDTO} from "../../../Application/DTO/ToCommand/GenerateMatchmakingDTO";

export class GenerateMatchmakingQuery
{
    public readonly uuid: string;
    public readonly wins: number;

    constructor(uuid: string, wins: number)
    {
        this.uuid = uuid;
        this.wins = wins;
    }

    public static fromDTO(dto: GenerateMatchmakingDTO): GenerateMatchmakingQuery
    {
        return new GenerateMatchmakingQuery(dto.uuid, dto.wins);
    }
}