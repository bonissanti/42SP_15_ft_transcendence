export class CreateTournamentDTO
{
    public readonly tournamentName: string;
    public readonly player1Username: string;
    public readonly player2Username: string;
    public readonly player3Username: string;
    public readonly player4Username: string;

    constructor(tournamentName: string, player1Username: string, player2Username: string, player3Username: string, player4Username: string)
    {
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.player3Username = player3Username;
        this.player4Username = player4Username;
    }
}