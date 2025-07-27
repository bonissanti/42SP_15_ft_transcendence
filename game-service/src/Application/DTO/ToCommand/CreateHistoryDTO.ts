import {GameTypeEnum} from "../../Enum/GameTypeEnum";

export class CreateHistoryDTO
{
    public readonly gameType: GameTypeEnum
    public readonly tournamentName?: string;
    public readonly player1Username: string;
    public readonly player1Points: number;
    public readonly player2Username: string;
    public readonly player2Points: number;
    public readonly player3Username: string | null;
    public readonly player3Points: number | null;
    public readonly player4Username: string | null;
    public readonly player4Points: number | null;

    constructor(gameType: GameTypeEnum, tournamentName: string | undefined, player1Username: string, player1Points: number, player2Username: string, player2Points: number,
        player3Username: string | null, player3Points: number | null, player4Username: string | null, player4Points: number | null)
    {
        this.gameType = gameType;
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Points = player2Points;
        this.player3Username = player3Username;
        this.player3Points = player3Points;
        this.player4Username = player4Username;
        this.player4Points = player4Points;
    }
}