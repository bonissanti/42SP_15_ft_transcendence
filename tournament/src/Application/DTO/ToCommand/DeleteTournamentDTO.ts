export class DeleteTournamentDTO
{
    public readonly torunamentUuid: string;

    constructor(tournamentUuid: string)
    {
        this.torunamentUuid = tournamentUuid;
    }
}