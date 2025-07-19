import * as crypto from "node:crypto";

export class History
{
    public readonly historyUuid: string;
    public readonly tournamentName?: string | null;
    public readonly player1Username: string;
    public readonly player1Points: number;
    public readonly player2Username: string;
    public readonly player2Points: number;

    constructor(tournamentName: string | null = null, player1Username: string, player1Points: number, player2Username: string, player2Points: number)
    {
        this.historyUuid = crypto.randomUUID();
        this.tournamentName = tournamentName;
        this.player1Username = player1Username;
        this.player1Points = player1Points;
        this.player2Username = player2Username;
        this.player2Points = player2Points;
    }
}