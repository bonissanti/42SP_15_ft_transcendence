import {CreateHistoryDTO} from "../../../Application/DTO/ToCommand/CreateHistoryDTO";
import {GameTypeEnum} from "../../../Application/Enum/GameTypeEnum";

export class CreateHistoryCommand
{
    public readonly gameType: GameTypeEnum
    public readonly tournamentId?: string;
    public readonly tournamentName?: string;
    public readonly player1Username: string;
    public readonly player1Alias: string | null;
    public readonly player1Points: number;
    public readonly player2Username: string;
    public readonly player2Alias: string | null;
    public readonly player2Points: number;
    public readonly player3Username: string | null;
    public readonly player3Alias: string | null;
    public readonly player3Points: number | null;
    public readonly player4Username: string | null;
    public readonly player4Alias: string | null;
    public readonly player4Points: number | null;

    constructor(gameType: GameTypeEnum, tournamentId: string | undefined, tournamentName: string | undefined, player1Username: string, player1Alias: string | null, player1Points: number, player2Username: string, player2Alias: string | null, player2Points: number,
                player3Username: string | null, player3Alias: string | null, player3Points: number | null, player4Username: string | null, player4Alias: string | null, player4Points: number | null)
    {
        this.gameType = gameType;
        this.tournamentId = tournamentId;
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player1Alias = player1Alias;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Alias = player2Alias;
        this.player2Points = player2Points;
        this.player3Username = player3Username;
        this.player3Alias = player3Alias;
        this.player3Points = player3Points;
        this.player4Username = player4Username;
        this.player4Alias = player4Alias;
        this.player4Points = player4Points;
    }

    public static fromDTO(dto: CreateHistoryDTO)
    {
        return new CreateHistoryCommand(
            dto.gameType,
            dto.tournamentId,
            dto.tournamentName,
            dto.player1Username,
            dto.player1Alias,
            dto.player1Points,
            dto.player2Username,
            dto.player2Alias,
            dto.player2Points,
            dto.player3Username,
            dto.player3Alias,
            dto.player3Points,
            dto.player4Username,
            dto.player4Alias,
            dto.player4Points
        );
    }
}