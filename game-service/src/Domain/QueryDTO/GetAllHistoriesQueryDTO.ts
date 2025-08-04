export class GetAllHistoriesQueryDTO
{
    public readonly historyUuid: string;
    public readonly tournamentId?: string | null;
    public readonly tournamentName?: string | null;
    public readonly gameType?: string | null;
    public readonly player1Username: string;
    public readonly player1Alias: string | null;
    public readonly player1Points: number;
    public readonly player2Username: string;
    public readonly player2Alias: string | null;
    public readonly player2Points: number;
    public readonly player3Username: string | null;
    public readonly player3Alias: string | null;
    public readonly player3Points: number | null;
    public readonly player4Username: string | null;
    public readonly player4Alias: string | null;
    public readonly player4Points: number | null;

    constructor(historyUuid: string, tournamentId: string | null = null, tournamentName: string | null = null, gameType: string | null = null, player1Username: string, player1Alias: string | null, player1Points: number, player2Username: string, player2Alias: string | null, player2Points: number, player3Username: string | null, player3Alias: string | null, player3Points: number | null, player4Username: string | null, player4Alias: string | null, player4Points: number | null)
    {
        this.historyUuid = historyUuid;
        this.tournamentId = tournamentId;
        this.tournamentName = tournamentName;
        this.gameType = gameType;
        this.player1Username = player1Username;
        this.player1Alias = player1Alias;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Alias = player2Alias;
        this.player2Points = player2Points;
        this.player3Username = player3Username;
        this.player3Alias = player3Alias;
        this.player3Points = player3Points;
        this.player4Username = player4Username;
        this.player4Alias = player4Alias;
        this.player4Points = player4Points;
    }
}