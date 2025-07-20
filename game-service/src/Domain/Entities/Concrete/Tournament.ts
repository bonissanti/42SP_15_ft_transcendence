export class Tournament
{
    public readonly tournamentUuid: string;
    public tournamentName: string;
    public player1Username: string;
    public player2Username: string;
    public player3Username: string;
    public player4Username: string;

    constructor(tournamentName: string, player1Username: string, player2Username: string, player3Username: string, player4Username: string)
    {
        this.tournamentUuid = crypto.randomUUID();
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.player3Username = player3Username;
        this.player4Username = player4Username;
    }
}
