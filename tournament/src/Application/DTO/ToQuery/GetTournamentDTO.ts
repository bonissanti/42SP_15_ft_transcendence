export class GetTournamentDTO
{
    public readonly torunamentUuid: string;

    constructor(tournamentUuid: string)
    {
        this.torunamentUuid = tournamentUuid;
    }
}