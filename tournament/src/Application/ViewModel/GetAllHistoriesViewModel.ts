import {GetAllHistoriesQueryDTO} from "../../Domain/QueryDTO/GetAllHistoriesQueryDTO";
import {GetAllTournamentsViewModel} from "./GetAllTournamentsViewModel";

export class GetAllHistoriesViewModel
{
    public readonly historyUuid: string;
    public readonly tournamentName?: string | null;
    public readonly player1Username: string;
    public readonly player1Points: number;
    public readonly player2Username: string;
    public readonly player2Points: number;

    constructor(historyUuid: string, tournamentName: string | null = null, player1Username: string, player1Points: number, player2Username: string, player2Points: number)
    {
        this.historyUuid = historyUuid;
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Points = player2Points;
    }

    public static fromQueryDTOList(queryDTO: GetAllHistoriesQueryDTO[]): GetAllHistoriesViewModel[]
    {
        return queryDTO.map(dto => new GetAllHistoriesViewModel(
            dto.historyUuid,
            dto.tournamentName,
            dto.player1Username,
            dto.player1Points,
            dto.player2Username,
            dto.player2Points
        ));
    }
}