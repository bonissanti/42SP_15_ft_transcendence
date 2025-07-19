import {GetAllTournamentsQueryDTO} from "../../Domain/QueryDTO/GetAllTournamentsQueryDTO";

export class GetAllTournamentsViewModel
{
    public readonly tournamentUuid: string;
    public readonly tournamentName: string;
    public readonly player1Uuid: string;
    public readonly player2Uuid: string;
    public readonly player3Uuid: string;
    public readonly player4Uuid: string;

    constructor (tournamentUuid: string, tournamentName: string, player1Uuid: string, player2Uuid: string, player3Uuid: string, player4Uuid: string)
    {
        this.tournamentUuid = tournamentUuid;
        this.tournamentName = tournamentName;
        this.player1Uuid = player1Uuid;
        this.player2Uuid = player2Uuid;
        this.player3Uuid = player3Uuid;
        this.player4Uuid = player4Uuid;
    }

    public static fromQueryDTOlist(queryDTO: GetAllTournamentsQueryDTO[]): GetAllTournamentsViewModel[]
    {
        return queryDTO.map(dto => new GetAllTournamentsViewModel(
            dto.tournamentUuid,
            dto.tournamentName,
            dto.player1Uuid,
            dto.player2Uuid,
            dto.player3Uuid,
            dto.player4Uuid
        ));
    }
}