import { IMatch } from "../Interface/IMatch";

export class Match implements IMatch
{
    public readonly Uuid: string;
    public Players: [string, string];
    public Scores: [Number, Number];
    public TournamentID: string | null = null;
    public WhoWin: boolean = false;

    constructor(PlayerOne: string,
                PlayerTwo: string,
                ScoreOne: Number,
                ScoreTwo: Number,
                TournamentID: string | null     
    )
    {
        this.Uuid = crypto.randomUUID();
        this.Players[0] = PlayerOne;
        this.Players[1] = PlayerTwo;
        this.Scores[0] = ScoreOne;
        this.Scores[1] = ScoreTwo;
        if (TournamentID != null)
            this.TournamentID = TournamentID;
        if (this.Scores[1] > this.Scores[0])
            this.WhoWin = true;
    }
}