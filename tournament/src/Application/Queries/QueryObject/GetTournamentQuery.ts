import {GetTournamentDTO} from "../../DTO/ToQuery/GetTournamentDTO";

export class GetTournamentQuery
{
    public readonly tournamentUuid: string;

    constructor(tournamentUuid: string)
    {
        this.tournamentUuid = tournamentUuid;
    }

    public static fromDTO(dto: GetTournamentDTO): GetTournamentQuery
    {
        return new GetTournamentQuery(dto.tournamentUuid);
    }
}