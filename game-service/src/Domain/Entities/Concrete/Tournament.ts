import * as crypto from 'crypto';

export class Tournament
{
    public tournamentUuid: string;
    public tournamentName: string;
    public player1Username: string;
    public player2Username: string;
    public player3Username: string;
    public player4Username: string;
    public aliasPlayer1: string | null;
    public aliasPlayer2: string | null;
    public aliasPlayer3: string | null;
    public aliasPlayer4: string | null;

    constructor(tournamentName: string, player1Username: string, player2Username: string, player3Username: string, player4Username: string,
                aliasPlayer1: string | null, aliasPlayer2: string | null, aliasPlayer3: string | null, aliasPlayer4: string | null)
    {
        this.tournamentUuid = crypto.randomUUID();
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

    public static fromDatabase(tournamentUuid: string, tournamentName: string, player1Username: string, player2Username: string, player3Username: string, player4Username: string,
                aliasPlayer1: string | null, aliasPlayer2: string | null, aliasPlayer3: string | null, aliasPlayer4: string | null): Tournament
    {
        const tournament= Object.create(Tournament.prototype);
        tournament.tournamentUuid = tournamentUuid;
        tournament.tournamentName = tournamentName;
        tournament.player1Username = player1Username;
        tournament.player2Username = player2Username;
        tournament.player3Username = player3Username;
        tournament.player4Username = player4Username;
        tournament.aliasPlayer1 = aliasPlayer1;
        tournament.aliasPlayer2 = aliasPlayer2;
        tournament.aliasPlayer3 = aliasPlayer3;
        tournament.aliasPlayer4 = aliasPlayer4;
        return tournament;
    }
}
