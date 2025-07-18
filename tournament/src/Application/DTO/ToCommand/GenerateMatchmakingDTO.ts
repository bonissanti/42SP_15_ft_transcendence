export class GenerateMatchmakingDTO
{
    public readonly uuid: string;
    public readonly wins: number;

    constructor(uuid: string, wins: number)
    {
        this.uuid = uuid;
        this.wins = wins;
    }
}