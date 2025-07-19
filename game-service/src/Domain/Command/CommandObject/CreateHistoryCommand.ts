import {CreateHistoryDTO} from "../../../Application/DTO/ToCommand/CreateHistoryDTO";

export class CreateHistoryCommand
{
    public readonly tournamentName?: string;
    public readonly player1Username: string;
    public readonly player1Points: number;
    public readonly player2Username: string;
    public readonly player2Points: number;

    constructor(tournamentName: string | undefined, player1Username: string, player1Points: number, player2Username: string, player2Points: number)
    {
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Points = player2Points;
    }

    public static fromDTO(dto: CreateHistoryDTO)
    {
        return new CreateHistoryCommand(
            dto.tournamentName,
            dto.player1Username,
            dto.player1Points,
            dto.player2Username,
            dto.player2Points);
    }
}