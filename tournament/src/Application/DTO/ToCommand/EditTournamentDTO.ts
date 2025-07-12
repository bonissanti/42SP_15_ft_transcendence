export class EditTournamentDTO
{
    public readonly torunamentUuid: string;
    public readonly tournamentName: string;
    public readonly player1Uuid: string;
    public readonly player2Uuid: string;
    public readonly player3Uuid?: string | null;
    public readonly player4Uuid?: string | null;

    constructor(tournamentUuid: string, tournamentName: string, player1Uuid: string, player2Uuid: string, player3Uuid?: string | null, player4Uuid?: string | null)
    {
        this.torunamentUuid = tournamentUuid;
        this.tournamentName = tournamentName;
        this.player1Uuid = player1Uuid;
        this.player2Uuid = player2Uuid;
        this.player3Uuid = player3Uuid;
        this.player4Uuid = player4Uuid;
    }
}