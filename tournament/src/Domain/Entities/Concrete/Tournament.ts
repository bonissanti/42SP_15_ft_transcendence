export class Tournament
{
    public tournamentName: string;
    public player1Uuid: string;
    public player2Uuid: string;
    public player3Uuid: string;
    public player4Uuid: string;

    constructor (tournamentName: string, player1Uuid: string, player2Uuid: string, player3Uuid: string, player4Uuid: string)
    {
        this.tournamentName = tournamentName;
        this.player1Uuid = player1Uuid;
        this.player2Uuid = player2Uuid;
        this.player3Uuid = player3Uuid;
        this.player4Uuid = player4Uuid;
    }
}