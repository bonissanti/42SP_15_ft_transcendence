import {UpdateStatsDTO} from "../../../Application/DTO/ToCommand/UpdateStatsDTO.js";
import {GameTypeEnum} from "../../../Application/Enums/GameTypeEnum.js";

export class UpdateStatsCommand
{
    public readonly gameType: GameTypeEnum
    public readonly player1Username: string;
    public readonly player2Username: string;
    public readonly player3Username: string | null;
    public readonly player4Username: string | null;
    public readonly player1Points: number;
    public readonly player2Points: number;
    public readonly player3Points: number | null;
    public readonly player4Points: number | null;

    constructor(gameType: GameTypeEnum, player1Username: string, player2Username: string, player3Username: string | null,
        player4Username: string | null, player1Points: number, player2Points: number, player3Points: number | null, player4Points: number | null)
    {
        this.gameType = gameType;
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.player3Username = player3Username;
        this.player4Username = player4Username;
        this.player1Points = player1Points;
        this.player2Points = player2Points;
        this.player3Points = player3Points;
        this.player4Points = player4Points;
    }

    public static fromDTO(dto: UpdateStatsDTO): UpdateStatsCommand
    {
        return new UpdateStatsCommand(
            dto.gameType,
            dto.player1Username,
            dto.player2Username,
            dto.player3Username,
            dto.player4Username,
            dto.player1Points,
            dto.player2Points,
            dto.player3Points,
            dto.player4Points
        );
    }
}