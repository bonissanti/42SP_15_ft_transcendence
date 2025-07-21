export class EditTournamentDTO
{
    public readonly tournamentUuid: string;
    public readonly tournamentName: string;
    public readonly player1Username: string;
    public readonly player2Username: string;
    public readonly player3Username: string;
    public readonly player4Username: string;

    constructor(tournamentUuid: string, tournamentName: string, player1Username: string, player2Username: string, player3Username: string, player4Username: string)
    {
        this.tournamentUuid = tournamentUuid;
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.player3Username = player3Username;
        this.player4Username = player4Username;
    }
}