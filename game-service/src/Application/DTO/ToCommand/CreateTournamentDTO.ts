export class CreateTournamentDTO
{
    public readonly tournamentName: string;
    public readonly player1Username: string;
    public readonly player2Username: string;
    public readonly player3Username: string;
    public readonly player4Username: string;
    public readonly aliasPlayer1: string | null;
    public readonly aliasPlayer2: string | null;
    public readonly aliasPlayer3: string | null;
    public readonly aliasPlayer4: string | null;

    constructor(tournamentName: string, player1Username: string, player2Username: string, player3Username: string, player4Username: string,
                aliasPlayer1: string | null, aliasPlayer2: string | null, aliasPlayer3: string | null, aliasPlayer4: string | null)
    {
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player2Username = player2Username;
        this.player3Username = player3Username;
        this.player4Username = player4Username;
        this.aliasPlayer1 = aliasPlayer1;
        this.aliasPlayer2 = aliasPlayer2;
        this.aliasPlayer3 = aliasPlayer3;
        this.aliasPlayer4 = aliasPlayer4;
    }
}