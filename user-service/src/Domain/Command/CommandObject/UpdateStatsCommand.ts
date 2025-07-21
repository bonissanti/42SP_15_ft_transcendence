import {UpdateStatsDTO} from "../../../Application/DTO/ToCommand/UpdateStatsDTO.js";

export class UpdateStatsCommand
{
    public readonly player1Username: string;
    public readonly player1Points: number;
    public readonly player2Username: string;
    public readonly player2Points: number;

    constructor(player1Username: string, player1Points: number, player2Username: string, player2Points: number)
    {
        this.player1Username = player1Username;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Points = player2Points;
    }

    public static fromDTO(dto: UpdateStatsDTO): UpdateStatsCommand
    {
        return new UpdateStatsCommand(dto.player1Username, dto.player1Points, dto.player2Username, dto.player2Points);
    }
}