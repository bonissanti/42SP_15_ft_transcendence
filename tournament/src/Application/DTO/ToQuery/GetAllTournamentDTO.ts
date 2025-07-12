export class GetAllTournamentDTO
{
    public readonly tournamentUuid: string;

    constructor(tournamentUuid: string)
    {
        this.tournamentUuid = tournamentUuid;
    }
}