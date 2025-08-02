import {GetAllHistoriesQueryDTO} from "../../Domain/QueryDTO/GetAllHistoriesQueryDTO";

export class GetAllHistoriesViewModel
{
    public readonly historyUuid: string;
    public readonly tournamentName?: string | null;
    public readonly player1Username: string;
    public readonly player1Points: number;
    public readonly player2Username: string;
    public readonly player2Points: number;
    public readonly player3Username: string | null;
    public readonly player3Points: number | null;
    public readonly player4Username: string | null;
    public readonly player4Points: number | null;

    constructor(historyUuid: string, tournamentName: string | null = null, player1Username: string, player1Points: number, player2Username: string, player2Points: number,
                player3Username: string | null, player3Points: number | null, player4Username: string | null, player4Points: number | null)
    {
        this.historyUuid = historyUuid;
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

    public static fromQueryDTOList(queryDTO: GetAllHistoriesQueryDTO[]): GetAllHistoriesViewModel[]
    {
        return queryDTO.map(dto => new GetAllHistoriesViewModel(
            dto.historyUuid,
            dto.tournamentName,
            dto.player1Username,
            dto.player1Points,
            dto.player2Username,
            dto.player2Points,
            dto.player3Username,
            dto.player3Points,
            dto.player4Username,
            dto.player4Points
        ));
    }
}