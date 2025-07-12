export class GetTournamentDTO
{
    public readonly tournamentUuid: string;

    constructor(tournamentUuid: string)
    {
        this.tournamentUuid = tournamentUuid;
    }
}